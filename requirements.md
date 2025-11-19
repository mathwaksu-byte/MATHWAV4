You are an expert full-stack engineer.  
Build a complete, production-ready modern webapp with the following stack and requirements:

────────────────────────────────────────────────────────
🚀 PROJECT & BRAND
────────────────────────────────────────────────────────
Project name:
“Kyrgyz State University — MATHWA (Official Partner) Website"

The project includes:
1. Client-facing website (public)- ui/ux you can replicate from this location as this is my old webapp I want the same ui/ux and the features 
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\client

2. Admin dashboard (private)
ui/ux you can replicate from this location as this is my old webapp I want the same ui/ux and the features 
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\admin

3. API backend ( Database & authentication, Media storage)

you can also copy paste the ui/ux and featured from the old webapp:
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1

────────────────────────────────────────────────────────
🌐 TECHNOLOGY STACK
────────────────────────────────────────────────────────
Frontend:
- Remix.run
- TailwindCSS
- React components
- SEO-ready pages
- Deployed on Cloudflare Pages
- ui/ux you can replicate from this location as this is my old webapp I want the same ui/ux and the features 
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\client

Admin Dashboard:
- Remix routes under /admin/*
- Authentication-protected
- React Table, Charts, Forms
- Image uploader connected to Supabase Storage
ui/ux you can replicate from this location as this is my old webapp I want the same ui/ux and the features 
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\admin

Backend API:
- Cloudflare Workers (Modules) runtime
- Router-based API (OpenAPI optional)
- Sessions handled by JWT or Supabase Auth
- Supabase PostgreSQL
- Prisma inside `api/prisma` using `@prisma/client/edge` with Prisma Accelerate (Data Proxy)
- Database access from Workers via Prisma Accelerate; use Supabase REST client where appropriate
- Migrations run in CI/local Node, not inside Workers
- Relations among tables
- supbase keys below
for routing you can refer to this location : location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\api

Anon Key: Set (you provided: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFham55a3hwY2tremVkYmh6c2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTQwOTIsImV4cCI6MjA3ODM3MDA5Mn0.GC3l_tPfTCmgGIM-SxjkFATFh4naIWV-oepYh6Ih1jY )
# Supabase Postgres connection strings
SUPABASE_DB_DIRECT_URL=postgresql://postgres:Mathwa_%401122@db.aajnykxpckkzedbhzsip.supabase.co:5432/postgres
SUPABASE_DB_TX_POOLER_URL=postgresql://postgres.aajnykxpckkzedbhzsip:Mathwa_%401122@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
SUPABASE_DB_SESSION_POOLER_URL=postgresql://postgres.aajnykxpckkzedbhzsip:Mathwa_%401122@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres


Authentication:
- Supabase Auth
- Admin role + normal user role
- Protected API routes
- Protected admin routes

Storage:
- Supabase Storage
- Buckets:
  - gallery
  - university_images
  - documents/brochures

────────────────────────────────────────────────────────
📦 DATABASE SCHEMA REQUIREMENTS (Prisma)
────────────────────────────────────────────────────────

Prisma schema at `api/prisma/schema.prisma` defining:
I have the file here which i already have designed for client, admin and api workers you can copy the file from this location and paste it in here
location: C:\Users\mhdtb\OneDrive\Desktop\MATHWAV1\api\prisma


────────────────────────────────────────────────────────
📦 DEPLOYMENT REQUIREMENTS
────────────────────────────────────────────────────────
Deploy:
- Client (Remix) on Cloudflare Pages
- Admin (Remix) on Cloudflare Pages
 - API on Cloudflare Workers (Modules)
 - Workers use Prisma Edge (`@prisma/client/edge`) with Accelerate Data Proxy
 - Connect Workers to Supabase using environment variables

Provide deployment instructions for:
- cloudflare pages
- cloudflare workers
- supabase env connection
 - prisma migration commands (run via CI/local using direct DB connection)

────────────────────────────────────────────────────────

Generate everything clean, organized, and production-ready.

────────────────────────────────────────────────────────
END OF PROMPT
────────────────────────────────────────────────────────
