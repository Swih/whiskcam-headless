"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DISMISS_KEY = "wk-email-dismissed";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const triggered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldSuppress = useCallback(() => {
    if (typeof window === "undefined") return true;

    // Dismissed recently
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const ts = parseInt(dismissed, 10);
      if (!isNaN(ts) && Date.now() - ts < SEVEN_DAYS_MS) return true;
      // Expired — remove stale key
      localStorage.removeItem(DISMISS_KEY);
    }

    return false;
  }, []);

  const show = useCallback(() => {
    if (triggered.current) return;
    if (shouldSuppress()) return;
    triggered.current = true;
    setOpen(true);
  }, [shouldSuppress]);

  const dismiss = useCallback(() => {
    setOpen(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      // Subscribe to Klaviyo list via public API
      const KLAVIYO_COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;
      if (KLAVIYO_COMPANY_ID) {
        try {
          await fetch("https://a.klaviyo.com/client/subscriptions/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              revision: "2024-10-15",
            },
            body: JSON.stringify({
              data: {
                type: "subscription",
                attributes: {
                  custom_source: "Website Popup",
                  profile: {
                    data: {
                      type: "profile",
                      attributes: { email },
                    },
                  },
                },
                relationships: {
                  list: {
                    data: {
                      type: "list",
                      id: process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID || "",
                    },
                  },
                },
              },
            }),
          });
        } catch {
          // Silently fail — don't block UX
        }
      }

      setSubmitted(true);
      setTimeout(() => setOpen(false), 2500);
    },
    [email],
  );

  // Timer trigger (15 s)
  useEffect(() => {
    if (shouldSuppress()) return;

    timerRef.current = setTimeout(show, 15_000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, shouldSuppress]);

  // Scroll trigger (60 %)
  useEffect(() => {
    if (shouldSuppress()) return;

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = window.scrollY / scrollHeight;
      if (pct >= 0.6) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show, shouldSuppress]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Email signup"
    >
      <div
        className="animate-popup-in relative mx-4 w-full max-w-md rounded-[var(--radius-card)] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-wk-grey-400 transition-colors hover:bg-wk-grey-100 hover:text-wk-black"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-wk-green/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-wk-green"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-wk-black">Thank you!</h3>
            <p className="mt-2 text-sm text-wk-grey-500">
              Check your inbox!
            </p>
          </div>
        ) : (
          <>
            <h2 className="pr-6 text-2xl font-bold leading-tight text-wk-black">
              Get Your Free Pet Photography Guide
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-wk-grey-500">
              Learn the best tips to capture your pet&apos;s secret adventures. Join 500+ pet parents.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-[var(--radius-btn)] border border-wk-grey-300 px-4 py-3 text-sm text-wk-black outline-none transition-colors placeholder:text-wk-grey-400 focus:border-wk-amber focus:ring-2 focus:ring-wk-amber/30"
              />
              <button
                type="submit"
                className="w-full rounded-[var(--radius-btn)] bg-wk-black px-7 py-3.5 text-[15px] font-semibold tracking-wide text-white shadow-sm transition-all duration-200 ease-out hover:shadow-[0_0_16px_rgba(251,191,36,0.4)] hover:shadow-md active:scale-[0.98]"
              >
                Get the Free Guide
              </button>
            </form>

            <button
              onClick={dismiss}
              className="mx-auto mt-4 block text-xs text-wk-grey-400 transition-colors hover:text-wk-grey-600"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
