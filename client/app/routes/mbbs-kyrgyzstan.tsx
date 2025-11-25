import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
  { title: "MBBS in Kyrgyzstan — Complete Guide | MATHWA" },
  { name: "description", content: "Fees, eligibility, NEET/NMC/FMGE, visa process, hostel & living costs — comprehensive guide to MBBS in Kyrgyzstan for Indian students." },
  { property: "og:title", content: "MBBS in Kyrgyzstan — Complete Guide | MATHWA" },
  { property: "og:description", content: "Comprehensive guide for Indian students: fees, eligibility, NEET, visa, hostel." },
  { property: "og:type", content: "article" },
  { name: "twitter:card", content: "summary_large_image" }
]);

export default function GuideKyrgyzstan() {
  const now = new Date().toISOString();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MBBS in Kyrgyzstan — Complete Guide",
    "datePublished": now,
    "dateModified": now,
    "author": { "@type": "Organization", "name": "MATHWA" },
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">MBBS in Kyrgyzstan — Complete Guide</h1>
      <p className="mt-2 text-slate-700">Key information for Indian students on fees, eligibility, NEET/NMC/FMGE, visa process, hostel and living costs.</p>
      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Fees Overview</h2>
        <p className="text-slate-700">Typical annual tuition ranges and total program costs vary by university. Refer to individual university pages for precise breakdowns.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Tuition</th>
                <th className="py-2 pr-4">Hostel</th>
                <th className="py-2 pr-4">Misc</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              <tr>
                <td className="py-2 pr-4">1</td>
                <td className="py-2 pr-4">$3,500–$6,500</td>
                <td className="py-2 pr-4">$200–$260</td>
                <td className="py-2 pr-4">$150–$300</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">2–5</td>
                <td className="py-2 pr-4">$3,500–$6,500</td>
                <td className="py-2 pr-4">$200–$260</td>
                <td className="py-2 pr-4">$150–$300</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-semibold mt-6">Eligibility & NEET/NMC/FMGE</h2>
        <p className="text-slate-700">Minimum 50–55% in PCB at 10+2, NEET qualification required for Indian students, and adherence to NMC guidelines. FMGE preparation is recommended for post-graduation licensing in India.</p>
        <ul className="list-disc pl-6 text-slate-700">
          <li>10+2 with PCB and English</li>
          <li>NEET qualification for Indian students</li>
          <li>Follow applicable NMC policies for foreign degrees</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6">Visa Process</h2>
        <p className="text-slate-700">Application through the university invitation, submission of necessary documents, and embassy appointment. We assist through the process.</p>
        <ol className="list-decimal pl-6 text-slate-700">
          <li>Receive university invitation</li>
          <li>Prepare documents and medical certificates</li>
          <li>Embassy appointment and submission</li>
          <li>Travel arrangements upon approval</li>
        </ol>
        <h2 className="text-2xl font-semibold mt-6">Hostel & Living Costs</h2>
        <p className="text-slate-700">Affordable housing near campus with basic amenities. Living costs are lower compared to many destinations.</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-slate-800">
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Monthly Budget</div>
            <ul className="mt-2 space-y-1">
              <li>Housing: $200–$260</li>
              <li>Food: $120–$200</li>
              <li>Transport: $20–$40</li>
              <li>Utilities & phone: $30–$50</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="font-semibold">Amenities</div>
            <ul className="mt-2 space-y-1">
              <li>Campus proximity</li>
              <li>Basic furnishings</li>
              <li>Internet access</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/universities" className="px-4 py-2 rounded-md bg-royalBlue text-white">Explore Universities</a>
          <a href="/apply" className="px-4 py-2 rounded-md bg-slate-800 text-white">Apply Now</a>
          <a href="/faqs" className="px-4 py-2 rounded-md bg-blue-100 text-blue-700">See FAQs</a>
        </div>
        <h2 className="text-2xl font-semibold mt-6">Clinical Exposure & Recognition</h2>
        <p className="text-slate-700">Clinical exposure typically starts early, and degrees from recognized institutions are accepted internationally.</p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
              { "@type": "ListItem", "position": 2, "name": "Guides", "item": "/blog" },
              { "@type": "ListItem", "position": 3, "name": "MBBS in Kyrgyzstan — Complete Guide", "item": "/mbbs-kyrgyzstan" }
            ]
          })
        }}
      />
    </div>
  );
}
