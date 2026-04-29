"use client";

import { trackViewContent } from "components/analytics";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import { Badge } from "components/ui/badge";
import { AddToCart } from "components/cart/add-to-cart";
import { formatPrice, computeDiscount } from "lib/format";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import type { Product } from "lib/shopify/types";

const FALLBACK_IMAGES = [
  { src: "/images/product/whiskcam-product-studio.webp", alt: "Whiskcam camera" },
  { src: "/images/lifestyle/wk-cat-1.webp", alt: "Cat wearing Whiskcam" },
  { src: "/images/product/whiskcam-scale.webp", alt: "Whiskcam size comparison with euro coin" },
  { src: "/images/lifestyle/wk-cat-2.webp", alt: "Black cat with Whiskcam" },
  { src: "/images/product/whiskcam-box-contents.webp", alt: "What's in the box" },
  { src: "/images/lifestyle/wk-cat-outdoor.webp", alt: "Whiskcam on grass outdoors" },
];

const BOX_COUNT = 6;

export function ProductSection({ product }: { product?: Product }) {
  const t = useTranslations("product");
  const images = product
    ? product.images.map((img) => ({ src: img.url, alt: img.altText }))
    : FALLBACK_IMAGES;

  const price = product
    ? formatPrice(
        product.priceRange.maxVariantPrice.amount,
        product.priceRange.maxVariantPrice.currencyCode
      )
    : "€79";

  const compareAtPrice = product?.variants[0]?.compareAtPrice;
  const compareAtPriceFormatted = compareAtPrice
    ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
    : null;
  const discount = compareAtPrice
    ? computeDiscount(product!.priceRange.maxVariantPrice.amount, compareAtPrice.amount)
    : 0;

  const cc = product?.priceRange.maxVariantPrice.currencyCode || "EUR";

  useEffect(() => {
    if (product) {
      trackViewContent({
        name: product.title,
        price: product.priceRange.maxVariantPrice.amount,
        currency: product.priceRange.maxVariantPrice.currencyCode,
      });
    }
  }, [product]);

  return (
    <SectionWrapper bg="white" id="product">
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left — Gallery */}
        <AnimatedElement animation="fadeIn" className="min-w-0">
          <ProductGallery images={images} />
        </AnimatedElement>

        {/* Right — Buy box */}
        <AnimatedElement animation="fadeUp" delay={0.1}>
          <div className="lg:sticky lg:top-24">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="amber">{t("badgeBestSeller")}</Badge>
              <Badge variant="outline">{t("badge1080p")}</Badge>
              <Badge variant="outline">{t("badgeNoApp")}</Badge>
            </div>

            {/* Title */}
            <h2 className="mt-3 text-xl font-bold tracking-tight text-wk-black sm:text-2xl md:text-3xl">
              {product?.title || "Whiskcam Original"}
            </h2>

            {/* Price */}
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-wk-black sm:text-2xl">{price}</span>
              {compareAtPriceFormatted && (
                <span className="text-sm text-wk-grey-400 line-through">{compareAtPriceFormatted}</span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-wk-amber/10 px-2 py-0.5 text-xs font-semibold text-wk-amber">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Stars */}
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex text-wk-amber">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-wk-grey-500">{t("reviews")}</span>
            </div>

            {/* Key benefits */}
            <ul className="mt-5 space-y-2">
              {([0, 1, 2, 3] as const).map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-wk-grey-600">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-wk-amber" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{t(`keyBenefits.${i}`)}</span>
                </li>
              ))}
            </ul>

            {/* Free Gifts */}
            <div className="mt-6 rounded-xl border border-wk-amber/20 bg-wk-amber/5 p-4">
              <p className="text-xs uppercase tracking-wide font-bold text-wk-amber">
                {t("freeGiftsLabel")}
              </p>
              <div className="mt-3 space-y-3">
                {/* MicroSD */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-wk-grey-100 bg-white">
                    <Image src="/images/product/gift-microsd.webp" alt="32GB MicroSD Card" fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">{t("microsdName")}</p>
                    <p className="text-xs text-wk-grey-400">{t("microsdDetail")}</p>
                  </div>
                  <span className="text-xs font-bold text-wk-green">{t("free")}</span>
                </div>
                {/* Adapter */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-wk-grey-100 bg-white">
                    <Image src="/images/product/gift-adapter.webp" alt="USB-C Adapter" fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">{t("adapterName")}</p>
                    <p className="text-xs text-wk-grey-400">{t("adapterDetail")}</p>
                  </div>
                  <span className="text-xs font-bold text-wk-green">{t("free")}</span>
                </div>
                {/* Shipping */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg border border-wk-grey-100 bg-white">
                    <svg className="h-5 w-5 text-wk-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">{t("shippingName")}</p>
                    <p className="text-xs text-wk-grey-400">{t("shippingDetail")}</p>
                  </div>
                  <span className="text-xs font-bold text-wk-green">{t("free")}</span>
                </div>
              </div>
              <div className="mt-3 border-t border-wk-amber/20 pt-3 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-wk-grey-600">{t("totalValue")}</span>
                  <span className="font-semibold text-wk-grey-600 line-through">
                    {compareAtPriceFormatted || formatPrice("109.00", cc)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-wk-black">{t("youPay")}</span>
                  <span className="text-lg font-bold text-wk-black">{price}</span>
                </div>
              </div>
            </div>

            {/* ATC */}
            <div className="mt-4" id="add-to-cart">
              {product ? (
                <AddToCart product={product} />
              ) : (
                <div className="rounded-[var(--radius-btn)] bg-wk-grey-100 p-4 text-center text-sm text-wk-grey-500">
                  {t("atcFallback")}
                </div>
              )}
              <p className="mt-2.5 text-xs text-wk-grey-400">
                {t("freeShippingMoneyBack")}
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-wk-grey-100 pt-5">
              {[
                { labelKey: "trustShipping" as const, icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
                { labelKey: "trustReturn" as const, icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                { labelKey: "trustSecure" as const, icon: "M3 11h18v11H3zM7 11V7a5 5 0 0110 0v4" },
              ].map((b) => (
                <div key={b.labelKey} className="flex flex-col items-center gap-1 text-center">
                  <svg className="h-4 w-4 text-wk-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                  <span className="text-[10px] font-medium text-wk-grey-500 sm:text-xs">{t(b.labelKey)}</span>
                </div>
              ))}
            </div>

            {/* Payment logos */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Visa */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm8.1-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.2.5 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.4-2.4zm7.9-.3h-2.3c-.7 0-1.3.2-1.6 1l-4.4 10.5h3.1l.6-1.7h3.8l.4 1.7H38l-2.5-11.5zm-3.6 7.4l1.6-4.2.8 4.2h-2.4zM16.4 9.5l-2.8 7.9-.3-1.5c-.5-1.8-2.2-3.7-4.1-4.7l2.7 10h3.2l4.7-11.7h-3.4z" fill="#6b7280"/>
              </svg>
              {/* Mastercard */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <circle cx="20" cy="16" r="8" fill="#c4c4c4"/>
                <circle cx="28" cy="16" r="8" fill="#a3a3a3"/>
                <path d="M24 9.4A7.96 7.96 0 0 0 20 16a7.96 7.96 0 0 0 4 6.6A7.96 7.96 0 0 0 28 16a7.96 7.96 0 0 0-4-6.6z" fill="#8b8b8b"/>
              </svg>
              {/* PayPal */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <path d="M19.2 8h5.4c2.5 0 4.3 1.2 4 3.8-.4 3.5-2.5 5.3-5.4 5.3h-1.4c-.4 0-.7.3-.8.7l-.7 4.4c0 .2-.2.3-.4.3h-2.6c-.3 0-.4-.2-.4-.5l2.3-14zm3 3.2l-.6 3.5h1c1.4 0 2.4-.6 2.6-2.1.1-1-.5-1.4-1.5-1.4h-1.5z" fill="#6b7280"/>
                <path d="M30.2 8h5.4c2.5 0 4.3 1.2 4 3.8-.4 3.5-2.5 5.3-5.4 5.3h-1.4c-.4 0-.7.3-.8.7l-.7 4.4c0 .2-.2.3-.4.3h-2.6c-.3 0-.4-.2-.4-.5l2.3-14z" fill="#9ca3af" opacity=".6"/>
              </svg>
              {/* Apple Pay */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <path d="M15.2 12.4c.5-.6.8-1.4.7-2.2-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.4-.7 2.1.8.1 1.6-.4 2.1-1zm.7.9c-1.2-.1-2.2.7-2.7.7s-1.4-.6-2.4-.6c-1.2 0-2.3.7-2.9 1.8-1.3 2.2-.3 5.4.9 7.2.6.9 1.3 1.8 2.3 1.8.9 0 1.3-.6 2.3-.6 1.1 0 1.4.6 2.4.6.9 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1-1-.4-1.8-1.5-1.8-2.9 0-1.2.7-2.2 1.6-2.7-.7-.8-1.6-1.3-2.6-1.4h-.3z" fill="#6b7280"/>
                <path d="M25 11.5v10.6h1.6v-3.6h2.2c2 0 3.5-1.4 3.5-3.5s-1.4-3.5-3.4-3.5H25zm1.6 1.4h1.8c1.4 0 2.1.7 2.1 2s-.8 2.1-2.1 2.1h-1.8v-4.1zm7.6 5.8c0 1.4 1.1 2.4 2.8 2.4.7 0 1.7-.3 2.2-.9v.8h1.5v-4.6c0-1.5-1.2-2.5-3-2.5-1.6 0-2.8.9-2.9 2.1h1.5c.2-.6.7-.9 1.4-.9.9 0 1.4.4 1.4 1.2v.5l-1.9.1c-1.7.1-2.6.8-2.6 2l.1-.2zm4.4-.5c0 .7-.7 1.2-1.6 1.2-.7 0-1.3-.3-1.3-1 0-.7.5-1 1.5-1.1l1.4-.1v1z" fill="#6b7280"/>
              </svg>
              {/* Google Pay */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <path d="M24.3 16.5v3.1h-1v-8.5h2.7c.7 0 1.3.2 1.8.7s.7 1 .7 1.7-.2 1.2-.7 1.7c-.5.4-1.1.7-1.8.7h-1.7v-.4zm0-4.4v3.5h1.8c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.2 0-.5-.2-.9-.5-1.3-.3-.3-.7-.5-1.2-.5h-1.8zm7.4 1.6c.7 0 1.3.2 1.7.6.4.4.6.9.6 1.6v3.2h-.9v-.7c-.4.6-.9.9-1.6.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.6-1.2s.2-.9.5-1.2.9-.5 1.6-.5c.6 0 1 .1 1.4.4v-.3c0-.4-.2-.8-.5-1-.3-.3-.6-.4-1-.4-.6 0-1 .3-1.3.8l-.8-.5c.4-.7 1.1-1.1 2.1-1.1h.3zm-1.3 4.7c.3.2.6.3 1 .3s.8-.2 1.1-.5c.3-.3.5-.6.5-1-.3-.3-.8-.4-1.3-.4-.5 0-.8.1-1.1.3-.3.2-.4.5-.4.8 0 .2.1.4.2.5zm6.6-4.6l-2.6 6c-.5 1.2-1.1 1.6-2 1.6l-.3-.1v-.9l.3.1c.5 0 .8-.2 1-1l-2.3-5.6h1l1.8 4.4 1.7-4.4h1l-.6-.1z" fill="#6b7280"/>
                <path d="M21.3 16.2c0-.4 0-.8-.1-1.2h-5v2.2h2.9c-.1.7-.5 1.2-1 1.6v1.3h1.6c1-1 1.5-2.3 1.5-3.9z" fill="#9ca3af"/>
                <path d="M16.2 20.4c1.4 0 2.5-.4 3.3-1.2l-1.6-1.3c-.4.3-1 .5-1.7.5-1.3 0-2.4-.9-2.8-2.1h-1.7v1.3c.9 1.7 2.6 2.8 4.5 2.8z" fill="#9ca3af" opacity=".8"/>
                <path d="M11.8 16.3c0-.4.1-.9.2-1.3v-1.3h-1.7c-.4.7-.6 1.6-.6 2.5s.2 1.8.6 2.5l1.7-1.3c-.2-.4-.2-.7-.2-1.1z" fill="#a3a3a3" opacity=".7"/>
                <path d="M16.2 11.9c.7 0 1.4.3 1.9.7l1.4-1.4c-.9-.8-2-1.3-3.3-1.3-1.9 0-3.6 1.1-4.5 2.8l1.7 1.3c.4-1.2 1.5-2.1 2.8-2.1z" fill="#b0b0b0" opacity=".7"/>
              </svg>
              {/* Klarna */}
              <svg className="h-5 opacity-40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#f5f5f5"/>
                <path d="M14 10h2.4v12H14V10zm3.6 0c0 2.7-1 5.2-2.8 7.1l5.2 4.9h-3.3l-4.7-4.5v-1h.4c2.7 0 5-2 5.2-4.6V10h0zm4.2 9.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zm3-9.8h2.3v12h-2.3V10zm6.7 0h2.3v12h-2.3v-1c-.7.8-1.8 1.2-3 1.2-2.5 0-4.5-2.1-4.5-4.7s2-4.7 4.5-4.7c1.2 0 2.3.5 3 1.2V10zm-2.7 9.5c1.3 0 2.4-1 2.4-2.3s-1.1-2.3-2.4-2.3-2.3 1-2.3 2.3 1 2.3 2.3 2.3z" fill="#6b7280"/>
              </svg>
            </div>

            {/* What's in the box */}
            <div className="mt-5 rounded-xl border border-wk-grey-200 p-4">
              <p className="mb-2.5 text-sm font-semibold text-wk-black">{t("boxContentsLabel")}</p>
              <ul className="space-y-1.5">
                {Array.from({ length: BOX_COUNT }, (_, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="mt-1.5 h-1 w-1 flex-none rounded-full bg-wk-amber" />
                    <div className="min-w-0">
                      <span className="font-medium text-wk-black">{t(`boxContents.${i}.item` as `boxContents.${0 | 1 | 2 | 3 | 4 | 5}.item`)}</span>
                      <span className="text-wk-grey-400"> — {t(`boxContents.${i}.detail` as `boxContents.${0 | 1 | 2 | 3 | 4 | 5}.detail`)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}

// ─── Gallery types ────────────────────────────────────────────────────────────

type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster: string }
  | { type: "infographic"; alt: string };

// ─── Features infographic custom slide ───────────────────────────────────────

function FeaturesInfographicSlide() {
  const t = useTranslations("product");
  const specs = [
    { value: "1080P", labelKey: "specFullHd" as const },
    { value: "170°", labelKey: "specWideAngle" as const },
    { value: "24g", labelKey: "specUltralight" as const },
    { value: "2h", labelKey: "specBattery" as const },
    { value: "No WiFi", labelKey: "specPrivacy" as const },
    { value: "No App", labelKey: "specPlugPlay" as const },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] px-6 py-8">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
        {t("infographicOverline")}
      </p>
      <h3 className="mb-6 text-center text-lg font-black text-white sm:text-2xl">
        {t("infographicTitle")}
        <br />
        <span className="text-amber-400">{t("infographicHighlight")}</span>
      </h3>

      <div className="grid w-full max-w-[260px] grid-cols-3 gap-2.5 sm:max-w-xs sm:gap-3">
        {specs.map((spec) => (
          <div
            key={spec.value}
            className="flex flex-col items-center justify-center rounded-xl bg-white/10 px-2 py-3 ring-1 ring-white/10 backdrop-blur-sm"
          >
            <span className="text-sm font-black text-white sm:text-base">{spec.value}</span>
            <span className="mt-0.5 text-center text-[9px] leading-tight text-white/55 sm:text-[10px]">
              {t(spec.labelKey)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-white/35">
        {t("infographicFooter")}
      </p>
    </div>
  );
}

// ─── Infographic thumbnail (desktop strip) ────────────────────────────────────

function InfographicThumbnail() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0f0f1a] to-[#16213e] p-1.5">
      <div className="grid w-full grid-cols-2 gap-0.5">
        {["1080P", "170°", "24g", "No App"].map((v) => (
          <div
            key={v}
            className="flex items-center justify-center rounded-sm bg-white/15 py-1"
          >
            <span className="text-[7px] font-bold leading-none text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Product Gallery ──────────────────────────────────────────────────────────

// Peek geometry (mobile only):
//   slideW  = containerWidth - PEEK_PX - GAP_PX
//   trackX  = -(active × (slideW + GAP_PX))
// At containerWidth=390: slideW=362, step=370 → 20px of next slide visible ✓
const PEEK_PX = 20;
const GAP_PX = 8;
// Per NNGroup: users stop after 3–4 swipes → cap the sequence at 7 slides.
const MAX_SLIDES = 7;

function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  const t = useTranslations("product");
  const imgMedia = images.map((img) => ({ type: "image" as const, ...img }));

  // Conversion-optimised media sequence, capped at MAX_SLIDES
  const allMedia: MediaItem[] = [
    ...imgMedia.slice(0, 2),
    {
      type: "video",
      src: "/images/product/unboxing.mp4",
      alt: "Unboxing Whiskcam",
      poster: "/images/product/unboxing-poster.jpg",
    },
    ...imgMedia.slice(2, 4),
    {
      type: "infographic",
      alt: "Whiskcam specs: 1080P Full HD, 170° wide angle, 24g ultralight, no WiFi, no app needed",
    },
    ...imgMedia.slice(4),
  ];
  const media = allMedia.slice(0, MAX_SLIDES);

  // ── State & refs ────────────────────────────────────────────────────────────
  const [active, setActive] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = media.length;

  // ── Detect mobile breakpoint (lg = 1024px) ──────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Measure container width (useLayoutEffect = no flash) ────────────────────
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Derived geometry ────────────────────────────────────────────────────────
  // Full-width slides on all viewports (no peek effect).
  const slideW = containerWidth > 0 ? containerWidth : 0;
  const trackX = slideW > 0 ? -(active * slideW) : 0;

  // ── Navigation — clamped (linear, not wrapping) ──────────────────────────────
  const goNext = useCallback(
    () => setActive((p) => Math.min(p + 1, total - 1)),
    [total]
  );
  const goPrev = useCallback(() => setActive((p) => Math.max(p - 1, 0)), []);

  // Auto-scroll the active thumbnail into view (skip initial render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const strip = thumbnailStripRef.current;
    if (!strip) return;
    const thumb = strip.children[active] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Touch swipe — only fire when gesture is clearly horizontal
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const endY = e.changedTouches[0]?.clientY ?? (touchStartY.current ?? 0);
    const deltaX = endX - touchStartX.current;
    const deltaY = Math.abs(endY - (touchStartY.current ?? 0));
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
      deltaX < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  const mediaKey = (item: MediaItem) =>
    item.type === "infographic" ? "slide-infographic" : item.src;

  // Track total width
  const trackWidth = slideW > 0 ? total * slideW : undefined;

  return (
    <div className="w-full select-none">
      {/* ── Main viewport ─────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={[
          "group relative aspect-square overflow-hidden rounded-2xl bg-wk-grey-50",
          // zoom-on-hover only when the active slide is an image, desktop only
          media[active]?.type === "image" ? "lg:cursor-zoom-in" : "",
        ].join(" ")}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label={`Product gallery, slide ${active + 1} of ${total}`}
      >
        {/* ── Horizontal sliding track ──────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 bottom-0 flex"
          style={{
            width: trackWidth ? `${trackWidth}px` : "100%",
            transform: `translateX(${trackX}px)`,
            transition: "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
        >
          {media.map((item, i) => (
            <div
              key={mediaKey(item)}
              className="relative flex-none overflow-hidden"
              style={{
                width: slideW > 0 ? `${slideW}px` : "100%",
                height: "100%",
                borderRadius: "1rem",
              }}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  onClick={(e) => {
                    const v = e.currentTarget;
                    v.muted = false;
                    v.paused ? v.play() : v.pause();
                  }}
                />
              ) : item.type === "infographic" ? (
                <FeaturesInfographicSlide />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={[
                    "object-cover",
                    // Zoom only on the active image slide, desktop hover
                    i === active ? "transition-transform duration-500 ease-out lg:group-hover:scale-110" : "",
                  ].join(" ")}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Instagram Stories-style progress bar (mobile only) ────────── */}
        {total > 1 && (
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 pt-3 pr-12 lg:hidden"
            aria-hidden="true"
          >
            {media.map((_, i) => (
              <div
                key={i}
                className={[
                  "h-[3px] flex-1 rounded-full transition-colors duration-300",
                  i < active
                    ? "bg-white/80"
                    : i === active
                    ? "bg-wk-amber"
                    : "bg-white/25",
                ].join(" ")}
              />
            ))}
          </div>
        )}

        {/* ── Slide counter "1 / N" (mobile only, top-right) ─────────────── */}
        {total > 1 && (
          <div className="pointer-events-none absolute right-3 top-2.5 z-20 lg:hidden">
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {active + 1}/{total}
            </span>
          </div>
        )}

        {/* ── First-slide overlays ─────────────────────────────────────────── */}
        {active === 0 && (
          <>
            {/* Best-Seller badge — top-left, below story bar on mobile */}
            <div className="pointer-events-none absolute left-3 z-20 top-8 lg:top-3">
              <span className="inline-flex items-center rounded-full bg-wk-amber px-2.5 py-1 text-[11px] font-bold text-white shadow-md ring-1 ring-white/20">
                {t("galleryBadge")}
              </span>
            </div>

            {/* Social proof pill — bottom-centre */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
              <div className="flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                <span className="text-xs text-yellow-400">★★★★★</span>
                <span className="whitespace-nowrap text-[11px] font-medium text-white">
                  {t("gallerySocialProof")}
                </span>
              </div>
            </div>
          </>
        )}

        {/* ── Navigation arrows ── */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              disabled={active === 0}
              className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-70 backdrop-blur-sm transition-all duration-200 hover:bg-black/50 disabled:opacity-20 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              disabled={active === total - 1}
              className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-70 backdrop-blur-sm transition-all duration-200 hover:bg-black/50 disabled:opacity-20 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail strip (mobile + desktop) ───────────────────────────── */}
      {total > 1 && (
        <div
          ref={thumbnailStripRef}
          className="mt-3 flex gap-2 overflow-x-auto scroll-smooth pb-1 scrollbar-hide"
        >
          {media.map((item, i) => (
            <button
              key={mediaKey(item)}
              onClick={() => setActive(i)}
              aria-label={`View slide ${i + 1}`}
              className={[
                "relative h-16 w-16 flex-none overflow-hidden rounded-lg border-2 transition-all duration-200",
                i === active
                  ? "border-wk-amber ring-1 ring-wk-amber/30"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-wk-grey-300",
              ].join(" ")}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <svg className="h-5 w-5 drop-shadow" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : item.type === "infographic" ? (
                <InfographicThumbnail />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
