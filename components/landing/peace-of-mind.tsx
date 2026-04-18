"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import { useTranslations } from "next-intl";

// Section that addresses the three objections the pre-purchase consumer
// actually worries about but most D2C sites skip:
//   1. "What if my cat refuses to wear it?"
//   2. "What if it gets lost or breaks?"
//   3. "What if I don't know how to set it up?"
// These are the hidden conversion blockers for a hardware pet accessory.
export function PeaceOfMind() {
  const t = useTranslations("peaceOfMind");

  const items = [
    {
      key: "refuses",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      key: "lost",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3 12a9 9 0 0115.5-6.3L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 01-15.5 6.3L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      ),
    },
    {
      key: "help",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
        </svg>
      ),
    },
  ] as const;

  return (
    <SectionWrapper bg="white">
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <AnimatedElement key={item.key} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-wk-grey-100 bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-wk-amber/40 hover:shadow-lg">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-wk-amber/10 text-wk-amber">
                {item.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-wk-black">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-wk-grey-500">
                {t(`items.${item.key}.description`)}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-wk-grey-500">
        {t("footnote")}{" "}
        <a
          href="mailto:support@whiskcam.com"
          className="font-medium text-wk-amber hover:underline"
        >
          support@whiskcam.com
        </a>
      </p>
    </SectionWrapper>
  );
}
