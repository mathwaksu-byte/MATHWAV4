import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "MBBS in Kyrgyzstan Eligibility — Guide | MATHWA" },
  { name: "description", content: "Eligibility criteria for MBBS in Kyrgyzstan including PCB marks, NEET qualification, and NMC/FMGE notes." },
  { property: "og:title", content: "MBBS in Kyrgyzstan Eligibility — Guide | MATHWA" },
  { property: "og:description", content: "Eligibility and NEET/NMC/FMGE requirements for Indian students." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function GuideEligibility() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MBBS in Kyrgyzstan Eligibility",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">MBBS in Kyrgyzstan Eligibility</h1>
      <p className="mt-2 text-slate-700">Minimum academic marks, NEET qualification, and regulatory considerations for Indian students.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Academic Requirements</h2>
        <p className="text-slate-700">Typically 50–55% in Physics, Chemistry, Biology at 10+2.</p>
        <ul className="list-disc pl-6 text-slate-700">
          <li>10+2 in PCB and English</li>
          <li>Age eligibility per university policy</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6">NEET and NMC</h2>
        <p className="text-slate-700">NEET qualification is mandatory for Indian students; follow applicable NMC guidelines.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan" className="px-4 py-2 rounded-md bg-royalBlue text-white">Back to Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}
