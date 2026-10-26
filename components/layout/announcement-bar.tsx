"use client";

import { useLocale, useTranslations } from "next-intl";
import { useHalloweenCampaign } from "components/campaign/use-halloween-campaign";
import { getCampaignCopy } from "lib/campaign-copy";
import { Link } from "i18n/navigation";
import { CampaignCountdown } from "components/campaign/countdown";

/** One quiet line; the offer terms sit with the purchase controls. */
export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const active = useHalloweenCampaign();
  const copy = getCampaignCopy(useLocale(), active);
  if (active) {
    const accent =
      active.code === "HALLOWEEN15" ? "bg-[#f0a46a]" : "bg-[#e8b27a]";
    return (
      <Link
        href="/#product"
        className="flex min-h-10 items-center justify-center gap-x-3 bg-[#171614] px-4 py-2 text-center text-sm leading-snug text-[#f4f1ec] hover:underline hover:underline-offset-4"
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 flex-none rounded-full ${accent}`}
        />
        <span className="hidden font-semibold sm:inline">{copy.name}</span>
        <span>{copy.banner}</span>
        <span className="hidden text-[#b9b3a8] md:inline">{copy.code}</span>
        <span className="sr-only lg:not-sr-only lg:text-[#b9b3a8]">
          {copy.deadline}
        </span>
        <span className="whitespace-nowrap text-[#b9b3a8] [&_span]:[color:inherit] [&_span]:[font-family:inherit]">
          <CampaignCountdown campaign={active} />
        </span>
      </Link>
    );
  }
  return (
    <div className="bg-[#171614] px-3 py-2 text-center text-sm text-[#f4f1ec]">
      {t("staticDefault")}
    </div>
  );
}
