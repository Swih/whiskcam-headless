"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <SectionWrapper bg="warm">
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-3 md:gap-8">
        {([0, 1, 2] as const).map((i) => (
          <AnimatedElement key={i} delay={i * 0.15}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wk-amber font-bold text-xl text-wk-black">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-wk-black">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-wk-grey-500">
                {t(`steps.${i}.description`)}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
