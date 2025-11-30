import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";
import Layout from "./components/Layout";
import { json } from "@remix-run/cloudflare";
import styles from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "MBBS in Kyrgyzstan — Official Admissions | MATHWA" },
  { name: "description", content: "Official admissions partner for Kyrgyz State University — MBBS in Kyrgyzstan, fees, eligibility, visa support." },
  { property: "og:title", content: "MBBS in Kyrgyzstan — Official Admissions | MATHWA" },
  { property: "og:description", content: "Official admissions partner for Kyrgyz State University — MBBS in Kyrgyzstan, fees, eligibility, visa support." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" }
];

export async function loader({ context, request }: LoaderFunctionArgs) {
  const env = ((context as any)?.env) || {};
  const origin = new URL(request.url).origin;

  // Fetch public site settings server-side to avoid client-side flicker
  let settings: any = {
    hero_title: "Study MBBS Abroad with Confidence",
    hero_subtitle: "Transparent fees, visa assistance, and student housing.",
    hero_video_mp4_url: "",
    hero_video_webm_url: "",
    hero_video_poster_url: "",
    logo_url: "",
  };

  try {
    const apiBinding = (context as any)?.env?.API as any;
    let resSettings: any = null;

    if (apiBinding?.fetch) {
      resSettings = await apiBinding.fetch(new Request("https://api.local/api/settings/public")).catch(() => null as any);
    } else {
      const apiUrlRaw = (context as any)?.env?.API_URL as any;
      const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
      const bases = [
        ...(envApi ? [envApi] : []),
        "http://127.0.0.1:3002",
        "http://localhost:3002",
        "http://127.0.0.1:3001",
        "http://localhost:3001",
        "http://127.0.0.1:8787"
      ];
      for (const b of bases) {
        const r = await fetch(`${b}/api/settings/public`).catch(() => null as any);
        if (r && r.ok) { resSettings = r; break; }
      }
    }

    if (resSettings && resSettings.ok) {
      const sj = await resSettings.json();
      settings = sj?.settings ?? settings;
    }
  } catch {}

  return json({
    SUPABASE_URL: env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || "",
    API_URL: env.API_URL || "",
    WHATSAPP_NUMBER: env.WHATSAPP_NUMBER || "",
    WHATSAPP_MESSAGE: env.WHATSAPP_MESSAGE || "",
    CALL_NUMBER: env.CALL_NUMBER || "",
    settings,
    SITE_ORIGIN: origin
  }, {
    headers: { "Cache-Control": "public, max-age=60" }
  });
}

export default function App() {
  const env = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {env.settings?.logo_url && (
          <link rel="icon" type="image/png" href={env.settings.logo_url} />
        )}
        {env.API_URL && (
          <link rel="preconnect" href={env.API_URL} crossOrigin="" />
        )}
        {env.SUPABASE_URL && (
          <link rel="preconnect" href={env.SUPABASE_URL} crossOrigin="" />
        )}
        <link rel="canonical" href={`${env.SITE_ORIGIN}${location.pathname}`} />
        <meta property="og:site_name" content="MATHWA" />
        <meta property="og:url" content={`${env.SITE_ORIGIN}${location.pathname}`} />
        <meta name="theme-color" content="#1b3b9c" />
        {env.settings?.hero_video_poster_url && (
          <meta property="og:image" content={env.settings.hero_video_poster_url} />
        )}
        {env.settings?.hero_video_poster_url && (
          <link rel="preload" as="image" href={env.settings.hero_video_poster_url} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "MATHWA",
              "url": env.SITE_ORIGIN,
              "logo": env.settings?.logo_url || "",
              "sameAs": []
            })
          }}
        />
      </head>
      <body>
        <Layout siteSettings={env.settings}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV=${JSON.stringify(env)}`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const po = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('[perf] LCP', Math.round(entry.startTime));
                    } else if (entry.name === 'first-contentful-paint') {
                      console.log('[perf] FCP', Math.round(entry.startTime));
                    } else if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                      console.log('[perf] CLS', entry.value);
                    }
                  }
                });
                po.observe({ type: 'largest-contentful-paint', buffered: true });
                po.observe({ type: 'layout-shift', buffered: true });
                const fcp = performance.getEntriesByName('first-contentful-paint')[0];
                if (fcp) console.log('[perf] FCP', Math.round(fcp.startTime));
              } catch {}
            `
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
