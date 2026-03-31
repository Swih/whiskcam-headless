"use client";

import { AnimatedElement } from "components/ui/animated-element";
import { useTranslations } from "next-intl";

const STAT_ITEMS = [
  { value: "1080P", labelKey: "fullHd" },
  { value: "170°", labelKey: "wideAngle" },
  { value: "24g", labelKey: "ultraLight" },
  { value: "2h", labelKey: "batteryLife" },
] as const;

const TRUST_ITEMS = [
  { icon: "star", labelKey: "trustReviews" },
  { icon: "shield", labelKey: "trustReturn" },
  { icon: "truck", labelKey: "trustShipping" },
  { icon: "lock", labelKey: "trustSecure" },
] as const;

export function SocialProofBar() {
  const t = useTranslations("stats");

  return (
    <section className="border-y border-wk-grey-200 bg-white">
      {/* Trust strip */}
      <AnimatedElement>
        <div className="border-b border-wk-grey-100 bg-wk-warm py-3">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-4 sm:gap-x-8">
            {/* Stars + count */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-wk-amber">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-medium text-wk-grey-600">{t("trustReviews")}</span>
            </div>
            {/* Return */}
            <div className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-wk-grey-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-[11px] font-medium text-wk-grey-600">{t("trustReturn")}</span>
            </div>
            {/* Shipping */}
            <div className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-wk-grey-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              <span className="text-[11px] font-medium text-wk-grey-600">{t("trustShipping")}</span>
            </div>
            {/* Secure */}
            <div className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-wk-grey-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span className="text-[11px] font-medium text-wk-grey-600">{t("trustSecure")}</span>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Specs stats */}
      <div className="py-10 md:py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {STAT_ITEMS.map((stat, i) => (
            <AnimatedElement key={stat.value} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-bold text-3xl text-wk-black md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-wk-grey-500">
                  {t(stat.labelKey)}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
