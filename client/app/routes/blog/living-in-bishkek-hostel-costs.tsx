import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "Living in Bishkek — Hostel & Monthly Costs | MATHWA" },
  { name: "description", content: "Hostel amenities, typical monthly budgets, and lifestyle costs for MBBS students in Bishkek." },
  { property: "og:title", content: "Living in Bishkek — Hostel & Monthly Costs | MATHWA" },
  { property: "og:description", content: "What to expect for housing and living costs during MBBS." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function PostLivingBishkek() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Living in Bishkek — Hostel & Monthly Costs",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Living in Bishkek — Hostel & Monthly Costs</h1>
      <p className="mt-2 text-slate-700">What to expect for housing, amenities, and monthly budgets.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Hostel Amenities</h2>
        <p className="text-slate-700">Proximity to campus, basic furnishings, internet, and security.</p>
        <h2 className="text-2xl font-semibold mt-6">Monthly Budget</h2>
        <ul className="list-disc pl-6 text-slate-700">
          <li>Housing: $200–$260</li>
          <li>Food: $120–$200</li>
          <li>Transport: $20–$40</li>
          <li>Utilities & phone: $30–$50</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan-hostel" className="px-4 py-2 rounded-md bg-royalBlue text-white">Hostel Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}

