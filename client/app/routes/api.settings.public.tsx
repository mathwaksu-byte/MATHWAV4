import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const apiBinding = (context as any)?.env?.API as any;
    let resSettings: any = null;
    
    if (apiBinding?.fetch) {
      console.log("[api.settings.public] Using API binding");
      resSettings = await apiBinding.fetch(new Request("https://api.local/api/settings/public")).catch(() => null as any);
    } else {
      console.log("[api.settings.public] Using fallback fetch");
      const apiUrlRaw = (context as any)?.env?.API_URL as any;
      const envApi = typeof apiUrlRaw === 'string' && apiUrlRaw ? apiUrlRaw : undefined;
      const bases = [
        ...(envApi ? [envApi] : []),
        "http://127.0.0.1:3002",
        "http://localhost:3002",
        "http://127.0.0.1:8787"
      ];
      for (const b of bases) {
        console.log(`[api.settings.public] Trying fallback: ${b}/api/settings/public`);
        resSettings = await fetch(`${b}/api/settings/public`).catch(() => null as any);
        if (resSettings && resSettings.ok) {
          console.log("[api.settings.public] Fallback settings fetch succeeded");
          break;
        }
      }
    }
    
    let settings: any = {
      hero_title: "Study MBBS Abroad with Confidence",
      hero_subtitle: "Transparent fees, visa assistance, and student housing.",
      hero_video_mp4_url: "",
      hero_video_webm_url: "",
      hero_video_poster_url: "",
      logo_url: "",
    };
    
    if (resSettings && resSettings.ok) {
      const sj = await resSettings.json();
      console.log("[api.settings.public] Settings data:", sj);
      settings = sj?.settings ?? settings;
    } else {
      console.log("[api.settings.public] No settings data received");
    }
    
    return new Response(JSON.stringify({ settings }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (err) {
    console.error("[api.settings.public] Error in loader:", err);
    return new Response(JSON.stringify({ 
      settings: {
        hero_title: "Study MBBS Abroad with Confidence",
        hero_subtitle: "Transparent fees, visa assistance, and student housing.",
        hero_video_mp4_url: "",
        hero_video_webm_url: "",
        hero_video_poster_url: "",
        logo_url: "",
      }
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
}
