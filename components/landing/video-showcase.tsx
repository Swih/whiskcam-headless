"use client";

import { VIDEOS, POV_IMAGES } from "lib/content";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function VideoShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll carousel
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let speed = 0.5; // px per frame

    const scroll = () => {
      if (!paused && container) {
        container.scrollLeft += speed;
        // Loop back when reaching end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [paused]);

  return (
    <section className="bg-wk-dark py-16 md:py-24" id="footage">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Real footage"
          title="What Your Cat Actually Does"
          subtitle="Unedited clips captured by cats wearing collar cameras. This could be your cat."
          light
        />

        {/* Videos — auto-scroll, pause on hover */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            // Resume after 3s on mobile
            setTimeout(() => setPaused(false), 3000);
          }}
          className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {VIDEOS.map((video, i) => (
            <AnimatedElement key={video.src} delay={i * 0.08}>
              <VideoCard video={video} />
            </AnimatedElement>
          ))}
        </div>

        {/* POV stills grid */}
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
                  <p className="text-xs font-medium text-white">{img.caption}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
}: {
  video: { src: string; title: string; duration: string; poster: string };
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
    <div className="w-56 flex-none md:w-64">
      <div
        role="button"
        aria-label={playing ? `Pause ${video.title}` : `Play ${video.title}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl"
        onClick={toggle}
      >
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

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "pointer-events-none opacity-0" : "bg-black/20"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
            <svg
              className="ml-0.5 h-4 w-4 text-wk-black"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-2.5 right-2.5 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {video.duration}
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-wk-grey-400">
        {video.title}
      </p>
    </div>
  );
}
