"use client";

import { VIDEOS, POV_IMAGES } from "lib/content";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/*  SVG icons (inline, no external lib)                               */
/* ------------------------------------------------------------------ */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#F5A623" />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ================================================================== */
/*  VideoShowcase Section                                             */
/* ================================================================== */
export function VideoShowcase() {
  const t = useTranslations("videoShowcase");
  const [paused, setPaused] = useState(false);

  // Duplicate videos for seamless infinite loop
  const allVideos = [...VIDEOS, ...VIDEOS];

  return (
    <section className="bg-wk-dark py-16 md:py-24" id="footage">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
          light
        />

        {/* ---- TikTok-style video carousel — CSS infinite scroll ---- */}
        <div
          className="relative overflow-clip"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left fade gradient */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-wk-dark to-transparent sm:w-20" />
          {/* Right fade gradient */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-wk-dark to-transparent sm:w-20" />

          <div
            className={`flex gap-4 ${paused ? "[animation-play-state:paused]" : ""}`}
            style={{
              animation: "carousel-scroll 80s linear infinite",
              width: "max-content",
            }}
          >
            {allVideos.map((video, i) => (
              <ReelCard
                key={`${video.src}-${i}`}
                video={video}
                title={t(`videos.${i % VIDEOS.length}` as `videos.${0 | 1 | 2 | 3 | 4 | 5 | 6}`)}
                playLabel={t("play")}
                pauseLabel={t("pause")}
              />
            ))}
          </div>
        </div>

        {/* ---- POV stills carousel — scrolls opposite direction to videos ---- */}
        <div className="relative mt-12 overflow-clip">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-wk-dark to-transparent sm:w-20" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-wk-dark to-transparent sm:w-20" />

          <div
            className={`flex gap-3 ${paused ? "[animation-play-state:paused]" : ""}`}
            style={{
              animation: "carousel-scroll-reverse 60s linear infinite",
              width: "max-content",
            }}
          >
            {[...POV_IMAGES, ...POV_IMAGES].map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="group relative w-52 flex-none overflow-hidden rounded-xl sm:w-64"
              >
                <div className="aspect-[16/10]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="260px"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2.5 pt-6">
                  <p className="text-xs font-medium text-white">
                    {t(`povCaptions.${i % POV_IMAGES.length}` as `povCaptions.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Individual Reel Card                                              */
/* ================================================================== */
function ReelCard({
  video,
  title,
  playLabel,
  pauseLabel,
}: {
  video: { src: string; duration: string; poster: string };
  title: string;
  playLabel: string;
  pauseLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="w-52 flex-none md:w-60">
      <div
        role="button"
        aria-label={playing ? `${pauseLabel} ${title}` : `${playLabel} ${title}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl bg-black"
        onClick={toggle}
      >
        {/* Video */}
        <video
          ref={ref}
          poster={video.poster}
          preload="metadata"
          playsInline
          loop
          muted
          className="h-full w-full object-cover"
          onEnded={() => setPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {/* Dark gradient overlay at bottom — always visible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-40% to-transparent" />

        {/* ---- Play button overlay (hidden when playing) ---- */}
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <PlayIcon className="ml-1 h-6 w-6 text-white" />
          </div>
        </div>

        {/* ---- Bottom-left text overlay ---- */}
        <div className="pointer-events-none absolute bottom-8 left-2.5 right-12 z-10">
          {/* Username + verified */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white drop-shadow-md">
              @whiskcam
            </span>
            <VerifiedBadge className="h-3.5 w-3.5" />
          </div>
          {/* Video title */}
          <p className="mt-0.5 text-[11px] leading-snug text-white/70 drop-shadow-md">
            {title}
          </p>
        </div>

        {/* Duration badge top-right */}
        <div className="absolute right-2.5 top-2.5 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {video.duration}
        </div>
      </div>
    </div>
  );
}
