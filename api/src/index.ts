import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

type Bindings = {
  SUPABASE_DB_SESSION_POOLER_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Helper function to get Supabase client with service key for admin operations
function getSupabaseAdmin(env: Bindings) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase configuration');
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
}

app.get('/health', c => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/universities', async c => {
  try {
    const supabase = getSupabaseAdmin(c.env);
    const { data: universities, error } = await supabase
      .from('University')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching universities:', error);
      return c.json({ error: 'Failed to fetch universities' }, 500);
    }
    
    return c.json({ universities });
  } catch (error) {
    console.error('Error in universities endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/api/universities/:slug', async c => {
  try {
    const supabase = getSupabaseAdmin(c.env);
    const slug = c.req.param('slug');
    
    // Fetch university
    const { data: university, error: uniError } = await supabase
      .from('University')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (uniError || !university || !university.active) {
      return c.json({ error: 'University not found' }, 404);
    }
    
    // Fetch fees
    const { data: feeRows, error: feeError } = await supabase
      .from('Fee')
      .select('*')
      .eq('university_id', university.id)
      .order('year', { ascending: true });
    
    if (feeError) {
      console.error('Error fetching fees:', feeError);
      return c.json({ error: 'Failed to fetch fees' }, 500);
    }
    
    const fees = feeRows?.map((r: any) => ({ 
      year: r.year, 
      tuition: Number(r.tuition), 
      hostel: Number(r.hostel), 
      misc: Number(r.misc), 
      currency: r.currency 
    })) || [];
    
    return c.json({ university, fees });
  } catch (error) {
    console.error('Error in university detail endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/api/settings/public', async c => {
  try {
    const supabase = getSupabaseAdmin(c.env);
    const { data: settings, error } = await supabase
      .from('SiteSetting')
      .select('*')
      .eq('key', 'default')
      .single();
    
    if (error) {
      console.error('Error fetching settings:', error);
      return c.json({ settings: null });
    }
    
    return c.json({ settings });
  } catch (error) {
    console.error('Error in settings endpoint:', error);
    return c.json({ settings: null });
  }
});

app.post('/api/applications', async c => {
  try {
    console.log('Environment keys:', Object.keys(c.env));
    console.log('SUPABASE_URL type:', typeof c.env.SUPABASE_URL);
    console.log('SUPABASE_URL length:', c.env.SUPABASE_URL?.length || 0);
    
    const supabase = getSupabaseAdmin(c.env);
    const body = await c.req.json();
    
    // Generate UUID for the id field
    const id = crypto.randomUUID();
    
    // Map the request data to match the Lead table structure
    const data = {
      id,
      name: String(body.name || body.full_name || ''),
      phone: String(body.phone || ''),
      email: body.email ? String(body.email) : null,
      city: body.city ? String(body.city) : null,
      neet_qualified: body.neet_qualified ? Boolean(body.neet_qualified === 'yes' || body.neet_qualified === true) : null,
      preferred_university_slug: body.preferred_university_slug ? String(body.preferred_university_slug) : null,
      marksheet_url: body.marksheet_url ? String(body.marksheet_url) : null,
      status: 'pending',
      notes: '',
      created_at: new Date().toISOString()
    };
    
    const { data: saved, error } = await supabase
      .from('Lead')
      .insert([data])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating application:', error);
      return c.json({ error: 'Failed to create application', details: error.message }, 500);
    }
    
    return c.json({ saved: !!saved });
  } catch (error) {
    console.error('Error creating application:', error);
    return c.json({ error: 'Failed to create application', details: error instanceof Error ? error.message : String(error) }, 500);
  }
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
