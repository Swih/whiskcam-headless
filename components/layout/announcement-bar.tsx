"use client";

import { useLocale, useTranslations } from "next-intl";
import { useHalloweenCampaign } from "components/campaign/use-halloween-campaign";
import { getCampaignCopy } from "lib/campaign-copy";
import { Link } from "i18n/navigation";
import { CampaignCountdown } from "components/campaign/countdown";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const active = useHalloweenCampaign();
  const copy = getCampaignCopy(useLocale(), active);
  if (active) {
    return (
      <Link
        href="/#product"
        className="flex min-h-11 flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#24251f] px-4 py-2 text-center text-sm text-[#fff7e9]"
      >
        <strong>
          {copy.name} · {copy.banner}
        </strong>
        <span className="text-[#f2c493]">{copy.code}</span>
        <span className="text-sm">{copy.deadline}</span>
        <CampaignCountdown campaign={active} />
      </Link>
    );
  }
  return (
    <div className="bg-wk-black px-3 py-2 text-center text-xs font-medium text-white/90">
      {t("staticDefault")}
    </div>
  );
}
