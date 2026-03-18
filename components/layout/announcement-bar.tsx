"use client";

import { useEffect, useState } from "react";
import { computeDiscount } from "lib/format";

const PROMO_COOKIE = "wk_promo_end";
const PROMO_DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours

function fmt(n: number) {
  return n.toString().padStart(2, "0");
}

function getPromoEnd(): number | null {
  try {
    const stored = localStorage.getItem(PROMO_COOKIE);
    if (stored) {
      const ts = parseInt(stored, 10);
      if (!isNaN(ts)) return ts;
    }
    // First visit — set promo end 72h from now
    const end = Date.now() + PROMO_DURATION_MS;
    localStorage.setItem(PROMO_COOKIE, String(end));
    return end;
  } catch {
    return null;
  }
}

interface AnnouncementBarProps {
  discount?: number; // e.g. 44
}

export function AnnouncementBar({ discount }: AnnouncementBarProps) {
  const [time, setTime] = useState<{ h: string; m: string; s: string } | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const promoEnd = getPromoEnd();
    if (!promoEnd) return;

    const tick = () => {
      const ms = promoEnd - Date.now();
      if (ms <= 0) {
        setExpired(true);
        return;
      }
      setTime({
        h: fmt(Math.floor(ms / 3600000)),
        m: fmt(Math.floor((ms % 3600000) / 60000)),
        s: fmt(Math.floor((ms % 60000) / 1000)),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pct = discount && discount > 0 ? discount : null;

  return (
    <div className="z-[60] bg-wk-black">
      <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:gap-2 sm:py-2">
        {expired || !time ? (
          /* Timer expired or SSR — show static message */
          <p className="whitespace-nowrap text-[10px] font-medium text-white/90 sm:text-xs">
            {pct ? (
              <>
                <span className="font-semibold text-wk-amber">Save {pct}%</span>
                {" "}— Free shipping worldwide
              </>
            ) : (
              <>Free shipping worldwide</>
            )}
          </p>
        ) : (
          /* Active countdown */
          <>
            <p className="whitespace-nowrap text-[10px] font-medium text-white/90 sm:text-xs">
              {pct ? (
                <>
                  <span className="font-semibold text-wk-amber">{pct}% OFF</span>
                  <span className="hidden sm:inline"> + Free Shipping</span>
                  <span className="sm:hidden"> + Free Ship.</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-wk-amber">Sale</span>
                  <span className="hidden sm:inline"> + Free Shipping</span>
                  <span className="sm:hidden"> + Free Ship.</span>
                </>
              )}
              {" "}— Ends
            </p>
            <div className="flex items-center gap-px">
              <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.h}</span>
              <span className="text-[10px] font-bold text-white/40">:</span>
              <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.m}</span>
              <span className="text-[10px] font-bold text-white/40">:</span>
              <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.s}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
