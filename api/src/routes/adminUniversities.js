import express from 'express';
import multer from 'multer';
import { supabaseAdmin } from '../config/supabase.js';
import { prisma } from '../config/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { uploadToS3, deleteFromS3 } from '../utils/s3Storage.js';
import { uploadToStorage, deleteFromStorage } from '../utils/storageApi.js';

const router = express.Router();

// Allow dev bypass without auth
const maybeAuth = (req, res, next) => {
  if (process.env.USE_LOCAL_ADMIN === 'true') return next();
  return authenticate(req, res, () => requireAdmin(req, res, next));
};

const upload = multer({ storage: multer.memoryStorage() });

async function getUniversityBySlug(slug) {
  const uni = await prisma.university.findUnique({ where: { slug } });
  if (!uni) throw new AppError('University not found', 404);
  return uni;
}

function publicUrl(bucket, path) {
  const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

function urlToPath(url) {
  // Supabase public URL format: .../object/public/<bucket>/<path>
  const marker = '/object/public/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const rest = url.slice(idx + marker.length);
  const [bucket, ...parts] = rest.split('/');
  return { bucket, path: parts.join('/') };
}

// Upload hero/logo DP
router.post('/:slug/dp', maybeAuth, upload.single('file'), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const type = (req.query.type || 'hero').toString();
    if (!req.file) throw new AppError('No file uploaded', 400);

    const uni = await getUniversityBySlug(slug);
    const bucket = 'MATHWA storage';
    const folder = type === 'logo' ? `logos/${slug}` : `hero/${slug}`;
    const ext = req.file.originalname.split('.').pop();
    const filename = `${folder}/${Date.now()}.${ext}`;

    let url;
    try {
      // Try S3 upload first
      url = await uploadToS3(bucket, filename, req.file.buffer, req.file.mimetype);
    } catch (s3Error) {
      console.warn('S3 upload failed, trying Supabase SDK:', s3Error.message);
      
      try {
        // Fallback to Supabase SDK
        const { error: upErr } = await supabaseAdmin.storage
          .from(bucket)
          .upload(filename, req.file.buffer, { contentType: req.file.mimetype, upsert: false });
        if (upErr) throw upErr;
        
        url = publicUrl(bucket, filename);
      } catch (supabaseError) {
        console.warn('Supabase SDK upload failed, trying direct HTTP API:', supabaseError.message);
        
        // Final fallback to direct HTTP API
        url = await uploadToStorage(bucket, filename, req.file.buffer, req.file.mimetype);
      }
    }

    const updates = type === 'logo' ? { logo_url: url } : { hero_image_url: url };
    const updated = await prisma.university.update({ where: { id: uni.id }, data: updates });
    res.json({ university: updated });
  } catch (err) {
    next(err);
  }
});

// Clear hero/logo DP
router.delete('/:slug/dp', maybeAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const type = (req.query.type || 'hero').toString();
    const uni = await getUniversityBySlug(slug);
    const field = type === 'logo' ? 'logo_url' : 'hero_image_url';
    const current = uni[field];

    if (current) {
      const parsed = urlToPath(current);
      if (parsed) {
        try {
          // Try S3 delete first
          await deleteFromS3(parsed.bucket, parsed.path);
        } catch (s3DeleteError) {
          console.warn('S3 delete failed, trying Supabase SDK:', s3DeleteError.message);
          try {
            // Fallback to Supabase SDK
            await supabaseAdmin.storage.from(parsed.bucket).remove([parsed.path]);
          } catch (supabaseDeleteError) {
            console.warn('Supabase SDK delete failed, trying direct HTTP API:', supabaseDeleteError.message);
            try {
              // Final fallback to direct HTTP API
              await deleteFromStorage(parsed.bucket, parsed.path);
            } catch (httpDeleteError) {
              console.warn('Direct HTTP API delete also failed:', httpDeleteError.message);
            }
          }
        }
      }
    }

    const updated = await prisma.university.update({ where: { id: uni.id }, data: { [field]: null } });
    res.json({ university: updated });
  } catch (err) {
    next(err);
  }
});

// Upload gallery images
router.post('/:slug/gallery', maybeAuth, upload.array('images', 20), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const uni = await getUniversityBySlug(slug);
    if (!req.files || req.files.length === 0) throw new AppError('No files uploaded', 400);

    const bucket = 'MATHWA storage';
    const uploaded = [];
    
    for (const file of req.files) {
      const ext = file.originalname.split('.').pop();
      const filename = `gallery/${slug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      
      try {
        // Try S3 upload first
        const url = await uploadToS3(bucket, filename, file.buffer, file.mimetype);
        
        const current = Array.isArray(uni.gallery_urls) ? uni.gallery_urls : [];
        const next = [...current, url];
        await prisma.university.update({ where: { id: uni.id }, data: { gallery_urls: next } });
        uploaded.push({ url });
      } catch (s3Error) {
        console.warn('S3 upload failed, trying Supabase SDK:', s3Error.message);
        
        try {
          // Fallback to Supabase SDK
          const { error: upErr } = await supabaseAdmin.storage
            .from(bucket)
            .upload(filename, file.buffer, { contentType: file.mimetype, upsert: false });
            
          if (upErr) throw upErr;
          
          const url = publicUrl(bucket, filename);
          const current = Array.isArray(uni.gallery_urls) ? uni.gallery_urls : [];
          const next = [...current, url];
          await prisma.university.update({ where: { id: uni.id }, data: { gallery_urls: next } });
          uploaded.push({ url });
        } catch (supabaseError) {
          console.warn('Supabase SDK upload failed, trying direct HTTP API:', supabaseError.message);
          
          // Final fallback to direct HTTP API
          const url = await uploadToStorage(bucket, filename, file.buffer, file.mimetype);
          const current = Array.isArray(uni.gallery_urls) ? uni.gallery_urls : [];
          const next = [...current, url];
          await prisma.university.update({ where: { id: uni.id }, data: { gallery_urls: next } });
          uploaded.push({ url });
        }
      }
    }

    // Return university with gallery
    const university = await prisma.university.findUnique({ where: { id: uni.id } });
    res.json({ university });
  } catch (err) {
    next(err);
  }
});

// Delete gallery images by URLs
router.delete('/:slug/gallery', maybeAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { urls = [] } = req.body || {};
    const uni = await getUniversityBySlug(slug);
    const toRemove = Array.isArray(urls) ? urls : [];
    for (const url of toRemove) {
      const parsed = urlToPath(url);
      if (parsed) {
        try {
          // Try S3 delete first
          await deleteFromS3(parsed.bucket, parsed.path);
        } catch (s3DeleteError) {
          console.warn('S3 delete failed, trying Supabase SDK:', s3DeleteError.message);
          try {
            // Fallback to Supabase SDK
            await supabaseAdmin.storage.from(parsed.bucket).remove([parsed.path]);
          } catch (supabaseDeleteError) {
            console.warn('Supabase SDK delete failed, trying direct HTTP API:', supabaseDeleteError.message);
            try {
              // Final fallback to direct HTTP API
              await deleteFromStorage(parsed.bucket, parsed.path);
            } catch (httpDeleteError) {
              console.warn('Direct HTTP API delete also failed:', httpDeleteError.message);
              // Continue with database update even if file deletion fails
            }
          }
        }
      }
      const current = Array.isArray(uni.gallery_urls) ? uni.gallery_urls : [];
      const next = current.filter(u => u !== url);
      await prisma.university.update({ where: { id: uni.id }, data: { gallery_urls: next } });
    }

    const university = await prisma.university.findUnique({ where: { id: uni.id } });
    res.json({ university });
  } catch (err) {
    next(err);
  }
});

export default router;
