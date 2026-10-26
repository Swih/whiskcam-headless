"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { FaqAccordion } from "./faq-accordion";
import { useTranslations } from "next-intl";

const FAQ_COUNT = 8;

/** Homepage FAQ: heading left, questions right, on the page's warm canvas. */
export function FaqSection() {
  const t = useTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(
      `items.${i}.question` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.question`,
    ),
    answer: t(
      `items.${i}.answer` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.answer`,
    ),
  }));

  return (
    <SectionWrapper
      bg="warm"
      id="faq"
      className="border-t border-[#e4ded3] !bg-[#faf8f4]"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
        <SectionHeading
          centered={false}
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="!mb-0 [&_h2]:text-[clamp(30px,3.4vw,46px)] [&_h2]:font-semibold [&_h2]:tracking-[-0.035em] [&_p:first-child]:text-[13px] [&_p:first-child]:text-[#615d55] [&_p:last-child]:mx-0 [&_p:last-child]:text-[#615d55]"
        />
        <FaqAccordion
          items={items}
          className="!mx-0 !max-w-none [&_button]:min-h-11 [&_button_span]:text-[#1d1c1a] [&>div>div]:border-[#e4ded3]"
        />
      </div>
    </SectionWrapper>
  );
}
