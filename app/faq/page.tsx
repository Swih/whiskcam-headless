import { FaqAccordion } from "components/landing/faq-accordion";
import Footer from "components/layout/footer";
import { FAQ_ITEMS } from "lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Whiskcam — battery life, safety, shipping, returns, and more.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Everything you need to know about Whiskcam.
        </p>
        <div className="mt-12">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </div>
      <Footer />
    </>
  );
}
