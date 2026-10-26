import { DUO_PRODUCT_HANDLE, PRODUCT_HANDLE } from "lib/content";

/** One real, fixed campaign window. Shopify must match these terms before release. */
export const HALLOWEEN_CAMPAIGN = {
  code: "HALLOWEEN10",
  percentage: 10,
  startsAt: "2026-10-26T00:00:00Z",
  // Exclusive end: 1 November 00:00 in Paris (CET).
  endsAt: "2026-10-31T23:00:00Z",
} as const;

export function isHalloweenActive(now: number = Date.now()): boolean {
  return (
    process.env.NEXT_PUBLIC_HALLOWEEN_ENABLED === "true" &&
    now >= Date.parse(HALLOWEEN_CAMPAIGN.startsAt) &&
    now < Date.parse(HALLOWEEN_CAMPAIGN.endsAt)
  );
}

export function isCampaignProduct(handle: string): boolean {
  return handle === PRODUCT_HANDLE || handle === DUO_PRODUCT_HANDLE;
}

/** For a clearly labelled code-price estimate; Shopify remains the price authority. */
export function halloweenPrice(amount: string | number): number {
  return (
    Math.round(Number(amount) * (100 - HALLOWEEN_CAMPAIGN.percentage)) / 100
  );
}
