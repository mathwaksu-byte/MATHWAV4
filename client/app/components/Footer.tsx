import { Link } from "@remix-run/react";

type FooterProps = {
  siteSettings?: any;
};

export default function Footer({ siteSettings }: FooterProps) {
  const env = (typeof window !== 'undefined' ? (window as any).ENV : {}) || {};
  const callNumber = siteSettings?.call_number || env.CALL_NUMBER || '+1 (555) 000‑0000';
  return (
    <footer className="mt-24 border-t border-slate-200 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap -ml-4 sm:-ml-6 lg:-ml-8">
              {siteSettings?.logo_url ? (
                <img
                  src={siteSettings.logo_url}
                  alt="Brand logo"
                  className="w-8 h-8 rounded-full object-contain bg-white p-0.5 border border-blue-200 ring-1 ring-blue-200 shadow-sm"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-royalBlue to-blue-500 shadow-glow" />
              )}
              <span className="font-semibold text-royalBlue text-sm sm:text-base leading-tight break-words">Kyrgyz State University named after I. Arabaev</span>
              <span className="mt-1 ml-1 inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-[10px] sm:text-xs whitespace-nowrap">
                — MATHWA (Official Partner)
              </span>
            </div>
            <p className="text-sm text-slate-600">Official admissions representation for Kyrgyz State University named after I. Arabaev (KSU) by MATHWA. Direct, transparent admissions—no consultancy.</p>
            <div className="mt-3 text-xs text-slate-500">
              <strong>University Address:</strong><br />
              51 Razzakov Str, Bishkek, 720026<br />
              Kyrgyz Republic
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/universities" className="hover:text-royalBlue">Universities</Link></li>
              <li><Link to="/about" className="hover:text-royalBlue">About us</Link></li>
              <li><Link to="/apply" className="hover:text-royalBlue">Apply</Link></li>
              <li><Link to="/faqs" className="hover:text-royalBlue">FAQs</Link></li>
              <li><Link to="/mbbs-kyrgyzstan" className="hover:text-royalBlue">MBBS in Kyrgyzstan</Link></li>
              <li><Link to="/blog" className="hover:text-royalBlue">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Email: support@mathwa.example</li>
              <li>Phone: {callNumber}</li>
              <li>Hours: Mon‑Fri 9:00–18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-slate-500">© {new Date().getFullYear()} Kyrgyz State University named after I. Arabaev — MATHWA. All rights reserved.</div>
     </div>
    </footer>
  );
}
