import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { supabaseAdmin } from '../config/supabase.js'
import { prisma } from '../config/prisma.js'

dotenv.config()
dotenv.config({ path: '.dev.vars' })

function isLocalUrl(u) {
  if (!u) return false
  return (
    typeof u === 'string' && (
      u.includes('/files/') ||
      u.startsWith('http://localhost') ||
      u.startsWith('http://127.0.0.1')
    )
  )
}

function parseLocalUrl(u) {
  try {
    const marker = '/files/'
    const idx = u.indexOf(marker)
    if (idx === -1) return null
    const rest = u.slice(idx + marker.length)
    const [bucket, ...parts] = rest.split('/')
    const relPath = parts.join('/')
    return { bucket, relPath }
  } catch { return null }
}

function guessType(filePath) {
  const ext = String(filePath.split('.').pop() || '').toLowerCase()
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'mp4':
      return 'video/mp4'
    case 'webm':
      return 'video/webm'
    case 'pdf':
      return 'application/pdf'
    default:
      return 'application/octet-stream'
  }
}

async function ensureUpload(bucket, relPath) {
  const base = path.resolve(process.cwd(), 'uploads')
  const localPath = path.join(base, bucket, relPath)
  if (!fs.existsSync(localPath)) {
    return null
  }
  const buf = fs.readFileSync(localPath)
  const ct = guessType(localPath)
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(relPath, buf, { contentType: ct, cacheControl: '3600', upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(relPath)
  return publicUrl
}

async function migrateUniversities() {
  const universities = await prisma.university.findMany()
  let changed = 0
  for (const u of universities) {
    const updates = {}
    for (const field of ['hero_image_url', 'logo_url']) {
      const url = u[field]
      if (isLocalUrl(url)) {
        const parsed = parseLocalUrl(url)
        if (parsed) {
          const pub = await ensureUpload(parsed.bucket, parsed.relPath)
          if (pub) updates[field] = pub
        }
      }
    }
    const gallery = Array.isArray(u.gallery_urls) ? u.gallery_urls : []
    if (gallery.length) {
      const next = []
      for (const g of gallery) {
        if (isLocalUrl(g)) {
          const parsed = parseLocalUrl(g)
          if (parsed) {
            const pub = await ensureUpload(parsed.bucket, parsed.relPath)
            next.push(pub || g)
          } else {
            next.push(g)
          }
        } else {
          next.push(g)
        }
      }
      if (next.some((v, i) => v !== gallery[i])) {
        updates.gallery_urls = next
      }
    }
    if (Object.keys(updates).length) {
      await prisma.university.update({ where: { id: u.id }, data: updates })
      changed++
    }
  }
  return changed
}

async function migrateSiteSettings() {
  const s = await prisma.siteSetting.findUnique({ where: { key: 'default' } })
  if (!s) return 0
  const fields = [
    'hero_video_mp4_url',
    'hero_video_webm_url',
    'hero_video_poster_url',
    'hero_video_mobile_mp4_url',
    'hero_video_mobile_webm_url',
    'hero_video_mobile_poster_url'
  ]
  const updates = {}
  for (const f of fields) {
    const url = s[f]
    if (isLocalUrl(url)) {
      const parsed = parseLocalUrl(url)
      if (parsed) {
        const pub = await ensureUpload(parsed.bucket, parsed.relPath)
        if (pub) updates[f] = pub
      }
    }
  }
  if (Object.keys(updates).length) {
    await prisma.siteSetting.update({ where: { key: 'default' }, data: updates })
    return 1
  }
  return 0
}

async function migrateLeads() {
  const leads = await prisma.lead.findMany()
  let changed = 0
  for (const l of leads) {
    const url = l.marksheet_url
    if (isLocalUrl(url)) {
      const parsed = parseLocalUrl(url)
      if (parsed) {
        const pub = await ensureUpload(parsed.bucket, parsed.relPath)
        if (pub) {
          await prisma.lead.update({ where: { id: l.id }, data: { marksheet_url: pub } })
          changed++
        }
      }
    }
  }
  return changed
}

async function migrateTestimonials() {
  const ts = await prisma.testimonial.findMany()
  let changed = 0
  for (const t of ts) {
    const updates = {}
    for (const f of ['video_url', 'photo_url']) {
      const url = t[f]
      if (isLocalUrl(url)) {
        const parsed = parseLocalUrl(url)
        if (parsed) {
          const pub = await ensureUpload(parsed.bucket, parsed.relPath)
          if (pub) updates[f] = pub
        }
      }
    }
    if (Object.keys(updates).length) {
      await prisma.testimonial.update({ where: { id: t.id }, data: updates })
      changed++
    }
  }
  return changed
}

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_KEY.')
    process.exit(1)
  }
  console.log('Starting migration of local assets to Supabase...')
  const uni = await migrateUniversities()
  const ss = await migrateSiteSettings()
  const ld = await migrateLeads()
  const tm = await migrateTestimonials()
  console.log(`Completed. Updated: universities=${uni}, settings=${ss}, leads=${ld}, testimonials=${tm}`)
}

main().catch(err => { console.error(err); process.exit(1) })

