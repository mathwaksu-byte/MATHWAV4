import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "NEET, NMC & FMGE — Kyrgyzstan MBBS Guide | MATHWA" },
  { name: "description", content: "What Indian students need to know about NEET, NMC rules, and FMGE after MBBS in Kyrgyzstan." },
  { property: "og:title", content: "NEET, NMC & FMGE — Kyrgyzstan MBBS Guide | MATHWA" },
  { property: "og:description", content: "Key requirements for Indian students: NEET, NMC, FMGE." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function PostNEETNMCFMGE() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NEET, NMC & FMGE — Kyrgyzstan MBBS Guide",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">NEET, NMC & FMGE — Kyrgyzstan MBBS Guide</h1>
      <p className="mt-2 text-slate-700">Key requirements for Indian students pursuing MBBS in Kyrgyzstan.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">NEET</h2>
        <p className="text-slate-700">NEET qualification is required for Indian students to pursue MBBS abroad.</p>
        <h2 className="text-2xl font-semibold mt-6">NMC</h2>
        <p className="text-slate-700">Follow applicable NMC policies for foreign medical education and licensing.</p>
        <h2 className="text-2xl font-semibold mt-6">FMGE</h2>
        <p className="text-slate-700">Plan FMGE preparations post graduation for practice in India.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan" className="px-4 py-2 rounded-md bg-royalBlue text-white">MBBS Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}

