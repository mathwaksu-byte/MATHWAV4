import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "Blog — MBBS in Kyrgyzstan | MATHWA" },
  { name: "description", content: "Guides and updates on MBBS in Kyrgyzstan, admissions, fees, eligibility, and student life." },
  { property: "og:title", content: "Blog — MBBS in Kyrgyzstan | MATHWA" },
  { property: "og:description", content: "Guides and updates on MBBS in Kyrgyzstan." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" }
]);

type Blog = { title: string; slug: string; excerpt?: string };

export async function loader({ context }: LoaderFunctionArgs) {
  const apiBinding = (context as any)?.env?.API as any;
  const apiUrlRaw = (context as any)?.env?.API_URL as any;
  const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
  const bases = [
    ...(envApi ? [envApi] : []),
    "http://127.0.0.1:3002",
    "http://localhost:3002",
    "http://127.0.0.1:8787"
  ];
  let res: any = null;
  try {
    if (apiBinding?.fetch) {
      res = await apiBinding.fetch(new Request("https://api.local/api/blogs")).catch(() => null as any);
    } else {
      for (const b of bases) {
        res = await fetch(`${b}/api/blogs`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }
    let blogs: Blog[] = [];
    if (res && res.ok) {
      const data = await res.json();
      blogs = (data?.blogs || []) as Blog[];
    }
    return json({ blogs }, { headers: { 'Cache-Control': 'public, max-age=120' } });
  } catch {
    return json({ blogs: [] }, { headers: { 'Cache-Control': 'public, max-age=30' } });
  }
}

export default function Blog() {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Blog</h1>
      <p className="mt-2 text-slate-700">Guides and updates for Indian students considering MBBS in Kyrgyzstan.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl overflow-hidden border border-slate-200 hover:shadow transition-shadow">
            <div className="p-4">
              <div className="font-semibold">{p.title}</div>
              <div className="mt-1 text-slate-700 text-sm">{p.excerpt || ''}</div>
              <div className="mt-3 inline-block px-3 py-2 rounded-md bg-royalBlue text-white">Read</div>
            </div>
          </a>
        ))}
        {blogs.length === 0 && (
          <div className="glass rounded-xl p-6">No posts published yet.</div>
        )}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/mbbs-kyrgyzstan" className="px-4 py-2 rounded-md bg-royalBlue text-white">MBBS in Kyrgyzstan Guide</a>
        <a href="/faqs" className="px-4 py-2 rounded-md bg-blue-100 text-blue-700">FAQs</a>
      </div>
    </div>
  );
}
