import { useEffect, useRef } from "react";
import { useState } from "react";

type Props = {
  srcMp4?: string;
  srcWebm?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  // Whether to show title/subtitle overlay text over the video
  showTitleSubtitle?: boolean;
  // Control the gradient overlay strength over the video
  overlay?: 'none' | 'subtle' | 'strong';
  // Branding / partnership badge
  showPartnerBadge?: boolean;
  brandName?: string;
  partnerName?: string;
  partnerUrl?: string;
  // Custom text override for badge when you want partner-first branding
  badgeText?: string;
  // Optional logo for the partner badge
  badgeLogoSrc?: string;
  badgeLogoAlt?: string;
};

export default function HeroVideo({
  srcMp4,
  srcWebm,
  poster,
  title = "Study MBBS Abroad with Confidence",
  subtitle = "Transparent fees, visa assistance, and housing with official partners.",
  showTitleSubtitle = false,
  overlay = 'subtle',
  showPartnerBadge = false,
  brandName = 'MATHWA',
  partnerName,
  partnerUrl,
  badgeText,
  badgeLogoSrc,
  badgeLogoAlt,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [badgeLogoError, setBadgeLogoError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const hasVideo = Boolean(srcMp4 || srcWebm);
  const hasPoster = Boolean(poster);
  const [format, setFormat] = useState<'webm' | 'mp4' | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !hasVideo) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoad(true);
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [hasVideo]);

  useEffect(() => {
    // Choose a single playable format to avoid aborted requests
    const tester = document.createElement('video');
    const canWebm = !!tester.canPlayType && tester.canPlayType('video/webm') !== '';
    const canMp4 = !!tester.canPlayType && tester.canPlayType('video/mp4') !== '';
    if (srcWebm && canWebm) setFormat('webm');
    else if (srcMp4 && canMp4) setFormat('mp4');
    else setFormat(null);
  }, [srcWebm, srcMp4]);

  return (
    <section className="relative min-h-[65vh] rounded-2xl overflow-hidden">
      {hasVideo ? (
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={poster}
          aria-label="Hero background video preview"
          onLoadedData={() => setReady(true)}
        >
          {shouldLoad && format === 'webm' && srcWebm && (
            <source src={srcWebm} type="video/webm" />
          )}
          {shouldLoad && format === 'mp4' && srcMp4 && (
            <source src={srcMp4} type="video/mp4" />
          )}
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={hasPoster ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {!hasPoster && (
            <div className="w-full h-full bg-gradient-to-br from-royalBlue/20 via-blue-200/30 to-white" />
          )}
        </div>
      )}
      <div
        className={`relative z-10 h-full w-full flex items-center justify-center text-center p-6 ${
          overlay === 'none'
            ? ''
            : overlay === 'strong'
            ? 'bg-gradient-to-t from-black/50 via-black/20 to-transparent'
            : 'bg-gradient-to-t from-black/20 via-black/10 to-transparent'
        }`}
      >
        {hasVideo && !ready && (
          <div className="absolute top-3 right-3 text-xs bg-white/80 px-2 py-1 rounded-full border border-slate-200">Loading…</div>
        )}
        {showPartnerBadge && (
          <div className="absolute top-3 left-3">
            <a
              href={partnerUrl || '#'}
              target={partnerUrl ? '_blank' : undefined}
              rel={partnerUrl ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-800 border border-slate-200 px-3 py-1 text-xs sm:text-sm shadow backdrop-blur-sm"
            >
              {badgeLogoSrc && !badgeLogoError ? (
                <img
                  src={badgeLogoSrc}
                  alt={badgeLogoAlt || partnerName || 'University logo'}
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-contain bg-white p-0.5 border border-slate-200 ring-1 ring-slate-200"
                  loading="eager"
                  decoding="async"
                  onError={() => setBadgeLogoError(true)}
                />
              ) : (
                <span className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-royalBlue/15 border border-slate-200" />
              )}
              {badgeText ? (
                <span className="font-semibold whitespace-nowrap">{badgeText}</span>
              ) : (
                <>
                  <span className="font-semibold">{brandName}</span>
                  <span className="opacity-60">•</span>
                  <span>Official Partner{partnerName ? ` of ${partnerName}` : ''}</span>
                </>
              )}
            </a>
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          {showTitleSubtitle && (
            <>
              <h1 className="text-white text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow">
                {title}
              </h1>
              <p className="mt-3 text-white/90 text-lg drop-shadow">
                {subtitle}
              </p>
            </>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/apply" className="px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-glow">Apply Now</a>
            <a
              href="#admissions"
              className="px-5 py-2.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Admissions Desk
            </a>
            <a href="https://wa.me/" className="px-5 py-2.5 rounded-full bg-green-600 text-white">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
