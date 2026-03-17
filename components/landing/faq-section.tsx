"use client";

import { FAQ_ITEMS } from "lib/content";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { FaqAccordion } from "./faq-accordion";

export function FaqSection() {
  return (
    <SectionWrapper bg="warm" id="faq">
      <SectionHeading
        overline="FAQ"
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers."
      />
      <FaqAccordion items={FAQ_ITEMS} />
    </SectionWrapper>
  );
}
