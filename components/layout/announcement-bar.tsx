"use client";

import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  return (
    <div className="bg-wk-black px-3 py-2 text-center text-xs font-medium text-white/90">
      {t("staticDefault")}
    </div>
  );
}
