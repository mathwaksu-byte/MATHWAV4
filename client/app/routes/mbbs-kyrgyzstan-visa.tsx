import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "MBBS in Kyrgyzstan Visa — Guide | MATHWA" },
  { name: "description", content: "Visa steps for MBBS in Kyrgyzstan — invitation, documents, embassy appointment, timelines." },
  { property: "og:title", content: "MBBS in Kyrgyzstan Visa — Guide | MATHWA" },
  { property: "og:description", content: "Key visa steps and documents for MBBS in Kyrgyzstan." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function GuideVisa() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MBBS in Kyrgyzstan Visa",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">MBBS in Kyrgyzstan Visa</h1>
      <p className="mt-2 text-slate-700">Invitation issuance, document checklist, embassy appointment, and processing timelines.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Invitation Letter</h2>
        <p className="text-slate-700">Initiated by the university after application review.</p>
        <h2 className="text-2xl font-semibold mt-6">Documents</h2>
        <p className="text-slate-700">Valid passport, academic transcripts, medical certificates, and supporting forms as requested.</p>
        <h2 className="text-2xl font-semibold mt-6">Timeline</h2>
        <p className="text-slate-700">Processing time varies; plan travel after visa approval.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan" className="px-4 py-2 rounded-md bg-royalBlue text-white">Back to Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}
