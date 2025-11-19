import { Hono } from 'hono';

const app = new Hono();

app.get('/health', c => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.all('*', c => c.json({ error: 'Route not found' }, 404));

export default app;
