"use client";

import { HOW_IT_WORKS } from "lib/content";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";

export function HowItWorks() {
  return (
    <SectionWrapper bg="warm">
      <SectionHeading
        overline="How it works"
        title="Simple as 1, 2, 3"
        subtitle="No tech skills required. If you can press a button, you can use Whiskcam."
      />

      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-3 md:gap-8">
        {HOW_IT_WORKS.map((step, i) => (
          <AnimatedElement key={step.step} delay={i * 0.15}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wk-amber font-bold text-xl text-wk-black">
                {step.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-wk-black">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-wk-grey-500">
                {step.description}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
