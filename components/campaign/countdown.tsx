"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { SeasonalCampaign } from "lib/campaign";

/** Only the fixed Shopify deadline; never resets for a visitor or reload. */
export function CampaignCountdown({
  campaign,
}: {
  campaign: SeasonalCampaign;
}) {
  const locale = useLocale();
  const [seconds, setSeconds] = useState<number | null>(null);
  useEffect(() => {
    const update = () =>
      setSeconds(
        Math.max(
          0,
          Math.ceil((Date.parse(campaign.endsAt) - Date.now()) / 1000),
        ),
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [campaign.endsAt]);
  if (seconds === null) return null;
  const day = locale === "fr" ? "j" : locale === "de" ? "T" : "d";
  const pad = (value: number) => String(value).padStart(2, "0");
  return (
    <span
      aria-hidden="true"
      className="whitespace-nowrap font-mono text-sm tabular-nums text-[#f2c493]"
    >
      {Math.floor(seconds / 86400)}
      {day} {pad(Math.floor(seconds / 3600) % 24)}:
      {pad(Math.floor(seconds / 60) % 60)}:{pad(seconds % 60)}
    </span>
  );
}
