import { DUO_PRODUCT_HANDLE, PRODUCT_HANDLE } from "lib/content";

/** These two non-stacking offers match the approved Shopify schedule. */
export const HALLOWEEN_CAMPAIGN = {
  id: "halloween15",
  code: "HALLOWEEN15",
  percentage: 15,
  startsAt: "2026-10-26T20:40:50Z",
  // Exclusive end: 1 November 00:00 in Paris (CET).
  endsAt: "2026-10-31T23:00:00Z",
} as const;

export const AUTUMN_CAMPAIGN = {
  id: "autumn10",
  code: "AUTUMN10",
  percentage: 10,
  startsAt: HALLOWEEN_CAMPAIGN.endsAt,
  // Exclusive end: 9 November 00:00 in Paris (CET).
  endsAt: "2026-11-08T23:00:00Z",
} as const;

export const SEASONAL_CAMPAIGNS = [HALLOWEEN_CAMPAIGN, AUTUMN_CAMPAIGN];
export type SeasonalCampaign = (typeof SEASONAL_CAMPAIGNS)[number];

export function getActiveCampaign(
  now: number = Date.now(),
): SeasonalCampaign | null {
  // The verified store campaign is enabled; this remains an explicit kill switch.
  if (process.env.NEXT_PUBLIC_HALLOWEEN_ENABLED === "false") return null;
  return (
    SEASONAL_CAMPAIGNS.find(
      (campaign) =>
        now >= Date.parse(campaign.startsAt) &&
        now < Date.parse(campaign.endsAt),
    ) ?? null
  );
}

export function isHalloweenActive(now: number = Date.now()): boolean {
  return !!getActiveCampaign(now);
}

export function isSeasonalCode(code: string): boolean {
  return SEASONAL_CAMPAIGNS.some(
    (campaign) => campaign.code === code.toUpperCase(),
  );
}

export function isCampaignProduct(handle: string): boolean {
  return handle === PRODUCT_HANDLE || handle === DUO_PRODUCT_HANDLE;
}

/** For a clearly labelled code-price estimate; Shopify remains the price authority. */
export function halloweenPrice(
  amount: string | number,
  campaign: SeasonalCampaign = HALLOWEEN_CAMPAIGN,
): number {
  return Math.round(Number(amount) * (100 - campaign.percentage)) / 100;
}
