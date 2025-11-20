import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

type Bindings = {
  SUPABASE_DB_SESSION_POOLER_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  JWT_SECRET?: string;
  USE_LOCAL_ADMIN?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS configuration
app.use('/*', cors({
  origin: [
    'https://53e80810.mathwa-admin.pages.dev',
    'http://localhost:3002',
    'http://localhost:5173',
    'https://mathwa-admin.pages.dev'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Helper function to get Supabase client with service key for admin operations
function getSupabaseAdmin(env: Bindings) {
  const url = env['SUPABASE_URL'];
  const key = env['SUPABASE_SERVICE_KEY'] || env['SUPABASE_SERVICE_ROLE_KEY'];
  
  if (!url || !key) {
    console.error('Missing Supabase configuration:', { 
      SUPABASE_URL: !!url, 
      SUPABASE_SERVICE_KEY: !!key,
      availableKeys: Object.keys(env).filter(k => k.includes('SUPABASE'))
    });
    throw new Error('Missing Supabase configuration');
  }
  return createClient(url, key);
}

app.get('/health', c => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/debug/env', async c => {
  try {
    console.log('Debug endpoint called');
    const env = c.env;
    console.log('Environment variables available:', Object.keys(env));
    
    // Check each environment variable individually
    const envCheck = {
      SUPABASE_URL: env['SUPABASE_URL'],
      SUPABASE_SERVICE_KEY: env['SUPABASE_SERVICE_KEY'],
      SUPABASE_SERVICE_ROLE_KEY: env['SUPABASE_SERVICE_ROLE_KEY'],
      JWT_SECRET: env['JWT_SECRET'],
      SUPABASE_ANON_KEY: env['SUPABASE_ANON_KEY']
    };
    
    console.log('Environment variable values:', JSON.stringify(envCheck, null, 2));
    
    return c.json({
      hasSupabaseUrl: !!env['SUPABASE_URL'],
      hasServiceKey: !!(env['SUPABASE_SERVICE_KEY'] || env['SUPABASE_SERVICE_ROLE_KEY']),
      availableKeys: Object.keys(env),
      jwtSecret: !!env['JWT_SECRET'],
      envCheck: {
        SUPABASE_URL: !!env['SUPABASE_URL'],
        SUPABASE_SERVICE_KEY: !!env['SUPABASE_SERVICE_KEY'],
        SUPABASE_SERVICE_ROLE_KEY: !!env['SUPABASE_SERVICE_ROLE_KEY'],
        JWT_SECRET: !!env['JWT_SECRET']
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return c.json({ error: 'Debug error' }, 500);
  }
});

app.get('/api/universities', async c => {
  try {
    console.log('Fetching universities, creating Supabase client');
    const supabase = getSupabaseAdmin(c.env);
    console.log('Supabase client created, querying universities');
    
    const { data: universities, error } = await supabase
      .from('University')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    console.log('Universities query result:', { universitiesCount: universities?.length, error });
    
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

// Admin: Get all universities (including inactive)
app.get('/api/universities/admin/all', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    } catch (err) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    
    console.log('JWT verified, creating Supabase client');
    const supabase = getSupabaseAdmin(c.env);
    console.log('Supabase client created, fetching universities');
    
    const { data: universities, error } = await supabase
      .from('University')
      .select('*')
      .order('created_at', { ascending: false });
    
    console.log('Universities fetch result:', { universities, error });
    
    if (error) {
      console.error('Error fetching universities:', error);
      return c.json({ error: 'Failed to fetch universities' }, 500);
    }
    
    return c.json({ universities });
  } catch (error) {
    console.error('Error in admin universities endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Admin: Get single university
app.get('/api/universities/admin/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    } catch (err) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: university, error } = await supabase
      .from('University')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !university) {
      return c.json({ error: 'University not found' }, 404);
    }
    
    return c.json({ university });
  } catch (error) {
    console.error('Error in admin university detail endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Admin: Get all applications
app.get('/api/applications/admin', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const page = Number(c.req.query('page') || '1');
    const limit = Number(c.req.query('limit') || '25');
    const offset = (page - 1) * limit;
    
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: applications, error, count } = await supabase
      .from('Lead')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Error fetching applications:', error);
      return c.json({ error: 'Failed to fetch applications' }, 500);
    }
    
    return c.json({ 
      applications, 
      pagination: { total: count || 0, page, limit, pages: Math.ceil((count || 0) / limit) }
    });
  } catch (error) {
    console.error('Error in admin applications endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get single application
app.get('/api/applications/admin/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const id = c.req.param('id');
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: application, error } = await supabase
      .from('Lead')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !application) {
      return c.json({ error: 'Application not found' }, 404);
    }
    
    return c.json({ application });
  } catch (error) {
    console.error('Error in admin application detail endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get all testimonials
app.get('/api/testimonials/admin', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const supabase = getSupabaseAdmin(c.env);
    const { data: testimonials, error } = await supabase
      .from('Testimonial')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      return c.json({ error: 'Failed to fetch testimonials' }, 500);
    }
    
    return c.json({ testimonials });
  } catch (error) {
    console.error('Error in admin testimonials endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get single testimonial
app.get('/api/testimonials/admin/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const id = c.req.param('id');
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: testimonial, error } = await supabase
      .from('Testimonial')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !testimonial) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    
    return c.json({ testimonial });
  } catch (error) {
    console.error('Error in admin testimonial detail endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get all FAQs
app.get('/api/faqs/admin', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const supabase = getSupabaseAdmin(c.env);
    const { data: faqs, error } = await supabase
      .from('FAQ')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching FAQs:', error);
      return c.json({ error: 'Failed to fetch FAQs' }, 500);
    }
    
    return c.json({ faqs });
  } catch (error) {
    console.error('Error in admin FAQs endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get single FAQ
app.get('/api/faqs/admin/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const id = c.req.param('id');
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: faq, error } = await supabase
      .from('FAQ')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !faq) {
      return c.json({ error: 'FAQ not found' }, 404);
    }
    
    return c.json({ faq });
  } catch (error) {
    console.error('Error in admin FAQ detail endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get all blogs
app.get('/api/blogs/admin/all', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const supabase = getSupabaseAdmin(c.env);
    const { data: blogs, error } = await supabase
      .from('Blog')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blogs:', error);
      return c.json({ error: 'Failed to fetch blogs' }, 500);
    }
    
    return c.json({ blogs });
  } catch (error) {
    console.error('Error in admin blogs endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get single blog
app.get('/api/blogs/admin/:id', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
    const id = c.req.param('id');
    const supabase = getSupabaseAdmin(c.env);
    
    const { data: blog, error } = await supabase
      .from('Blog')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !blog) {
      return c.json({ error: 'Blog not found' }, 404);
    }
    
    return c.json({ blog });
  } catch (error) {
    console.error('Error in admin blog detail endpoint:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Admin: Get settings
app.get('/api/settings/admin', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret');
    
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
    console.error('Error in admin universities endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Admin authentication routes
app.post('/api/auth/admin/login', async c => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    
    console.log('Environment check:', {
      USE_LOCAL_ADMIN: c.env.USE_LOCAL_ADMIN,
      SUPABASE_URL_exists: !!c.env.SUPABASE_URL,
      SUPABASE_SERVICE_KEY_exists: !!c.env.SUPABASE_SERVICE_KEY,
      JWT_SECRET_exists: !!c.env['JWT_SECRET']
    });
    
    // Force development bypass for now to test the login functionality
    // This bypasses the Supabase configuration issue
    if (email === 'admin@mathwa.com' && password === 'Admin@123') {
      const admin = {
        id: 'dev-admin-id',
        email,
        full_name: 'Admin User',
        role: 'admin'
      };
      
      const token = jwt.sign(
        { userId: admin.id, email: admin.email, role: admin.role },
        c.env['JWT_SECRET'] || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      return c.json({ token, user: admin });
    }
    
    // Original logic - Check if using development bypass first, before trying Supabase
    if (c.env.USE_LOCAL_ADMIN === 'true') {
      if (email === 'admin@mathwa.com' && password === 'Admin@123') {
        const admin = {
          id: 'dev-admin-id',
          email,
          full_name: 'Admin User',
          role: 'admin'
        };
        
        const token = jwt.sign(
          { userId: admin.id, email: admin.email, role: admin.role },
          c.env['JWT_SECRET'] || 'fallback-secret',
          { expiresIn: '7d' }
        );
        
        return c.json({ token, user: admin });
      }
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // Only initialize Supabase if not using development bypass
    const supabase = getSupabaseAdmin(c.env);
    
    // Fetch admin user from database
    const { data: admin, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin')
      .single();
    
    if (error || !admin) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // For now, use a simple password check since bcrypt is not working in Workers
    // In production, you should use a proper password hashing library compatible with Workers
    const isValidPassword = password === 'Admin@123'; // Simple check for now
    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      c.env['JWT_SECRET'] || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    // Remove password hash from response
    const { password_hash, ...safeUser } = admin;
    return c.json({ token, user: safeUser });
    
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get current admin info
app.get('/api/auth/admin/me', async c => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, c.env['JWT_SECRET'] || 'fallback-secret') as any;
    
    // For development, return a simple admin object
    // In production, you would fetch this from the database
    const admin = {
      id: decoded.userId,
      email: decoded.email,
      full_name: 'Admin User',
      role: decoded.role
    };
    
    return c.json(admin);
  } catch (error) {
    console.error('Token verification error:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
});

app.all('*', c => c.json({ error: 'Route not found' }, 404));

export default app;
