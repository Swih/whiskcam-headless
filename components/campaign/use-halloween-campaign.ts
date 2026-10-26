"use client";

import { useEffect, useState } from "react";
import { HALLOWEEN_CAMPAIGN, isHalloweenActive } from "lib/campaign";

/** Update even when a visitor leaves the page open across the fixed campaign end. */
export function useHalloweenCampaign() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const update = () => setActive(isHalloweenActive());
    update();
    const interval = window.setInterval(update, 30_000);
    const untilEnd = Date.parse(HALLOWEEN_CAMPAIGN.endsAt) - Date.now();
    const end =
      untilEnd > 0 && untilEnd <= 2_147_483_647
        ? window.setTimeout(update, untilEnd + 50)
        : undefined;
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(interval);
      if (end !== undefined) window.clearTimeout(end);
      window.removeEventListener("focus", update);
    };
  }, []);

  return active;
}
