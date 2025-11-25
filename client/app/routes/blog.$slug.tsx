import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  og_image_url?: string;
  active?: boolean;
  created_at?: string;
  published_at?: string;
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  const slug = params.slug as string;
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
      res = await apiBinding.fetch(new Request(`https://api.local/api/blogs/${slug}`)).catch(() => null as any);
    } else {
      for (const b of bases) {
        res = await fetch(`${b}/api/blogs/${slug}`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }
    if (!res || !res.ok) {
      return json({ blog: null }, { status: 404, headers: { 'Cache-Control': 'public, max-age=30' } });
    }
    const data = await res.json();
    const blog = data.blog as Blog;
    return json({ blog }, { headers: { 'Cache-Control': 'public, max-age=120' } });
  } catch {
    return json({ blog: null }, { status: 500, headers: { 'Cache-Control': 'public, max-age=30' } });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.blog?.title ? `${data.blog.title} | MATHWA` : "Blog | MATHWA";
  const desc = data?.blog?.excerpt || "Guide for Indian students considering MBBS in Kyrgyzstan.";
  const img = data?.blog?.og_image_url || "/uploads/universities/kyrgyz/logo.png";
  return [
    { title },
    { name: "description", content: desc },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "article" },
    { property: "og:image", content: img },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: img }
  ];
};

export default function BlogPost() {
  const { blog } = useLoaderData<typeof loader>();
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-royalBlue">Post not found</h1>
        <p className="mt-2 text-slate-700">The article you are looking for is unavailable.</p>
      </div>
    );
  }
  const now = new Date().toISOString();
  const published = blog.published_at || blog.created_at || now;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "datePublished": published,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  } as any;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">{blog.title}</h1>
      <div className="mt-2 text-slate-600 text-sm">{new Date(published).toLocaleDateString()}</div>
      <div className="prose prose-slate mt-6" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog" },
              { "@type": "ListItem", "position": 3, "name": blog.title, "item": `/blog/${blog.slug}` }
            ]
          })
        }}
      />
    </div>
  );
}

