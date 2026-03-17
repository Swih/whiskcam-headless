"use client";

import { STATS } from "lib/content";
import { AnimatedElement } from "components/ui/animated-element";

export function SocialProofBar() {
  return (
    <section className="border-y border-wk-grey-200 bg-white py-10 md:py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <AnimatedElement key={stat.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="font-bold text-3xl text-wk-black md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-wk-grey-500">
                {stat.label}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}
