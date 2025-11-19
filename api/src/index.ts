import { Hono } from 'hono';
import { getPrisma } from './prisma';

const app = new Hono();

app.get('/health', c => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/universities', async c => {
  const prisma = await getPrisma(c.env as any);
  const universities = await prisma.university.findMany({ where: { active: true }, orderBy: { created_at: 'desc' } });
  return c.json({ universities });
});

app.get('/api/universities/:slug', async c => {
  const prisma = await getPrisma(c.env as any);
  const slug = c.req.param('slug');
  const university = await prisma.university.findUnique({ where: { slug } });
  if (!university || university.active === false) return c.json({ error: 'University not found' }, 404);
  const feeRows = await prisma.fee.findMany({ where: { university_id: university.id }, orderBy: { year: 'asc' } });
  const fees = feeRows.map((r: any) => ({ year: r.year, tuition: Number(r.tuition), hostel: Number(r.hostel), misc: Number(r.misc), currency: r.currency }));
  return c.json({ university, fees });
});

app.get('/api/settings/public', async c => {
  const prisma = await getPrisma(c.env as any);
  const settings = await prisma.siteSetting.findUnique({ where: { key: 'default' } });
  return c.json({ settings });
});

app.post('/api/applications', async c => {
  const prisma = await getPrisma(c.env as any);
  const payload = await c.req.json();
  const neet = payload?.neet_qualified === true || payload?.neet_qualified === 'true' || payload?.neet_qualified === 'on';
  const preferredYear = typeof payload?.preferred_year === 'number' ? payload.preferred_year : (payload?.preferred_year ? parseInt(String(payload.preferred_year), 10) : null);
  const lead = await prisma.lead.create({
    data: {
      id: (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)),
      name: payload?.full_name || payload?.name,
      email: payload?.email,
      phone: payload?.phone,
      city: payload?.city,
      neet_qualified: neet ? true : false,
      marksheet_url: payload?.marksheet_url ? String(payload.marksheet_url) : null,
      preferred_university_slug: payload?.preferred_university_slug,
      preferred_year: preferredYear,
      status: 'pending'
    }
  });
  return c.json({ saved: true, application: lead, message: 'Application submitted successfully' }, 201);
});

app.all('*', c => c.json({ error: 'Route not found' }, 404));

export default app;
