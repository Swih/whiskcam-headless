"use client";

import { AnimatedElement } from "components/ui/animated-element";

export function GuaranteeSection() {
  return (
    <section className="bg-wk-warm py-12">
      <div className="mx-auto max-w-xl px-4 text-center">
        <AnimatedElement animation="fadeUp">
          {/* Shield icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wk-amber/10">
            <svg
              className="h-7 w-7 text-wk-amber"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-wk-black sm:text-2xl">
            30-Day Money-Back Guarantee
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-wk-grey-500">
            Not happy? Full refund, no questions asked. We don&apos;t even need the product back.
          </p>
          <a
            href="/#faq"
            className="mt-4 inline-block text-sm font-medium text-wk-amber underline underline-offset-2 transition-colors hover:text-wk-amber/80"
          >
            Learn more
          </a>
        </AnimatedElement>
      </div>
    </section>
  );
}
