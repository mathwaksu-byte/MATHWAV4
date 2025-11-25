import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "MBBS in Kyrgyzstan Fees — Guide | MATHWA" },
  { name: "description", content: "Detailed overview of MBBS fees in Kyrgyzstan — tuition, hostel, and other costs for Indian students." },
  { property: "og:title", content: "MBBS in Kyrgyzstan Fees — Guide | MATHWA" },
  { property: "og:description", content: "Tuition and living cost overview for MBBS programs in Kyrgyzstan." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary" }
]);

export default function GuideFees() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MBBS in Kyrgyzstan Fees",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">MBBS in Kyrgyzstan Fees</h1>
      <p className="mt-2 text-slate-700">Indicative annual tuition fees, hostel, and miscellaneous costs for MBBS programs.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Tuition</h2>
        <p className="text-slate-700">Fees vary by institution. Refer to official university pages for current schedules.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Tuition</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              <tr>
                <td className="py-2 pr-4">1</td>
                <td className="py-2 pr-4">$3,500–$6,500</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">2–5</td>
                <td className="py-2 pr-4">$3,500–$6,500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-semibold mt-6">Hostel</h2>
        <p className="text-slate-700">University-managed hostels provide affordable accommodation near campus.</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-slate-800">
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Housing</div>
            <p className="mt-2">Typical range: $200–$260 per month.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Other Costs</div>
            <p className="mt-2">Food, transport, utilities vary by lifestyle.</p>
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
