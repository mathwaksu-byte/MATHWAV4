import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export async function loader({ request }: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const body = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}

export default function Robots() { return null; }
