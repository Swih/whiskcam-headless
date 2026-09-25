"use client";

import { SHIPPING_COUNTRIES } from "lib/content";
import { Link } from "i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";

const DeliveryCountryContext = createContext<{
  country: string;
  setCountry: (country: string) => void;
} | null>(null);

/** Estimated business days to a served destination. */
export function deliveryDays(country: string): [number, number] {
  return country === "US" || country === "GB"
    ? [7, 12]
    : country === "CA" || country === "AU"
      ? [10, 14]
      : country === "NZ"
        ? [10, 18]
        : [8, 14];
}

export function isServedCountry(country: string) {
  return (SHIPPING_COUNTRIES as readonly string[]).includes(country);
}

/** The visitor's chosen delivery country, shared with the cart (null outside the provider). */
export function useDeliveryCountry() {
  return useContext(DeliveryCountryContext);
}

/** An estimate chosen by the visitor, shared with the cart; not a Shopify market change. */
export function DeliveryCountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState("");
  return (
    <DeliveryCountryContext.Provider value={{ country, setCountry }}>
      {children}
    </DeliveryCountryContext.Provider>
  );
}

export function DeliveryInfo({
  compact = false,
  expanded = false,
}: {
  compact?: boolean;
  expanded?: boolean;
}) {
  const t = useTranslations("delivery");
  const locale = useLocale();
  const shared = useContext(DeliveryCountryContext);
  const [localCountry, setLocalCountry] = useState("");
  const { country, setCountry } = shared ?? {
    country: localCountry,
    setCountry: setLocalCountry,
  };
  const id = useId();
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const supported = isServedCountry(country);
  const options = [...SHIPPING_COUNTRIES] as string[];
  if (country && country !== "OTHER" && !supported) options.push(country);
  const [min, max] = deliveryDays(country);

  return (
    <details
      open={expanded || undefined}
      className={`mt-3 rounded-lg border border-wk-grey-200 bg-white ${compact ? "p-2.5" : "p-3"} text-xs`}
    >
      <summary className="cursor-pointer font-medium text-wk-black">
        {country && supported
          ? `${names.of(country)} · ${min}–${max} ${t("businessDays")}`
          : t("check")}
      </summary>
      <label htmlFor={id} className="mt-3 block text-wk-grey-600">
        {t("select")}
      </label>
      <select
        id={id}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="mt-1 w-full rounded-md border border-wk-grey-300 bg-white p-2 text-sm"
      >
        <option value="" disabled>
          {t("chooseCountry")}
        </option>
        {options
          .sort((a, b) =>
            (names.of(a) || a).localeCompare(names.of(b) || b, locale),
          )
          .map((code) => (
            <option key={code} value={code}>
              {names.of(code) || code}
            </option>
          ))}
        <option value="OTHER">{t("other")}</option>
      </select>
      <p
        aria-live="polite"
        className={`mt-2 ${supported ? "text-wk-green" : "text-red-700"}`}
      >
        {!country
          ? ""
          : supported
            ? t("available", { min, max })
            : t("unavailable")}
      </p>
      <Link
        href="/policies/shipping"
        className="mt-2 inline-block underline underline-offset-2"
      >
        {t("destinations")}
      </Link>
    </details>
  );
}
