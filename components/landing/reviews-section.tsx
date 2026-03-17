"use client";

import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";

const REVIEWS = [
  {
    name: "Sarah M.",
    location: "London",
    pet: "Biscuit",
    stars: 5,
    text: "I couldn\u2019t believe what Biscuit gets up to! He visits 3 different gardens every morning.",
  },
  {
    name: "Marco R.",
    location: "Berlin",
    pet: "Luna",
    stars: 5,
    text: "So light my cat Luna didn\u2019t even notice it. The footage is surprisingly clear.",
  },
  {
    name: "Emma L.",
    location: "Paris",
    pet: "Minou",
    stars: 5,
    text: "Best \u20AC50 I\u2019ve spent. Now I know why my cat comes home with leaves in his fur.",
  },
  {
    name: "James K.",
    location: "Amsterdam",
    pet: "Milo",
    stars: 5,
    text: "Bought it for fun, now I\u2019m addicted to watching Milo\u2019s daily adventures.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <SectionWrapper bg="warm" id="reviews">
      <SectionHeading
        overline="Reviews"
        title="What Pet Parents Say"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review, i) => (
          <AnimatedElement key={review.name} animation="fadeUp" delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-sm">
              <StarRating count={review.stars} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-wk-grey-600">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-wk-grey-100 pt-3">
                <p className="text-sm font-semibold text-wk-black">{review.name}</p>
                <p className="text-xs text-wk-grey-400">
                  {review.location} &middot; Cat: {review.pet}
                </p>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-wk-grey-400">
        Reviews from beta testers. More coming soon.
      </p>
    </SectionWrapper>
  );
}
