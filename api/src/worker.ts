import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', c => c.json({ status: 'ok' }))

app.get('/api/universities', c => c.json({ universities: [] }))

app.get('/api/universities/:slug', c => {
  const slug = c.req.param('slug')
  return c.json({ university: null, slug })
})

app.get('/api/settings/public', c => c.json({ settings: {} }))

app.post('/api/applications', async c => {
  const body = await c.req.json().catch(() => ({}))
  return c.json({ saved: true, body })
})

app.post('/api/uploads/single', async c => {
  const form = await c.req.parseBody()
  return c.json({ uploaded: true, name: typeof form.file === 'object' ? (form.file as File).name : undefined })
})

export default app
