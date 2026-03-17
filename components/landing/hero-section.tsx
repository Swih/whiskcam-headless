"use client";

import { HERO_CONTENT } from "lib/content";
import { Button } from "components/ui/button";
import { motion } from "framer-motion";
import { formatPrice } from "lib/format";
import type { Product } from "lib/shopify/types";

export function HeroSection({ product }: { product?: Product }) {
  const price = product
    ? formatPrice(
        product.priceRange.maxVariantPrice.amount,
        product.priceRange.maxVariantPrice.currencyCode
      )
    : "€49.90";

  const scrollToProduct = () => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Video background fullscreen */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_CONTENT.posterSrc}
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_CONTENT.videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content — centered, mobile-first */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-20 pb-20 text-center sm:pt-0 sm:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[11px] font-semibold uppercase tracking-[0.15em] text-wk-amber sm:text-xs"
        >
          {HERO_CONTENT.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-3 text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight text-white sm:mt-4"
        >
          {HERO_CONTENT.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70 sm:mt-5 sm:text-lg"
        >
          {HERO_CONTENT.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-7 flex flex-col items-center gap-3 sm:mt-8"
        >
          <Button size="lg" onClick={scrollToProduct} className="w-full sm:w-auto">
            Shop Now — {price}
          </Button>
          <span className="text-xs text-white/50 sm:text-sm">Free worldwide shipping</span>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mt-5 flex items-center justify-center gap-2 sm:mt-6"
        >
          <div className="flex text-wk-amber">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-white/50 sm:text-sm">{HERO_CONTENT.trust}</span>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border-2 border-white/20 p-1"
        >
          <div className="mx-auto h-1.5 w-0.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
