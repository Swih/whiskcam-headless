"use client";

import { VIDEOS, POV_IMAGES } from "lib/content";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Deterministic fake engagement numbers seeded per video index       */
/* ------------------------------------------------------------------ */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function fakeLikes(index: number) {
  const n = 2.1 + seededRandom(index * 7) * (12.4 - 2.1);
  return `${n.toFixed(1)}K`;
}

function fakeComments(index: number) {
  return Math.round(45 + seededRandom(index * 13) * (340 - 45));
}

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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1DA1F2" />
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
  const [paused, setPaused] = useState(false);
  const [isAnyPlaying, setIsAnyPlaying] = useState(false);
  const playingRef = useRef(0);

  const onVideoPlay = useCallback(() => {
    playingRef.current += 1;
    setIsAnyPlaying(playingRef.current > 0);
  }, []);

  const onVideoPause = useCallback(() => {
    playingRef.current = Math.max(0, playingRef.current - 1);
    setIsAnyPlaying(playingRef.current > 0);
  }, []);

  // Duplicate videos for seamless infinite loop
  const allVideos = [...VIDEOS, ...VIDEOS];

  return (
    <section className="bg-wk-dark py-16 md:py-24" id="footage">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Real footage"
          title="What Your Cat Actually Does"
          subtitle="Unedited clips from cats wearing Whiskcam. Swipe to explore."
          light
        />

        {/* ---- TikTok-style video carousel — CSS infinite scroll ---- */}
        <div
          className="relative overflow-hidden"
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
              <ReelCard key={`${video.src}-${i}`} video={video} index={i % VIDEOS.length} />
            ))}
          </div>
        </div>

        {/* ---- POV stills grid ---- */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {POV_IMAGES.map((img, i) => (
            <AnimatedElement key={img.src} delay={i * 0.05} animation="scale">
              <div className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2.5 pt-8">
                  <p className="text-xs font-medium text-white">
                    {img.caption}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
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
  index,
}: {
  video: { src: string; title: string; duration: string; poster: string };
  index: number;
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

  const likes = fakeLikes(index);
  const comments = fakeComments(index);

  return (
    <div className="w-52 flex-none md:w-60">
      <div
        role="button"
        aria-label={
          playing ? `Pause ${video.title}` : `Play ${video.title}`
        }
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

        {/* ---- TikTok right-side action icons ---- */}
        <div className="pointer-events-none absolute bottom-16 right-2.5 z-10 flex flex-col items-center gap-4">
          {/* Heart */}
          <div className="flex flex-col items-center gap-0.5">
            <HeartIcon className="h-6 w-6 text-white drop-shadow-md" />
            <span className="text-[10px] font-semibold text-white drop-shadow-md">
              {likes}
            </span>
          </div>
          {/* Comment */}
          <div className="flex flex-col items-center gap-0.5">
            <CommentIcon className="h-6 w-6 text-white drop-shadow-md" />
            <span className="text-[10px] font-semibold text-white drop-shadow-md">
              {comments}
            </span>
          </div>
          {/* Share */}
          <div className="flex flex-col items-center gap-0.5">
            <ShareIcon className="h-6 w-6 text-white drop-shadow-md" />
            <span className="text-[10px] font-semibold text-white drop-shadow-md">
              Share
            </span>
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
            {video.title}
          </p>
        </div>

        {/* ---- Music ticker at very bottom ---- */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center gap-1.5 overflow-hidden">
          <MusicNoteIcon className="h-3 w-3 flex-none text-white/70" />
          <span className="truncate text-[10px] text-white/50">
            Original Sound — whiskcam
          </span>
        </div>

        {/* Duration badge top-right */}
        <div className="absolute right-2.5 top-2.5 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {video.duration}
        </div>
      </div>
    </div>
  );
}
