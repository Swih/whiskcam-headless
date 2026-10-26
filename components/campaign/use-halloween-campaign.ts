"use client";

import { useEffect, useState } from "react";
import {
  SEASONAL_CAMPAIGNS,
  getActiveCampaign,
  type SeasonalCampaign,
} from "lib/campaign";

/** Update even when a visitor leaves the page open across the fixed campaign end. */
export function useHalloweenCampaign() {
  const [active, setActive] = useState<SeasonalCampaign | null>(null);

  useEffect(() => {
    const update = () => setActive(getActiveCampaign());
    update();
    const interval = window.setInterval(update, 30_000);
    const boundaries = SEASONAL_CAMPAIGNS.flatMap((c) => [c.startsAt, c.endsAt])
      .map((date) => Date.parse(date) - Date.now())
      .filter((delay) => delay > 0 && delay <= 2_147_483_647)
      .map((delay) => window.setTimeout(update, delay + 50));
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(interval);
      boundaries.forEach(window.clearTimeout);
      window.removeEventListener("focus", update);
    };
  }, []);

  return active;
}
