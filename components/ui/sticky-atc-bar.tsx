"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import type { Product } from "lib/shopify/types";

interface StickyAtcBarProps {
  price: string;
  compareAtPrice?: string;
  product: Product;
}

export function StickyAtcBar({ price, compareAtPrice, product }: StickyAtcBarProps) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { addCartItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const atcEl = document.getElementById("add-to-cart");
    const heroEl = document.getElementById("hero");
    if (!atcEl) return;

    let pastHero = false;
    let pastAtc = false;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry!.isIntersecting;
        setVisible(pastHero && pastAtc);
      },
      { threshold: 0 }
    );

    const atcObserver = new IntersectionObserver(
      ([entry]) => {
        pastAtc = !entry!.isIntersecting;
        setVisible(pastHero && pastAtc);
      },
      { threshold: 0 }
    );

    if (heroEl) heroObserver.observe(heroEl);
    atcObserver.observe(atcEl);

    return () => {
      heroObserver.disconnect();
      atcObserver.disconnect();
    };
  }, []);

  const handleAddToCart = () => {
    const defaultVariantId = product.variants.length === 1 ? product.variants[0]?.id : undefined;
    if (!defaultVariantId) return;

    const variant = product.variants.find((v) => v.id === defaultVariantId)!;

    startTransition(async () => {
      addCartItem(variant, product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      await addItem(null, defaultVariantId);
      router.refresh();
    });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-wk-grey-200 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-wk-black">Whiskcam Original</p>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-wk-black">{price}</span>
            {compareAtPrice && (
              <span className="text-xs text-wk-grey-400 line-through">{compareAtPrice}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className={`flex-none rounded-[var(--radius-btn)] px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
            added
              ? "bg-wk-green text-white"
              : "bg-wk-black text-white hover:brightness-110 hover:shadow-[0_0_15px_rgba(245,166,35,0.3)]"
          }`}
        >
          {isPending ? (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Adding...
            </span>
          ) : added ? (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </span>
          ) : (
            "Yes, I Want This!"
          )}
        </button>
      </div>
    </div>
  );
}
