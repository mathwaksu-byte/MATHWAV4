import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export async function loader({ request }: LoaderFunctionArgs) {
  const base = new URL(request.url).origin;
  const urls = [
    `${base}/`,
    `${base}/about`,
    `${base}/apply`,
    `${base}/universities/kyrgyz-state-university`,
  ];
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
