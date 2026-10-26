"use client";

import { useLocale, useTranslations } from "next-intl";
import { useHalloweenCampaign } from "components/campaign/use-halloween-campaign";
import { getCampaignCopy } from "lib/campaign-copy";
import { Link } from "i18n/navigation";
import { CampaignCountdown } from "components/campaign/countdown";
import { PixelSprite, signalType } from "components/landing/pixel-art";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const active = useHalloweenCampaign();
  const copy = getCampaignCopy(useLocale(), active);
  if (active) {
    const halloween = active.code === "HALLOWEEN15";
    return (
      <Link
        href="/#product"
        className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b-2 border-[#1b1a17] bg-[#1b1a17] px-4 py-2 text-center text-sm text-[#f6efe2] [--pixel-accent:#ff6b1a]"
      >
        <PixelSprite
          name={halloween ? "pumpkin" : "leaf"}
          size={16}
          className={halloween ? "text-[#f6efe2]" : "text-[#e08a2c]"}
        />
        <strong className={`${signalType} text-[14px] font-normal`}>
          {copy.name}
        </strong>
        <span>{copy.banner}</span>
        <span
          className={`${signalType} text-[14px] ${halloween ? "bg-[#ff6b1a]" : "bg-[#e08a2c]"} px-2 py-0.5 text-[#1b1a17]`}
        >
          {copy.code}
        </span>
        {/* The countdown carries the deadline visually on small screens. */}
        <span className="sr-only text-sm sm:not-sr-only">{copy.deadline}</span>
        <span className={`${signalType} [&_span]:[font-family:inherit]`}>
          <CampaignCountdown campaign={active} />
        </span>
      </Link>
    );
  }
  return (
    <div className="bg-[#1b1a17] px-3 py-2 text-center text-sm font-medium text-[#f6efe2]">
      {t("staticDefault")}
    </div>
  );
}
