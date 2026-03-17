"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const STORAGE_KEY = "whiskcam_announcement_dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// Countdown target: next Sunday 23:59:59
function getNextSunday(): Date {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 7 : 7 - day;
  const target = new Date(now);
  target.setDate(target.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 0);
  return target;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      if (Date.now() - dismissedAt < DISMISS_DURATION_MS) return;
      localStorage.removeItem(STORAGE_KEY);
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = getNextSunday();
    const tick = () => {
      const remaining = target.getTime() - Date.now();
      setCountdown(formatCountdown(remaining));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-wk-amber">
      <div className="flex items-center justify-center gap-3 px-10 py-2">
        <p className="text-[11px] font-semibold text-wk-black sm:text-xs">
          Launch Sale: 44% OFF + Free Shipping
        </p>
        <span className="rounded bg-wk-black/10 px-2 py-0.5 font-mono text-[11px] font-bold text-wk-black sm:text-xs">
          {countdown}
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-wk-black/50 transition-colors hover:text-wk-black"
        aria-label="Dismiss announcement"
      >
        <XMarkIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
