"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";

interface StickyAtcBarProps {
  price: string;
  compareAtPrice?: string;
}

export function StickyAtcBar({ price, compareAtPrice }: StickyAtcBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const atcEl = document.getElementById("add-to-cart");
    if (!atcEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry!.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(atcEl);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-wk-grey-200 bg-white/95 backdrop-blur-sm md:hidden"
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
        <Button
          size="sm"
          className="flex-none"
          onClick={() => {
            document.getElementById("add-to-cart")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
