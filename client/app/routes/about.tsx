import type { MetaFunction } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => ([
  { title: 'About — MATHWA Official Admissions' },
  { name: 'description', content: 'About MATHWA — Official admissions partner for Kyrgyz State University named after I. Arabaev. Learn about our visa support, student care, and partnership.' },
  { property: 'og:title', content: 'About — MATHWA Official Admissions' },
  { property: 'og:description', content: 'Official admissions partner for Kyrgyz State University named after I. Arabaev.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:image', content: '/uploads/universities/kyrgyz/logo.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'About — MATHWA Official Admissions' },
  { name: 'twitter:description', content: 'Official admissions partner for Kyrgyz State University named after I. Arabaev.' }
]);

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const apiBinding = (context as any)?.env?.API as any;
    let res: any = null;
    
    if (apiBinding?.fetch) {
      res = await apiBinding.fetch(new Request("https://api.local/api/universities")).catch(() => null as any);
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
        res = await fetch(`${b}/api/universities`).catch(() => null as any);
        if (res && res.ok) break;
      }
    }

    let universities: any[] = [];
    if (res && res.ok) {
      const data = await res.json();
      universities = (data?.universities ?? []) as any[];
    }
    return json({ universities });
  } catch {
    return json({ universities: [] });
  }
}

export default function About() {
  const { universities } = useLoaderData<typeof loader>();
  // Find KSU specifically or fallback to first
  const ksu = universities.find((u: any) => u.slug.includes('arabaev') || u.slug.includes('kyrgyz-state')) || universities[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Kyrgyz State University named after I. Arabaev — Official Admissions via MATHWA</h1>
      <p className="mt-4 text-slate-700">
        Celebrating its 80th Anniversary (1945–2025), Kyrgyz State University named after I. Arabaev is one of the leading public universities in Kyrgyzstan. With a legacy of excellence in education and science, it is a government-accredited institution recognized globally.
      </p>
      <p className="mt-4 text-slate-700">
        MATHWA is the official admission partner for KSU. We bridge the gap for international students, providing direct, transparent, and guaranteed admissions to this prestigious university.
      </p>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h2 className="text-xl font-bold text-royalBlue mb-4">University at a Glance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="font-semibold text-slate-900">Established</div>
            <div className="text-slate-600">1945 (80 Years Legacy)</div>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Students</div>
            <div className="text-slate-600">20,000+ Enrolled</div>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Faculty</div>
            <div className="text-slate-600">1,000+ (50+ Doctors of Science)</div>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Location</div>
            <div className="text-slate-600">51 Razzakov Str, Bishkek</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        {[
          { title: 'Official Partnership', desc: 'Direct MoU with KSU ensures zero-agent commissions and complete transparency.' },
          { title: 'Visa & Documentation', desc: 'We handle Ministry invitations, translation, notarization, and visa processing.' },
          { title: 'Student Welfare', desc: 'Dedicated Indian mess, separate hostels, and 24/7 local support in Bishkek.' },
        ].map((item) => (
          <div key={item.title} className="glass p-6 rounded-lg">
            <div className="font-semibold">{item.title}</div>
            <div className="text-slate-600 mt-1 text-sm">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        <h2 className="text-2xl font-bold">Why Choose KSU named after I. Arabaev?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose text-slate-700">
            <p>
              <strong>Government Accreditation:</strong> KSU is a state university awarded the prestigious <em>"Dank" Order</em> (2022) and the international <em>"Quality Choice Prize"</em> from the European Society for Quality Research.
            </p>
            <p className="mt-4">
              <strong>International Recognition:</strong> Ranked 2nd among Kyrgyz universities in the GreenMetric global ranking. The university has over 90 international agreements with institutions in Turkey, Japan, South Korea, Germany, and Russia.
            </p>
            <p className="mt-4">
              <strong>Medical Education:</strong> The university is actively developing its medical faculty, offering a curriculum designed for international standards (NMC/WHO guidelines), focusing on clinical exposure and modern infrastructure.
            </p>
          </div>
          <div className="glass p-6 rounded-xl bg-white/50">
             <h3 className="font-semibold text-lg mb-3">Rector's Vision</h3>
             <blockquote className="italic text-slate-600 border-l-4 border-royalBlue pl-4">
               "Our goal is to provide high-quality education that meets modern standards. We are building the future today with new academic buildings and expanding our medical programs."
             </blockquote>
             <div className="mt-4 font-medium text-slate-900">— Prof. Dr. Aigul Abdraeva, Rector</div>
          </div>
        </div>
      </div>
      <h2 className="mt-10 text-2xl font-bold">Our Partner Universities</h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-6">
        {ksu ? (
          <a href={`/universities/${ksu.slug}`} className="block glass rounded-lg overflow-hidden">
            <img 
              src={ksu.hero_image_url || ksu.logo_url || ""} 
              alt={ksu.name} 
              className="w-full h-40 object-cover bg-white" 
            />
            <div className="p-4">
              <div className="font-semibold">{ksu.name}</div>
              <p className="text-slate-600 text-sm mt-1">{ksu.overview || "Accredited MBBS course with 6-year program."}</p>
              <div className="mt-3 inline-block px-3 py-2 rounded-md bg-royalBlue text-white">View Details</div>
            </div>
          </a>
        ) : (
          <div className="p-4 text-slate-500">Loading partner universities...</div>
        )}
      </div>
    </div>
  );
}
