import Footer from "components/layout/footer";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { baseUrl } from "lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const canonical = locale === "en" ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

  return {
    title: "About Whiskcam — The Story Behind Our Pet Collar Camera",
    description:
      "The story behind Whiskcam — a pet collar camera born from pure curiosity about what our cats really do when we're not around.",
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/about`,
        fr: `${baseUrl}/fr/about`,
        de: `${baseUrl}/de/about`,
        es: `${baseUrl}/es/about`,
        "x-default": `${baseUrl}/about`,
      },
    },
    openGraph: {
      title: "About Whiskcam — The Story Behind Our Pet Collar Camera",
      description:
        "The story behind Whiskcam — a pet collar camera born from pure curiosity about what our cats really do when we're not around.",
      url: canonical,
      siteName: "Whiskcam",
      type: "website" as const,
    },
  };
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "Whiskcam",
    url: "https://whiskcam.com",
    description:
      "Whiskcam designs lightweight collar cameras for cats, helping owners see the world through their pet's eyes.",
    foundingDate: "2026",
    sameAs: [
      "https://tiktok.com/@whiskcam",
      "https://instagram.com/whiskcam",
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whiskcam.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://whiskcam.com/about" },
  ],
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero band */}
      <div className="relative flex h-[50vh] min-h-[340px] items-end overflow-hidden bg-wk-dark md:h-[55vh]">
        <Image
          src="/images/lifestyle/chat-unplash-2.webp"
          alt="Cat exploring outdoors"
          fill
          priority
          className="object-cover object-top opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-wk-amber">
            {t("overline")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-5 py-16 md:py-20">
        <div className="space-y-5 text-base leading-relaxed text-wk-grey-600">
          <p className="text-lg text-wk-black">
            {t("opening")}
          </p>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
          <p className="font-semibold text-wk-black">
            {t("closing")}
          </p>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-wk-amber transition-colors hover:text-wk-amber-hover"
          >
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {t("backToShop")}
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
