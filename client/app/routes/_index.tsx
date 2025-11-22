import type { MetaFunction } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useNavigation } from "@remix-run/react";
import TrustBadges from "../components/TrustBadges";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import SkeletonCard from "../components/SkeletonCard";
import HeroVideo from "../components/HeroVideo";

export const meta: MetaFunction = () => ([
  { title: "Kyrgyz State University — MATHWA Official Admissions" },
  { name: "description", content: "Official admissions representation for Kyrgyz State University (Arabaev KSU) via MATHWA." },
]);

type FeaturedUniversity = {
  slug: string;
  name: string;
  hero_image_url?: string;
  overview?: string;
};
type University = FeaturedUniversity;

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const apiBinding = (context as any)?.env?.API as any;
    let res: any = null;
    let resSettings: any = null;
    if (apiBinding?.fetch) {
      console.log("[loader] Using API binding");
      res = await apiBinding.fetch(new Request("https://api.local/api/universities")).catch(() => null as any);
      resSettings = await apiBinding.fetch(new Request("https://api.local/api/settings/public")).catch(() => null as any);
    } else {
      console.log("[loader] Using fallback fetch");
      const apiUrlRaw = (context as any)?.env?.API_URL as any;
      const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
      const bases = [
        ...(envApi ? [envApi] : []),
        "http://127.0.0.1:3001",
        "http://localhost:3001",
        "http://127.0.0.1:8787"
      ];
      for (const b of bases) {
        console.log(`[loader] Trying fallback: ${b}/api/universities`);
        res = await fetch(`${b}/api/universities`).catch(() => null as any);
        if (res && res.ok) {
          console.log("[loader] Fallback universities fetch succeeded");
          break;
        }
      }
      for (const b of bases) {
        console.log(`[loader] Trying fallback: ${b}/api/settings/public`);
        resSettings = await fetch(`${b}/api/settings/public`).catch(() => null as any);
        if (resSettings && resSettings.ok) {
          console.log("[loader] Fallback settings fetch succeeded");
          break;
        }
      }
    }
    let list: University[] = [];
    let featured: FeaturedUniversity | null = null;
    if (res && res.ok) {
      const data = await res.json();
      console.log("[loader] Universities data:", data);
      list = (data?.universities ?? []) as University[];
      featured = list[0] ?? null;
    } else {
      console.log("[loader] No universities data received");
    }
    let settings: any = {
      hero_title: "Study MBBS Abroad with Confidence",
      hero_subtitle: "Transparent fees, visa assistance, and student housing.",
      hero_video_mp4_url: "",
      hero_video_webm_url: "",
      hero_video_poster_url: "",
    };
    if (resSettings && resSettings.ok) {
      const sj = await resSettings.json();
      console.log("[loader] Settings data:", sj);
      settings = sj?.settings ?? settings;
    } else {
      console.log("[loader] No settings data received");
    }
    return { featured, universities: list, settings } as { featured: FeaturedUniversity | null; universities: University[]; settings: any };
  } catch (err) {
    console.error("[loader] Error in loader:", err);
    return {
      featured: null,
      universities: [],
      settings: {
        hero_title: "Study MBBS Abroad with Confidence",
        hero_subtitle: "Transparent fees, visa assistance, and student housing.",
        hero_video_mp4_url: "",
        hero_video_webm_url: "",
        hero_video_poster_url: "",
      },
    } as { featured: FeaturedUniversity | null; universities: University[]; settings: any };
  }
}

export default function Index() {
  const { universities, settings } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";
  return (
    <div className="relative">
      <div className="px-4">
        <HeroVideo
          srcMp4={settings?.hero_video_mp4_url || undefined}
          srcWebm={settings?.hero_video_webm_url || undefined}
          poster={settings?.hero_video_poster_url || undefined}
          title={settings?.hero_title}
          subtitle={settings?.hero_subtitle}
          showTitleSubtitle={false}
          overlay="none"
          showPartnerBadge={false}
        />
      </div>
      <section className="mt-8 px-4">
        <div className="max-w-5xl mx-auto">
          <TrustBadges />
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Stats />
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">Explore Universities</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            )}
            {!isLoading && universities.length > 0 && (
              <>
                {universities.map((u) => (
                  <a key={u.slug} href={`/universities/${u.slug}`} className="block rounded-xl overflow-hidden border border-slate-200 hover:shadow transition-shadow">
                    <img
                      src={u.hero_image_url || ""}
                      alt={u.name}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-40 object-cover bg-gradient-to-br from-royalBlue/10 to-blue-100/20"
                    />
                    <div className="p-4">
                      <div className="font-semibold">{u.name}</div>
                      <p className="text-slate-600 text-sm mt-1">{u.overview ?? "Government accredited MBBS program with affordable fees."}</p>
                      <div className="mt-3 inline-block px-3 py-2 rounded-md bg-royalBlue text-white">View Details</div>
                    </div>
                  </a>
                ))}
              </>
            )}
            {!isLoading && universities.length === 0 && (
              <div className="glass rounded-xl p-6">
                <div className="font-semibold">Universities will appear here soon.</div>
                <p className="text-slate-600 text-sm mt-1">We are fetching live data. Please check back in a moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">What students say</h2>
          <div className="mt-4">
            <Testimonials />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4">
            <FAQ />
          </div>
        </div>
      </section>
    </div>
  );
}
