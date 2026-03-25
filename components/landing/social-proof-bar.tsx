"use client";

import { AnimatedElement } from "components/ui/animated-element";
import { useTranslations } from "next-intl";

const STAT_ITEMS = [
  { value: "1080P", labelKey: "fullHd" },
  { value: "170°", labelKey: "wideAngle" },
  { value: "24g", labelKey: "ultraLight" },
  { value: "3h+", labelKey: "batteryLife" },
] as const;

export function SocialProofBar() {
  const t = useTranslations("stats");

  return (
    <section className="border-y border-wk-grey-200 bg-white py-10 md:py-12">
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
    </section>
  );
}
