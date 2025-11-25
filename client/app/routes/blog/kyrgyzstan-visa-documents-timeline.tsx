import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "Kyrgyzstan Visa — Documents & Timeline | MATHWA" },
  { name: "description", content: "Visa invitation, documents checklist, embassy appointment, and processing timelines for MBBS in Kyrgyzstan." },
  { property: "og:title", content: "Kyrgyzstan Visa — Documents & Timeline | MATHWA" },
  { property: "og:description", content: "Steps and timelines for Kyrgyzstan student visa." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function PostVisaTimeline() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kyrgyzstan Visa — Documents & Timeline",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Kyrgyzstan Visa — Documents & Timeline</h1>
      <p className="mt-2 text-slate-700">Invitation issuance, document checklist, embassy appointment, and processing timelines.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Invitation</h2>
        <p className="text-slate-700">Issued by university after application review.</p>
        <h2 className="text-2xl font-semibold mt-6">Documents</h2>
        <p className="text-slate-700">Valid passport, academic transcripts, medical certificates, and supporting forms.</p>
        <h2 className="text-2xl font-semibold mt-6">Timeline</h2>
        <p className="text-slate-700">Processing time varies; book travel after approval.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan-visa" className="px-4 py-2 rounded-md bg-royalBlue text-white">Visa Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}

