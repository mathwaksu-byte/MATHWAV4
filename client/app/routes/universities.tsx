import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

type University = {
  slug: string;
  name: string;
  hero_image_url?: string;
  overview?: string;
};

export const meta: MetaFunction = () => ([
  { title: "Universities — MBBS in Kyrgyzstan | MATHWA" },
  { name: "description", content: "Explore MBBS universities in Kyrgyzstan with MATHWA — fees, eligibility, and admissions guidance." },
  { property: "og:title", content: "Universities — MBBS in Kyrgyzstan | MATHWA" },
  { property: "og:description", content: "Explore MBBS universities in Kyrgyzstan with MATHWA." },
  { property: "og:type", content: "website" },
  { property: "og:image", content: "/uploads/universities/kyrgyz/logo.png" },
  { name: "twitter:card", content: "summary_large_image" }
]);

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const apiBinding = (context as any)?.env?.API as any;
    let res: any = null;
    if (apiBinding?.fetch) {
      res = await apiBinding.fetch(new Request("https://api.local/api/universities")).catch(() => null as any);
    } else {
      const apiUrlRaw = (context as any)?.env?.API_URL as any;
      const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
      const bases = [
        ...(envApi ? [envApi] : []),
        "http://127.0.0.1:3002",
        "http://localhost:3002",
        "http://127.0.0.1:8787"
      ];
      for (const b of bases) {
        res = await fetch(`${b}/api/universities`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }
    let list: University[] = [];
    if (res && res.ok) {
      const data = await res.json();
      list = (data?.universities ?? []) as University[];
    }
    return json({ universities: list } as { universities: University[] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  } catch {
    return json({ universities: [] } as { universities: University[] }, { headers: { 'Cache-Control': 'public, max-age=30' } });
  }
}

export default function Universities() {
  const { universities } = useLoaderData<typeof loader>();
  const params = useParams();
  const isDetail = Boolean(params.slug);
  if (isDetail) {
    return <Outlet />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Universities — MBBS in Kyrgyzstan</h1>
      <p className="mt-2 text-slate-700">Explore accredited MBBS programs and details for each university.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((u) => (
          <a key={u.slug} href={`/universities/${u.slug}`} className="block rounded-xl overflow-hidden border border-slate-200 hover:shadow transition-shadow">
            <img
              src={u.hero_image_url || ""}
              alt={u.name}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-40 object-cover bg-gradient-to-br from-royalBlue/10 to-blue-100/20"
            />
            <div className="p-4">
              <div className="font-semibold">{u.name}</div>
              <p className="text-slate-600 text-sm mt-1">{u.overview ?? "Government accredited MBBS program with affordable fees."}</p>
              <div className="mt-3 inline-block px-3 py-2 rounded-md bg-royalBlue text-white">View Details</div>
            </div>
          </a>
        ))}
        {universities.length === 0 && (
          <div className="glass rounded-xl p-6">No universities available.</div>
        )}
      </div>
    </div>
  );
}
