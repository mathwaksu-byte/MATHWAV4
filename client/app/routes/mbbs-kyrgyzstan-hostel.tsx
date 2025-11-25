import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "MBBS in Kyrgyzstan Hostel & Living Costs — Guide | MATHWA" },
  { name: "description", content: "Hostel accommodation, amenities, and typical living costs for MBBS students in Kyrgyzstan." },
  { property: "og:title", content: "MBBS in Kyrgyzstan Hostel & Living Costs — Guide | MATHWA" },
  { property: "og:description", content: "Housing options and monthly budgets for MBBS students." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function GuideHostel() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hostel & Living Costs",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Hostel & Living Costs</h1>
      <p className="mt-2 text-slate-700">Accommodation near campus with basic amenities, plus typical monthly living budgets.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Accommodation</h2>
        <p className="text-slate-700">University hostels offer convenient housing options at affordable rates.</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-slate-800">
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Amenities</div>
            <ul className="mt-2 space-y-1">
              <li>Campus proximity</li>
              <li>Basic furnishings</li>
              <li>Internet access</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Monthly Budget</div>
            <ul className="mt-2 space-y-1">
              <li>Housing: $200–$260</li>
              <li>Food: $120–$200</li>
              <li>Transport: $20–$40</li>
              <li>Utilities & phone: $30–$50</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/mbbs-kyrgyzstan" className="px-4 py-2 rounded-md bg-royalBlue text-white">Back to Guide</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </div>
  );
}
