import { Hono } from 'hono';
import { getPrisma } from './prisma';
import { createClient } from '@supabase/supabase-js';

type Bindings = {
  SUPABASE_DB_SESSION_POOLER_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/health', c => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/universities', async c => {
  const prisma = await getPrisma(c.env);
  const universities = await prisma.university.findMany({ where: { active: true }, orderBy: { created_at: 'desc' } });
  return c.json({ universities });
});

app.get('/api/universities/:slug', async c => {
  const prisma = await getPrisma(c.env);
  const slug = c.req.param('slug');
  const university = await prisma.university.findUnique({ where: { slug } });
  if (!university || !university.active) return c.json({ error: 'University not found' }, 404);
  const feeRows = await prisma.fee.findMany({ where: { university_id: university.id }, orderBy: { year: 'asc' } });
  const fees = feeRows.map((r: any) => ({ year: r.year, tuition: Number(r.tuition), hostel: Number(r.hostel), misc: Number(r.misc), currency: r.currency }));
  return c.json({ university, fees });
});

app.get('/api/settings/public', async c => {
  const prisma = await getPrisma(c.env);
  const settings = await prisma.siteSetting.findUnique({ where: { key: 'default' } });
  return c.json({ settings });
});

app.post('/api/applications', async c => {
  const prisma = await getPrisma(c.env);
  const body = await c.req.json();
  const data = {
    name: String(body.name || body.full_name || ''),
    phone: String(body.phone || ''),
    email: body.email ? String(body.email) : null,
    city: body.city ? String(body.city) : null,
    neet_qualified: String(body.neet_qualified || ''),
    preferred_university_slug: body.preferred_university_slug ? String(body.preferred_university_slug) : null,
    marksheet_url: body.marksheet_url ? String(body.marksheet_url) : null,
    status: 'pending',
    notes: ''
  } as any;
  const saved = await prisma.lead.create({ data });
  return c.json({ saved: !!saved });
});

app.post('/api/uploads/single', async c => {
  const form = await c.req.parseBody();
  const file = form['file'] as File | undefined;
  if (!file) return c.json({ error: 'No file' }, 400);
  const bucket = (form['bucket'] as string) || 'uploads';
  const folder = (form['folder'] as string) || 'files';
  const env = c.env;
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) return c.json({ error: 'Missing Supabase config' }, 500);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const { error } = await supabase.storage.from(bucket).upload(filename, file, { upsert: false });
  if (error) return c.json({ error: error.message }, 500);
  const { data: puh } = supabase.storage.from(bucket).getPublicUrl(filename);
  return c.json({ file: { url: puh.publicUrl } });
});

app.all('*', c => c.json({ error: 'Route not found' }, 404));

export default app;
