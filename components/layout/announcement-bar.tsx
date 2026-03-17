"use client";

import { useEffect, useState } from "react";

function getEndOfDay(): Date {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 1);
  target.setHours(0, 0, 0, 0);
  return target;
}

function fmt(n: number) {
  return n.toString().padStart(2, "0");
}

export function AnnouncementBar() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const target = getEndOfDay();
    const tick = () => {
      const ms = Math.max(0, target.getTime() - Date.now());
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

  return (
    <div className="z-[60] bg-wk-black">
      <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:gap-2 sm:py-2">
        <p className="whitespace-nowrap text-[10px] font-medium text-white/90 sm:text-xs">
          <span className="font-semibold text-wk-amber">44% OFF</span>
          <span className="hidden sm:inline"> + Free Shipping</span>
          <span className="sm:hidden"> + Free Ship.</span>
          {" "}— Ends
        </p>
        <div className="flex items-center gap-px">
          <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.h}</span>
          <span className="text-[10px] font-bold text-white/40">:</span>
          <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.m}</span>
          <span className="text-[10px] font-bold text-white/40">:</span>
          <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] font-semibold text-white sm:px-1.5 sm:text-xs">{time.s}</span>
        </div>
      </div>
    </div>
  );
}
