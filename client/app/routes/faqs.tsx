import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type FAQ = { id: string; question: string; answer: string; category?: string };

export const meta: MetaFunction = () => ([
  { title: "FAQs — MBBS in Kyrgyzstan | MATHWA" },
  { name: "description", content: "Frequently asked questions about MBBS in Kyrgyzstan — fees, eligibility, NEET/NMC/FMGE, visa and housing." },
  { property: "og:title", content: "FAQs — MBBS in Kyrgyzstan | MATHWA" },
  { property: "og:description", content: "Answers to common questions about MBBS in Kyrgyzstan." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" }
]);

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const apiBinding = (context as any)?.env?.API as any;
    let res: any = null;
    if (apiBinding?.fetch) {
      res = await apiBinding.fetch(new Request("https://api.local/api/faqs")).catch(() => null as any);
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
        res = await fetch(`${b}/api/faqs`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }
    let faqs: FAQ[] = [];
    if (res && res.ok) {
      const data = await res.json();
      faqs = (data?.faqs ?? []) as FAQ[];
    }
    return json({ faqs }, { headers: { 'Cache-Control': 'public, max-age=300' } });
  } catch {
    return json({ faqs: [] }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  }
}

export default function FAQs() {
  const { faqs } = useLoaderData<typeof loader>();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f: FAQ) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Frequently Asked Questions</h1>
      <p className="mt-2 text-slate-700">Answers to common questions about MBBS in Kyrgyzstan.</p>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="glass rounded-xl">
            <div className="px-4 py-3 font-medium text-slate-800">{f.question}</div>
            <div className="px-4 pb-4 text-slate-700 text-sm">{f.answer}</div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="glass rounded-xl p-6">FAQs will appear here soon.</div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
