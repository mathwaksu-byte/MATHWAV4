import { Link, NavLink, useLocation, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

type NavbarProps = {
  siteSettings?: any;
};

export default function Navbar({ siteSettings: siteSettingsProp }: NavbarProps) {
  const location = useLocation();
  const fetcher = useFetcher();
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(siteSettingsProp || null);
  const [settingsLoading, setSettingsLoading] = useState(!siteSettingsProp);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if ((!siteSettingsProp || !siteSettingsProp.logo_url) && fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/settings/public");
    }
  }, [fetcher, siteSettingsProp]);

  useEffect(() => {
    if (fetcher.data?.settings) {
      setSiteSettings(fetcher.data.settings);
      setSettingsLoading(false);
    }
  }, [fetcher.data]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-white/70 shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-14 py-1">
          <Link to="/" className="flex items-center gap-1 sm:gap-2 flex-nowrap min-w-0">
            {siteSettings?.logo_url && logoOk ? (
              <img
                src={siteSettings.logo_url}
                alt="Brand logo"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-contain bg-white p-0.5 border border-blue-200 ring-1 ring-blue-200 shadow-sm"
                loading="eager"
                decoding="async"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span className="inline-block w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-royalBlue to-blue-500 shadow-glow" />
            )}
            <span className="font-semibold text-royalBlue tracking-tight text-sm sm:text-base truncate max-w-[60vw] sm:max-w-none">Kyrgyz State University named after I. Arabaev</span>
            <span className="hidden sm:inline-flex sm:ml-1 items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-[10px] sm:text-xs whitespace-nowrap">
              — MATHWA (Official Partner)
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({ isActive }) =>
              `hover:text-royalBlue transition-colors ${isActive && "text-royalBlue"}`
            }>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `hover:text-royalBlue transition-colors ${isActive && "text-royalBlue"}`
            }>About</NavLink>
            <NavLink to="/universities" className={({ isActive }) =>
              `hover:text-royalBlue transition-colors ${isActive && "text-royalBlue"}`
            }>Universities</NavLink>
            <NavLink to="/apply" className={({ isActive }) =>
              `hover:text-royalBlue transition-colors ${isActive && "text-royalBlue"}`
            }>Apply</NavLink>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/apply"
              className="inline-flex items-center rounded-full bg-royalBlue text-white px-4 py-2 text-sm shadow-glow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-royalBlue"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-royalBlue/20 to-transparent" />
      )}
    </header>
  );
}
