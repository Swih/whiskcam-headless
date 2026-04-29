"use client";

import { Button } from "components/ui/button";
import { AnimatedElement } from "components/ui/animated-element";
import { formatPrice } from "lib/format";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product } from "lib/shopify/types";

export function CtaBanner({ product }: { product?: Product }) {
  const t = useTranslations("cta");

  const price = product
    ? formatPrice(
        product.priceRange.maxVariantPrice.amount,
        product.priceRange.maxVariantPrice.currencyCode
      )
    : "€79";

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <Image
        src="/images/lifestyle/chat-unplash-4.webp"
        alt="Cat exploring the world with Whiskcam"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-wk-dark/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <AnimatedElement>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-wk-amber">
            {t("overline")}
          </p>
          <h2 className="mt-4 font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-wk-grey-400">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}>
              {t("button")} — {price}
            </Button>
          </div>
          <p className="mt-4 text-xs text-wk-grey-500">
            {t("footnote")}
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
