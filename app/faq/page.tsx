import { FaqAccordion } from "components/landing/faq-accordion";
import Footer from "components/layout/footer";
import { FAQ_ITEMS } from "lib/content";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Whiskcam — battery life, safety, shipping, returns, and more.",
  keywords: ["cat collar camera FAQ", "cat camera safe", "Whiskcam questions", "pet camera help"],
  alternates: {
    canonical: "https://whiskcam.com/faq",
    languages: {
      en: "https://whiskcam.com/faq",
      fr: "https://whiskcam.com/faq",
      "x-default": "https://whiskcam.com/faq",
    },
  },
  openGraph: {
    title: "FAQ — Whiskcam",
    description:
      "Frequently asked questions about Whiskcam — battery life, safety, shipping, returns, and more.",
    url: "https://whiskcam.com/faq",
    siteName: "Whiskcam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ — Whiskcam",
    description:
      "Everything you need to know about Whiskcam. Battery, safety, shipping, returns.",
  },
};

// JSON-LD uses English FAQ_ITEMS (SEO structured data, locale-independent)
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

const FAQ_COUNT = 8;

export default async function FaqPage() {
  const t = await getTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`items.${i}.question` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.question`),
    answer: t(`items.${i}.answer` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.answer`),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black md:text-5xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          {t("pageSubtitle")}
        </p>
        <div className="mt-12">
          <FaqAccordion items={items} />
        </div>
      </div>
      <Footer />
    </>
  );
}
