"use client";

import { SHIPPING_COUNTRIES } from "lib/content";
import { Link } from "i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { createContext, useContext, useId, useState } from "react";

export const DeliveryCountryContext = createContext("US");

export function DeliveryInfo({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("delivery");
  const locale = useLocale();
  const initial = useContext(DeliveryCountryContext);
  const [country, setCountry] = useState(initial);
  const id = useId();
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const supported = (SHIPPING_COUNTRIES as readonly string[]).includes(country);
  const options = [...SHIPPING_COUNTRIES] as string[];
  if (country !== "OTHER" && !supported) options.push(country);
  const [min, max] = country === "US" || country === "GB" ? [7, 12]
    : country === "CA" || country === "AU" ? [10, 14]
    : country === "NZ" ? [10, 18] : [8, 14];

  return (
    <details open={!supported} className={`mt-3 rounded-lg border border-wk-grey-200 bg-white ${compact ? "p-2.5" : "p-3"} text-xs`}>
      <summary className="cursor-pointer font-medium text-wk-black">{t("check")}</summary>
      <label htmlFor={id} className="mt-3 block text-wk-grey-600">{t("select")}</label>
      <select id={id} value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full rounded-md border border-wk-grey-300 bg-white p-2 text-sm">
        {options.sort((a, b) => (names.of(a) || a).localeCompare(names.of(b) || b, locale)).map((code) => <option key={code} value={code}>{names.of(code) || code}</option>)}
        <option value="OTHER">{t("other")}</option>
      </select>
      <p aria-live="polite" className={`mt-2 ${supported ? "text-wk-green" : "text-red-700"}`}>{supported ? t("available", {min, max}) : t("unavailable")}</p>
      <Link href="/policies/shipping" className="mt-2 inline-block underline underline-offset-2">{t("destinations")}</Link>
    </details>
  );
}
