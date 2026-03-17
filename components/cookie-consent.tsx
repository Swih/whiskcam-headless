"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "wk-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no previous consent decision stored
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const respond = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 md:bottom-0 md:pb-4"
      role="banner"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-[var(--radius-card)] border border-wk-grey-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm sm:flex-row sm:gap-4">
        <p className="flex-1 text-sm leading-relaxed text-wk-grey-600">
          We use cookies to improve your experience and analyze site traffic.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => respond(false)}
            className="rounded-[var(--radius-btn)] border border-wk-grey-300 px-5 py-2 text-sm font-medium text-wk-grey-600 transition-all duration-200 hover:border-wk-black hover:text-wk-black"
          >
            Decline
          </button>
          <button
            onClick={() => respond(true)}
            className="rounded-[var(--radius-btn)] bg-wk-amber px-5 py-2 text-sm font-semibold text-wk-black shadow-sm transition-all duration-200 hover:bg-wk-amber-hover hover:shadow-md active:scale-[0.98]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
