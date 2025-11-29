import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', c => c.json({ status: 'ok' }))
app.get('/health', c => c.json({ status: 'ok' }))

app.get('/api/universities', c => {
  console.log("[API] GET /api/universities called");
  return c.json({ 
    universities: [
      {
        slug: 'kyrgyz-state-university',
        name: 'Kyrgyz State University',
        hero_image_url: 'https://via.placeholder.com/400x300?text=KSU',
        overview: 'Government accredited MBBS program with affordable fees.'
      },
      {
        slug: 'osh-state-university',
        name: 'Osh State University',
        hero_image_url: 'https://via.placeholder.com/400x300?text=OSU',
        overview: 'Leading medical university in southern Kyrgyzstan.'
      }
    ]
  });
})
app.get('/universities', c => {
  console.log("[API] GET /universities called");
  return c.json({ 
    universities: [
      {
        slug: 'kyrgyz-state-university',
        name: 'Kyrgyz State University',
        hero_image_url: 'https://via.placeholder.com/400x300?text=KSU',
        overview: 'Government accredited MBBS program with affordable fees.'
      },
      {
        slug: 'osh-state-university',
        name: 'Osh State University',
        hero_image_url: 'https://via.placeholder.com/400x300?text=OSU',
        overview: 'Leading medical university in southern Kyrgyzstan.'
      }
    ]
  });
})

app.get('/api/universities/:slug', c => {
  const slug = c.req.param('slug')
  return c.json({ university: null, slug })
})
app.get('/universities/:slug', c => {
  const slug = c.req.param('slug')
  return c.json({ university: null, slug })
})

app.get('/api/settings/public', c => {
  console.log("[API] GET /api/settings/public called");
  return c.json({ 
    settings: {
      hero_title: "Study MBBS Abroad with Confidence",
      hero_subtitle: "Transparent fees, visa assistance, and student housing.",
      hero_video_mp4_url: "",
      hero_video_webm_url: "",
      hero_video_poster_url: "",
      hero_video_mobile_mp4_url: "",
      hero_video_mobile_webm_url: "",
      hero_video_mobile_poster_url: "",
      whatsapp_number: "",
      call_number: ""
    }
  });
})
app.get('/settings/public', c => {
  console.log("[API] GET /settings/public called");
  return c.json({ 
    settings: {
      hero_title: "Study MBBS Abroad with Confidence",
      hero_subtitle: "Transparent fees, visa assistance, and student housing.",
      hero_video_mp4_url: "",
      hero_video_webm_url: "",
      hero_video_poster_url: "",
      hero_video_mobile_mp4_url: "",
      hero_video_mobile_webm_url: "",
      hero_video_mobile_poster_url: "",
      whatsapp_number: "",
      call_number: ""
    }
  });
})

app.post('/api/applications', async c => {
  console.log("[API] POST /api/applications called");
  const body = await c.req.json().catch(() => ({}))
  return c.json({ saved: true, body })
})
app.post('/applications', async c => {
  console.log("[API] POST /applications called");
  const body = await c.req.json().catch(() => ({}))
  return c.json({ saved: true, body })
})

app.post('/api/uploads/single', async c => {
  console.log("[API] POST /api/uploads/single called");
  const form = await c.req.parseBody()
  return c.json({ uploaded: true, name: typeof form.file === 'object' ? (form.file as File).name : undefined })
})
app.post('/uploads/single', async c => {
  console.log("[API] POST /uploads/single called");
  const form = await c.req.parseBody()
  return c.json({ uploaded: true, name: typeof form.file === 'object' ? (form.file as File).name : undefined })
})

export default app
