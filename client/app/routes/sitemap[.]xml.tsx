import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const base = new URL(request.url).origin;
  const apiBinding = (context as any)?.env?.API as any;
  const apiUrlRaw = (context as any)?.env?.API_URL as any;
  const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
  const bases = [
    ...(envApi ? [envApi] : []),
    'http://127.0.0.1:3002',
    'http://localhost:3002',
    'http://127.0.0.1:8787'
  ];
  let uniList: Array<{ slug: string; created_at?: string }> = [];
  let blogList: Array<{ slug: string; created_at?: string }> = [];
  try {
    let res: any = null;
    if (apiBinding?.fetch) {
      res = await apiBinding.fetch(new Request('https://api.local/api/universities')).catch(() => null as any);
    } else {
      for (const b of bases) {
        res = await fetch(`${b}/api/universities`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }
    if (res && res.ok) {
      const data = await res.json();
      uniList = (data?.universities || []).map((u: any) => ({ slug: u.slug, created_at: u.created_at })) as any;
    }
    // Blogs
    let rb: any = null;
    if (apiBinding?.fetch) {
      rb = await apiBinding.fetch(new Request('https://api.local/api/blogs')).catch(() => null as any);
    } else {
      for (const b of bases) {
        rb = await fetch(`${b}/api/blogs`).catch(() => null as any);
        if (rb && rb.ok) break;
      }
    }
    if (rb && rb.ok) {
      const data = await rb.json();
      blogList = (data?.blogs || []).map((p: any) => ({ slug: p.slug, created_at: p.created_at })) as any;
    }
  } catch {}
  const staticUrls = [
    `${base}/`,
    `${base}/about`,
    `${base}/apply`,
    `${base}/universities`,
    `${base}/contact`,
    `${base}/blog`,
    `${base}/faqs`,
    `${base}/mbbs-kyrgyzstan`,
    `${base}/mbbs-kyrgyzstan-fees`,
    `${base}/mbbs-kyrgyzstan-eligibility`,
    `${base}/mbbs-kyrgyzstan-visa`,
    `${base}/mbbs-kyrgyzstan-hostel`
  ];
  const dynamicUni = uniList.map(u => `${base}/universities/${u.slug}`);
  const dynamicBlog = blogList.map(p => `${base}/blog/${p.slug}`);
  const urls = [...staticUrls, ...dynamicUni, ...dynamicBlog];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(u => `<url><loc>${u}</loc></url>`).join('') +
    `</urlset>`;
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export default function Sitemap() { return null; }
