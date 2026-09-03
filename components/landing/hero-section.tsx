"use client";

import { HERO_CONTENT } from "lib/content";
import { Button } from "components/ui/button";
import { formatPrice } from "lib/format";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "lib/shopify/types";

export function HeroSection({ product }: { product?: Product }) {
  const t = useTranslations("hero");
  const [videoReady, setVideoReady] = useState(false);
  const videoReadyRef = useRef(false);

  // Fallback: force video visible after 3s if no event fires (e.g. mobile autoplay delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoReadyRef.current) {
        videoReadyRef.current = true;
        setVideoReady(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const price = product
    ? formatPrice(
        product.priceRange.maxVariantPrice.amount,
        product.priceRange.maxVariantPrice.currencyCode
      )
    : "€79";

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Poster image (always visible as base layer) */}
      <Image
        src={HERO_CONTENT.posterSrc}
        alt="Cat wearing Whiskcam collar camera, POV footage concept"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Video background — poster matches first frame so transition is seamless */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={HERO_CONTENT.posterSrc}
        onCanPlayThrough={() => { videoReadyRef.current = true; setVideoReady(true); }}
        onPlay={() => { videoReadyRef.current = true; setVideoReady(true); }}
        onPlaying={() => { videoReadyRef.current = true; setVideoReady(true); }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ opacity: videoReady ? 1 : 0 }}
      >
        <source src={HERO_CONTENT.videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content — 2-col on large screens, centered on mobile */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-20 pb-20 sm:pt-0 sm:pb-16">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-12">

          {/* Left column — text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="hero-rise hero-rise-1">
              <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-wk-amber">
                {t("tagline")}
              </span>
              <span className="mt-3 block text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white sm:mt-4">
                {t("title")}
              </span>
            </h1>

            <p className="hero-rise hero-rise-3 mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70 sm:mt-5 sm:text-lg lg:mx-0">
              {t("subtitle")}
            </p>

            <div className="hero-rise hero-rise-4 mt-7 flex flex-col items-center gap-3 sm:mt-8 lg:items-start">
              {/* Status pill — honest "now shipping" signal, no fake urgency */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-wk-amber/40 bg-wk-amber/10 px-3 py-1 text-xs font-semibold text-wk-amber">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-wk-amber" />
                {t("urgencyBadge")}
              </span>

              <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}>
                {t("ctaButton")} — {price}
              </Button>
              <span className="text-xs text-white/50 sm:text-sm">{t("ctaSubtext")}</span>
            </div>

            {/* Trust */}
            <div className="hero-rise hero-rise-5 mt-5 flex items-center justify-center gap-2 sm:mt-6 lg:justify-start">
              <div className="flex text-wk-amber">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-white/50 sm:text-sm">{t("trust")}</span>
            </div>
          </div>

          {/* Right column — product shot (all screens) */}
          <div className="hero-rise hero-rise-6 mt-6 flex justify-center lg:mt-0 lg:w-[420px] lg:shrink-0 lg:items-center lg:justify-center">
            <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:h-[200px] sm:w-[200px] lg:h-[300px] lg:w-[300px]">
              <Image
                src="/images/product/whiskcam-product-studio.webp"
                alt="Whiskcam collar camera"
                fill
                className="object-cover scale-[1.2]"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator — hidden on small mobile */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="animate-scroll-hint h-9 w-5 rounded-full border-2 border-white/20 p-1">
          <div className="mx-auto h-1.5 w-0.5 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
