"use client";

import { PRODUCT_FACTS } from "lib/content";
import { useTranslations } from "next-intl";

export function StorageNotice() {
  const t = useTranslations("product");
  if (PRODUCT_FACTS.storageIncluded) return null;
  return (
    <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">
      {t("storageNotice")}
    </p>
  );
}
