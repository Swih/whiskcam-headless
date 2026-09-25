import { HeroSection } from "components/landing/hero-section";
import { VideoShowcase } from "components/landing/video-showcase";
import { FeaturesGrid } from "components/landing/features-grid";
import { HowItWorks } from "components/landing/how-it-works";
import { ProductSection } from "components/landing/product-section";
import { SocialProofBar } from "components/landing/social-proof-bar";
import { ComparisonTable } from "components/landing/comparison-table";
import { CtaBanner } from "components/landing/cta-banner";
import { FromTheBlog } from "components/landing/from-the-blog";
import { PeaceOfMind } from "components/landing/peace-of-mind";
import { DuoPackCallout } from "components/landing/duo-pack-callout";
import { FaqSection } from "components/landing/faq-section";
import { ReviewsSection } from "components/landing/reviews-section";
import Footer from "components/layout/footer";
import { StickyAtcBar } from "components/ui/sticky-atc-bar";
import { getProduct } from "lib/shopify";
import { PRODUCT_HANDLE, DUO_PRODUCT_HANDLE, HERO_CONTENT, VIDEOS, PRODUCT_FACTS } from "lib/content";
import {
  ORG_ID,
  PRODUCT_ID,
  WEBSITE_ID,
  offerSchema,
  organizationSchema,
  productProperties,
  websiteSchema,
} from "lib/schema";
import { alternatesFor } from "lib/seo";
import { formatPrice } from "lib/format";
import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { baseUrl } from "lib/utils";

const ogData: Record<string, { title: string; description: string; locale: string }> = {
  en: {
    title: "Whiskcam | 1080P Cat Collar Camera, No WiFi",
    description: "The pet collar camera that reveals your pet's secret life. 1080P Full HD, 170° wide angle, ultra-lightweight.",
    locale: "en_US",
  },
  fr: {
    title: "Whiskcam | Caméra collier pour chat 1080P",
    description: "La caméra de collier qui révèle la vie secrète de votre animal. 1080P Full HD, 170° grand angle, ultra-légère.",
    locale: "fr_FR",
  },
  de: {
    title: "Whiskcam | 1080P Halsbandkamera für Katzen",
    description: "Die Halsbandkamera, die das geheime Leben deines Haustieres enthüllt. 1080P Full HD, 170° Weitwinkel, ultraleicht.",
    locale: "de_DE",
  },
  es: {
    title: "Whiskcam | Cámara de collar para gatos 1080P",
    description: "La cámara de collar que revela la vida secreta de tu mascota. 1080P Full HD, 170° gran angular, ultraligera.",
    locale: "es_ES",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const og = ogData[locale] ?? ogData.en!;
  const pageUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: { absolute: og.title },
    description: og.description,
    alternates: alternatesFor("", locale),
    keywords: [
      "pet collar camera",
      "cat camera",
      "dog camera",
      "pet POV camera",
      "collar camera for cats",
      "pet adventure camera",
      "whiskcam",
    ],
    openGraph: {
      type: "website" as const,
      url: pageUrl,
      title: og.title,
      description: og.description,
      siteName: "Whiskcam",
      locale: og.locale,
      alternateLocale: ["en_US", "fr_FR", "de_DE", "es_ES"].filter(
        (l) => l !== og.locale
      ),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: og.title,
      description: og.description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const productText = await getTranslations({ locale, namespace: "product" });
  const faqText = await getTranslations({ locale, namespace: "faq" });

  const country = (await cookies()).get("country")?.value || "FR";
  const [product, duoProduct] = await Promise.all([
    getProduct(PRODUCT_HANDLE, country),
    getProduct(DUO_PRODUCT_HANDLE, country),
  ]);

  const cc = product?.priceRange.maxVariantPrice.currencyCode || "EUR";
  const compareAt = product?.variants[0]?.compareAtPrice;
  const compareAtPriceFormatted = compareAt?.currencyCode === cc &&
    Number(compareAt.amount) > Number(product?.priceRange.maxVariantPrice.amount)
    ? formatPrice(compareAt.amount, cc) : undefined;

  const pageUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // SKU — the Shopify variants were imported from AliExpress and their SKUs still
  // carry the supplier's encoded option string
  // ("14:193#X6 Collar pet camera;200000828:201335941#with 32GB"). Stripping the
  // punctuation left a 47-character supplier reference that passed validation but
  // was still published verbatim in `sku` and `mpn`. Publish our own identifier
  // instead; PRODUCT_FACTS.sku is the single place it is defined.
  const productSku = PRODUCT_FACTS.sku;

  // ---------------------------------------------------------------------------
  // Structured data — a single connected @graph rather than eight standalone
  // blocks. Every entity has a stable @id so Google and the AI crawlers resolve
  // one Whiskcam organisation and one product across the whole site, instead of
  // re-deriving a look-alike entity per page.
  // ---------------------------------------------------------------------------
  const productNode = product
    ? {
        "@type": "Product",
        "@id": PRODUCT_ID,
        name: productText("title"),
        description: `${productText("subtitle")} ${productText("keyBenefits.0")} ${productText("storageNotice")}`,
        image: product.featuredImage?.url,
        sku: productSku,
        mpn: productSku,
        brand: { "@id": ORG_ID },
        manufacturer: { "@id": ORG_ID },
        category: "Pet Cameras",
        weight: {
          "@type": "QuantitativeValue",
          value: String(PRODUCT_FACTS.weightGrams),
          unitCode: "GRM",
        },
        additionalProperty: productProperties(),
        // Offers establish product eligibility. Add ratings only after the
        // mixed supplier/store review corpus has verified provenance.
        offers: offerSchema({
          price: product.priceRange.maxVariantPrice.amount,
          currency: product.priceRange.maxVariantPrice.currencyCode,
          url: pageUrl,
          inStock: product.availableForSale,
        }),
      }
    : null;

  const faqNode = {
    "@type": "FAQPage",
    "@id": pageUrl + "#faq",
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: ([0, 1, 2, 3, 4, 5, 6, 7] as const).map((i) => ({
      "@type": "Question",
      name: faqText(`items.${i}.question`),
      acceptedAnswer: { "@type": "Answer", text: faqText(`items.${i}.answer`) },
    })),
  };

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": pageUrl + "#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: pageUrl },
    ],
  };

  // Parse "M:SS" into ISO 8601 ("PTxMySS") — an earlier version dropped the
  // minutes for any clip past 60 s, which GSC flagged as invalid.
  const toIsoDuration = (value: string): string => {
    const [rawMin, rawSec] = value.split(":");
    const mins = Number.parseInt(rawMin ?? "0", 10) || 0;
    const secs = Number.parseInt(rawSec ?? "0", 10) || 0;
    return "PT" + mins + "M" + secs + "S";
  };

  const heroVideoNode = {
    "@type": "VideoObject",
    "@id": pageUrl + "#hero-video",
    name: "Whiskcam Cat Collar Camera — See Their World",
    description:
      "Real POV footage captured by Whiskcam, a " +
      PRODUCT_FACTS.weightGrams +
      " g collar camera designed for cats. " +
      PRODUCT_FACTS.resolution +
      ", " +
      PRODUCT_FACTS.fieldOfViewDegrees +
      "° wide-angle lens.",
    thumbnailUrl: baseUrl + HERO_CONTENT.posterSrc,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: baseUrl + HERO_CONTENT.videoSrc,
    embedUrl: baseUrl,
    duration: "PT0M22S",
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };

  const videoNodes = VIDEOS.slice(0, 3).map((video, i) => ({
    "@type": "VideoObject",
    "@id": pageUrl + "#video-" + i,
    name: "Whiskcam Cat POV — " + video.title,
    description:
      "Cat point-of-view footage captured with a Whiskcam collar camera: " +
      video.title +
      ".",
    thumbnailUrl: baseUrl + video.poster,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: baseUrl + video.src,
    duration: toIsoDuration(video.duration),
    publisher: { "@id": ORG_ID },
  }));

  const graphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      ...(productNode ? [productNode] : []),
      faqNode,
      breadcrumbNode,
      heroVideoNode,
      ...videoNodes,
    ],
  };

  return (
    <>
      <link
        rel="preload"
        href={HERO_CONTENT.posterSrc}
        as="image"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
      />

      <HeroSection product={product} />
      <SocialProofBar />
      <VideoShowcase />
      <ProductSection product={product} />
      <ReviewsSection />
      <DuoPackCallout duoProduct={duoProduct} singleProduct={product} />
      <FeaturesGrid />
      <HowItWorks />
      <ComparisonTable price={product ? formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode) : undefined} />
      <PeaceOfMind />
      <CtaBanner product={product} />
      <FromTheBlog />
      <FaqSection />
      <Footer />

      {product && (
        <StickyAtcBar
          price={formatPrice(
            product.priceRange.maxVariantPrice.amount,
            product.priceRange.maxVariantPrice.currencyCode
          )}
          compareAtPrice={compareAtPriceFormatted}
          product={product}
        />
      )}
    </>
  );
}
