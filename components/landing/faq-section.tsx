"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { FaqAccordion } from "./faq-accordion";
import { useTranslations } from "next-intl";

const FAQ_COUNT = 8;

export function FaqSection() {
  const t = useTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`items.${i}.question` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.question`),
    answer: t(`items.${i}.answer` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.answer`),
  }));

  return (
    <SectionWrapper bg="warm" id="faq">
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <FaqAccordion items={items} />
    </SectionWrapper>
  );
}
