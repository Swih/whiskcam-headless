"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

const CONSENT_KEY = "wk-cookie-consent";
const CONSENT_VERSION = "1";

interface ConsentData {
  accepted: boolean;
  timestamp: string;
  version: string;
}

function readConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    // Backward-compat with old string format ("accepted" / "declined")
    if (raw === "accepted" || raw === "declined") {
      return { accepted: raw === "accepted", timestamp: new Date().toISOString(), version: "0" };
    }

    return JSON.parse(raw) as ConsentData;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      setVisible(true);
    }
  }, []);

  const respond = (accepted: boolean) => {
    const data: ConsentData = {
      accepted,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setVisible(false);
    // Notify Analytics component to load scripts
    window.dispatchEvent(new Event("wk-consent-update"));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-20 left-0 right-0 z-[55] px-4 pb-2 md:bottom-4 md:pb-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-[var(--radius-card)] border border-wk-grey-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm sm:flex-row sm:gap-4">
        <p className="flex-1 text-sm leading-relaxed text-wk-grey-600">
          {t("message")}{" "}
          <Link href="/policies/privacy" className="underline underline-offset-2 text-wk-grey-500 hover:text-wk-black transition-colors">
            {t("privacyLink")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => respond(false)}
            className="rounded-[var(--radius-btn)] border border-wk-grey-300 px-5 py-2 text-sm font-medium text-wk-grey-600 transition-all duration-200 hover:border-wk-black hover:text-wk-black"
          >
            {t("decline")}
          </button>
          <button
            onClick={() => respond(true)}
            className="rounded-[var(--radius-btn)] bg-wk-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-wk-black/90 hover:shadow-md active:scale-[0.98]"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
