"use client";

import { FEATURES } from "lib/content";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";

const iconMap: Record<string, React.ReactNode> = {
  camera: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  eye: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  feather: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
  ),
  zap: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  usb: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="4" cy="20" r="2"/><circle cx="16" cy="8" r="2"/><line x1="12" y1="2" x2="12" y2="12"/><path d="M12 12l4-4"/><path d="M12 12l-6 6"/><circle cx="20" cy="16" r="2"/><path d="M12 12l8 4"/></svg>
  ),
  shield: (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
  ),
};

export function FeaturesGrid() {
  return (
    <SectionWrapper bg="warm">
      <SectionHeading
        overline="Features"
        title="Built for Adventures"
        subtitle="Everything your pet needs to become a filmmaker."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <AnimatedElement key={feature.title} delay={i * 0.08}>
            <div className="group rounded-[var(--radius-card)] bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-wk-amber/10 text-wk-amber transition-colors duration-300 group-hover:bg-wk-amber group-hover:text-wk-black">
                {iconMap[feature.icon]}
              </div>
              <h3 className="mb-2 text-base font-semibold text-wk-black">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-wk-grey-500">
                {feature.description}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
