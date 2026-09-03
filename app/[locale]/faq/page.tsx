import { FaqAccordion } from "components/landing/faq-accordion";
import Footer from "components/layout/footer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";
import { ORG_ID, WEBSITE_ID, organizationSchema, websiteSchema } from "lib/schema";
import { baseUrl } from "lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const canonical = alternatesFor("/faq", locale).canonical;

  return {
    title: "Whiskcam FAQ — Cat Collar Camera Questions Answered",
    description:
      "Frequently asked questions about the Whiskcam pet collar camera — battery life, cat safety, video format, shipping, returns, and more.",
    alternates: alternatesFor("/faq", locale),
    openGraph: {
      title: "Whiskcam FAQ — Cat Collar Camera Questions Answered",
      description:
        "Frequently asked questions about the Whiskcam pet collar camera — battery life, cat safety, video format, shipping, returns, and more.",
      url: canonical,
      siteName: "Whiskcam",
      type: "website" as const,
    },
  };
}

const FAQ_COUNT = 8;

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`items.${i}.question` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.question`),
    answer: t(`items.${i}.answer` as `items.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}.answer`),
  }));

  // Built from the translated strings rendered below. The previous version always
  // emitted the English FAQ_ITEMS, so on /fr, /de and /es the markup described
  // content that was not on the page — which is exactly what Google treats as a
  // structured-data mismatch, and what makes an AI answer quote the wrong language.
  const canonical = alternatesFor("/faq", locale).canonical;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        url: canonical,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "FAQ", item: canonical },
        ],
      },
    ],
  };

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
