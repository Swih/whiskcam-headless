"use client";

import { trackViewContent } from "components/analytics";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import { Badge } from "components/ui/badge";
import { AddToCart } from "components/cart/add-to-cart";
import { BOX_CONTENTS } from "lib/content";
import { formatPrice, computeDiscount } from "lib/format";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Product } from "lib/shopify/types";

const FALLBACK_IMAGES = [
  { src: "/images/product/whiskcam-product-studio.webp", alt: "Whiskcam camera" },
  { src: "/images/lifestyle/wk-cat-1.jpg", alt: "Cat wearing Whiskcam" },
  { src: "/images/product/whiskcam-scale.jpg", alt: "Whiskcam size comparison with euro coin" },
  { src: "/images/lifestyle/wk-cat-2.jpg", alt: "Black cat with Whiskcam" },
  { src: "/images/product/whiskcam-box-contents.jpg", alt: "What's in the box" },
  { src: "/images/lifestyle/wk-cat-outdoor.png", alt: "Whiskcam on grass outdoors" },
];

export function ProductSection({ product }: { product?: Product }) {
  const images = product
    ? product.images.map((img) => ({ src: img.url, alt: img.altText }))
    : FALLBACK_IMAGES;

  const price = product
    ? formatPrice(
        product.priceRange.maxVariantPrice.amount,
        product.priceRange.maxVariantPrice.currencyCode
      )
    : "€49.90";

  const compareAtPrice = product?.variants[0]?.compareAtPrice;
  const compareAtPriceFormatted = compareAtPrice
    ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
    : null;
  const discount = compareAtPrice
    ? computeDiscount(product!.priceRange.maxVariantPrice.amount, compareAtPrice.amount)
    : 0;

  const currencySymbol = product?.priceRange.maxVariantPrice.currencyCode === "EUR" ? "€" : "$";

  // Track ViewContent when product section mounts
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
        overline="Shop"
        title="Whiskcam Original"
        subtitle="Everything you need to see your pet's secret world."
      />

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left — Gallery */}
        <AnimatedElement animation="fadeIn">
          <ProductGallery images={images} />
        </AnimatedElement>

        {/* Right — Buy box */}
        <AnimatedElement animation="fadeUp" delay={0.1}>
          <div className="lg:sticky lg:top-24">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 lg:justify-start">
              <Badge variant="amber">Best Seller</Badge>
              <Badge variant="outline">1080P Full HD</Badge>
              <Badge variant="outline">No App</Badge>
            </div>

            {/* Title */}
            <h2 className="mt-3 text-center text-xl font-bold tracking-tight text-wk-black sm:text-2xl md:text-3xl lg:text-left">
              {product?.title || "Whiskcam Original"}
            </h2>

            {/* Price */}
            <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2 lg:justify-start">
              <span className="text-xl font-bold text-wk-black sm:text-2xl">{price}</span>
              {compareAtPriceFormatted && (
                <span className="text-sm text-wk-grey-400 line-through">{compareAtPriceFormatted}</span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-wk-amber/10 px-2 py-0.5 text-[11px] font-semibold text-wk-amber">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Stars */}
            <div className="mt-2 flex items-center justify-center gap-1.5 lg:justify-start">
              <div className="flex text-wk-amber">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-wk-grey-500">500+ pet parents</span>
            </div>

            {/* Key benefits */}
            <ul className="mt-5 mx-auto max-w-xs space-y-2 lg:mx-0 lg:max-w-none">
              {[
                "1080P Full HD — 170° wide-angle lens",
                "Ultra-light 26g — cats forget it's there",
                "No app, no WiFi — press record & go",
                "90 min battery — USB-C fast charge",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-wk-grey-600">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-wk-amber" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Free Gifts */}
            <div className="mt-6 mx-auto max-w-sm rounded-xl border border-wk-amber/20 bg-wk-amber/5 p-4 lg:mx-0 lg:max-w-none">
              <p className="text-center text-xs uppercase tracking-wide font-bold text-wk-amber lg:text-left">
                Free Gifts With Your Order
              </p>
              <div className="mt-3 space-y-3">
                {/* MicroSD */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-wk-grey-100 bg-white">
                    <Image src="/images/product/gift-microsd.jpg" alt="32GB MicroSD Card" fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">32GB MicroSD Card</p>
                    <p className="text-xs text-wk-grey-400">Pre-installed, ready to record</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-wk-grey-400 line-through">{currencySymbol}12.90</span>
                    <span className="text-xs font-bold text-wk-green">FREE</span>
                  </div>
                </div>
                {/* Adapter */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-wk-grey-100 bg-white">
                    <Image src="/images/product/gift-adapter.jpg" alt="USB-C Adapter" fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">USB-C/Lightning Adapter</p>
                    <p className="text-xs text-wk-grey-400">View footage on your phone</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-wk-grey-400 line-through">{currencySymbol}9.90</span>
                    <span className="text-xs font-bold text-wk-green">FREE</span>
                  </div>
                </div>
                {/* Shipping */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg border border-wk-grey-100 bg-white">
                    <svg className="h-5 w-5 text-wk-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-wk-black">Free Worldwide Shipping</p>
                    <p className="text-xs text-wk-grey-400">7-14 business days</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-wk-grey-400 line-through">{currencySymbol}7.90</span>
                    <span className="text-xs font-bold text-wk-green">FREE</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 border-t border-wk-amber/20 pt-3 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-wk-grey-600">Total value</span>
                  <span className="font-semibold text-wk-grey-600 line-through">
                    {compareAtPriceFormatted || `${currencySymbol}89.90`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-wk-black">You pay</span>
                  <span className="text-lg font-bold text-wk-black">{price}</span>
                </div>
              </div>
            </div>

            {/* ATC */}
            <div className="mt-4 mx-auto max-w-sm lg:mx-0 lg:max-w-none" id="add-to-cart">
              {product ? (
                <AddToCart product={product} />
              ) : (
                <div className="rounded-[var(--radius-btn)] bg-wk-grey-100 p-4 text-center text-sm text-wk-grey-500">
                  Connect Shopify to enable Add to Cart
                </div>
              )}
              <p className="mt-2.5 text-center text-xs text-wk-grey-400">
                Free shipping &middot; 30-day money back
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-5 mx-auto max-w-sm grid grid-cols-3 gap-2 border-t border-wk-grey-100 pt-5 lg:mx-0 lg:max-w-none">
              {[
                { label: "Free Shipping", icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
                { label: "30-Day Return", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                { label: "Secure Pay", icon: "M3 11h18v11H3zM7 11V7a5 5 0 0110 0v4" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                  <svg className="h-4 w-4 text-wk-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                  <span className="text-[10px] font-medium text-wk-grey-500 sm:text-xs">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Payment logos */}
            <div className="mt-4 flex items-center justify-center gap-3">
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
            <div className="mt-5 mx-auto max-w-sm rounded-xl border border-wk-grey-200 p-4 lg:mx-0 lg:max-w-none">
              <p className="mb-2.5 text-sm font-semibold text-wk-black">What&apos;s in the box</p>
              <ul className="space-y-1.5">
                {BOX_CONTENTS.map((item) => (
                  <li key={item.item} className="flex items-start gap-2 text-sm">
                    <div className="mt-1.5 h-1 w-1 flex-none rounded-full bg-wk-amber" />
                    <div className="min-w-0">
                      <span className="font-medium text-wk-black">{item.item}</span>
                      <span className="text-wk-grey-400"> — {item.detail}</span>
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

type MediaItem = { type: "image"; src: string; alt: string } | { type: "video"; src: string; alt: string };

function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  // Insert unboxing video at position 5 (index 4)
  const imgMedia = images.map((img) => ({ type: "image" as const, ...img }));
  const media: MediaItem[] = [
    ...imgMedia.slice(0, 4),
    { type: "video", src: "/images/product/unboxing.mp4", alt: "Unboxing Whiskcam" },
    ...imgMedia.slice(4),
  ];

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const total = media.length;
  const current = media[active];

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Keyboard navigation (Escape to close lightbox, arrows to navigate)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && lightboxOpen) {
        closeLightbox();
      }
      if (e.key === "ArrowRight") {
        goNext();
      }
      if (e.key === "ArrowLeft") {
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Touch swipe handlers for main image
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  }

  return (
    <div>
      {/* Main media with swipe + click-to-zoom + arrow buttons */}
      <div
        ref={mainImageRef}
        className="group relative aspect-square overflow-hidden rounded-2xl bg-wk-grey-50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={current?.type !== "video" ? openLightbox : undefined}
        role="button"
        tabIndex={0}
        aria-label={current?.type === "video" ? "Play video" : "Open full-size image"}
        style={{ cursor: current?.type === "video" ? "default" : "zoom-in" }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && current?.type !== "video") {
            e.preventDefault();
            openLightbox();
          }
        }}
      >
        {current?.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            poster="/images/product/unboxing-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            onClick={(e) => {
              e.stopPropagation();
              const v = e.currentTarget;
              v.muted = false;
              v.paused ? v.play() : v.pause();
            }}
          />
        ) : (
          <Image
            src={current?.src || ""}
            alt={current?.alt || `Whiskcam Original - Image ${active + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        )}

        {/* Left arrow */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/50 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/50 group-hover:opacity-100"
            aria-label="Next image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mt-2.5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {media.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setActive(i)}
              className={`relative h-14 w-14 flex-none overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-16 sm:w-16 ${
                i === active ? "border-wk-amber" : "border-transparent hover:border-wk-grey-300"
              }`}
            >
              {item.type === "video" ? (
                <>
                  <video src={item.src} poster="/images/product/unboxing-poster.jpg" muted className="h-full w-full object-cover" />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-[71] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox left arrow */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-[71] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Lightbox right arrow */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-[71] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Full-resolution media */}
          <div
            className="relative h-[85vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {media[active]?.type === "video" ? (
              <video
                src={media[active]?.src}
                autoPlay
                loop
                playsInline
                controls
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={media[active]?.src || ""}
                alt={media[active]?.alt || `Whiskcam Original - Image ${active + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            )}
          </div>

          {/* Image counter */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 z-[71] -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              {active + 1} / {total}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
