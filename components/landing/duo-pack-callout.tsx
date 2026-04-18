"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { AnimatedElement } from "components/ui/animated-element";
import { AddToCart } from "components/cart/add-to-cart";
import { formatPrice } from "lib/format";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Product } from "lib/shopify/types";

interface DuoPackCalloutProps {
  // The duo product is fetched server-side from Shopify by handle
  // (`whiskcam-duo-pack-2-cameras`). When present, this component renders
  // a real add-to-cart button that uses the existing cart context.
  // When absent (product hidden / unpublished / handle renamed), the
  // component falls back to a scroll-to-#product CTA so the landing
  // never ships with a broken button.
  duoProduct?: Product;
}

// Multi-pet upsell. Placed after ReviewsSection where Vilma L.'s "second
// camera" testimonial establishes multi-cat social proof. Uses the Shopify
// duo product's real image when available (Shopify CDN) and falls back to
// the studio shot otherwise.
export function DuoPackCallout({ duoProduct }: DuoPackCalloutProps) {
  const t = useTranslations("duoPack");

  // Prefer real Shopify price when product is loaded — this keeps the UI
  // honest if the founder changes pricing in Shopify without redeploying.
  const realPrice = duoProduct
    ? formatPrice(
        duoProduct.priceRange.maxVariantPrice.amount,
        duoProduct.priceRange.maxVariantPrice.currencyCode,
      )
    : null;

  const compareAt = duoProduct?.variants[0]?.compareAtPrice;
  const realCompareAt = compareAt
    ? formatPrice(compareAt.amount, compareAt.currencyCode)
    : null;

  const displayPrice = realPrice ?? t("price");
  const displayCompareAt = realCompareAt ?? t("compareAtPrice");

  // Use the duo product's hero image from Shopify if available.
  const imageSrc =
    duoProduct?.featuredImage?.url ??
    "/images/product/whiskcam-product-studio.webp";
  const imageAlt =
    duoProduct?.featuredImage?.altText ||
    "Two Whiskcam collar cameras — duo pack for multi-cat households";

  return (
    <SectionWrapper bg="warm">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-card)] bg-wk-dark text-white shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Visual */}
          <AnimatedElement animation="fadeIn" className="relative min-h-[260px] md:min-h-[320px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-wk-amber px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-wk-dark">
              {t("badge")}
            </div>
          </AnimatedElement>

          {/* Copy */}
          <AnimatedElement animation="fadeUp" delay={0.08} className="flex flex-col justify-center p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-wk-amber">
              {t("overline")}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t("subtitle")}
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{displayPrice}</span>
              <span className="text-base text-white/40 line-through">{displayCompareAt}</span>
              <span className="rounded-full bg-wk-amber/20 px-2 py-0.5 text-xs font-semibold text-wk-amber">
                {t("savings")}
              </span>
            </div>

            <ul className="mt-5 space-y-2">
              {(["0", "1", "2"] as const).map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-wk-amber" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{t(`benefits.${i}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {duoProduct ? (
                // Real Shopify-backed button — adds the duo product to the cart
                // drawer and tracks analytics, identical flow to the main CTA.
                <AddToCart product={duoProduct} />
              ) : (
                // Fallback when the duo product isn't reachable. Scrolls back
                // to the solo product section so the CTA never dead-ends.
                <a
                  href="#product"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-wk-amber px-6 py-3.5 text-sm font-semibold text-wk-dark transition-colors hover:bg-wk-amber-hover"
                >
                  {t("cta")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </SectionWrapper>
  );
}
