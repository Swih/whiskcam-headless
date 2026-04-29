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
import { FAQ_ITEMS, PRODUCT_HANDLE, DUO_PRODUCT_HANDLE, HERO_CONTENT, VIDEOS } from "lib/content";
import { formatPrice } from "lib/format";
import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { baseUrl } from "lib/utils";

const ogData: Record<string, { title: string; description: string; locale: string }> = {
  en: {
    title: "Whiskcam — See Their World",
    description: "The pet collar camera that reveals your pet's secret life. 1080P Full HD, 170° wide angle, ultra-lightweight.",
    locale: "en_US",
  },
  fr: {
    title: "Whiskcam — Découvrez Leur Monde Secret",
    description: "La caméra de collar qui révèle la vie secrète de votre animal. 1080P Full HD, 170° grand angle, ultra-légère.",
    locale: "fr_FR",
  },
  de: {
    title: "Whiskcam — Entdecke Ihre Geheime Welt",
    description: "Die Halsbandkamera, die das geheime Leben deines Haustieres enthüllt. 1080P Full HD, 170° Weitwinkel, ultraleicht.",
    locale: "de_DE",
  },
  es: {
    title: "Whiskcam — Descubre Su Mundo Secreto",
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
    description: og.description,
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

  const country = (await cookies()).get("country")?.value || "FR";
  const [product, duoProduct] = await Promise.all([
    getProduct(PRODUCT_HANDLE, country),
    getProduct(DUO_PRODUCT_HANDLE, country),
  ]);

  // Hard-coded marketing anchor — keeps the strikethrough on €109 regardless
  // of any compare-at value left on the Shopify variant.
  const cc = product?.priceRange.maxVariantPrice.currencyCode || "EUR";
  const compareAtPriceFormatted = formatPrice("109.00", cc);

  const pageUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  // SKU — Shopify variant SKUs were imported from AliExpress with option-encoded
  // garbage like "14:193#X6 Collar pet camera;200000828:201335941#with 32GB",
  // which Google Merchant Listings validation rejects (invalid chars, too long).
  // Sanitize: keep only alphanumeric + dash/underscore, truncate to 50 chars,
  // fall back to a clean handle-based identifier if the result is unusable.
  const rawSku = product?.variants[0]?.sku ?? "";
  const sanitizedSku = rawSku
    .replace(/[^A-Za-z0-9_-]/g, "")
    .slice(0, 50);
  const productSku =
    sanitizedSku.length >= 3 && sanitizedSku.length <= 50
      ? sanitizedSku
      : "WHISKCAM-ORIGINAL";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.featuredImage?.url,
        sku: productSku,
        mpn: productSku,
        brand: { "@type": "Brand", name: "Whiskcam" },
        inLanguage: locale,
        // Aggregate rating mirrors the customer reviews displayed on the homepage
        // (41 × 5-star, 8 × 4-star, 2 × 3-star → weighted average 4.76 → displayed as 4.8).
        // Reviews include verified buyers of the Whiskcam camera; we add Whiskcam-direct
        // customer feedback as orders are delivered.
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "51",
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
          price: product.priceRange.maxVariantPrice.amount,
          availability: product.availableForSale
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: "Whiskcam" },
          priceValidUntil: "2026-12-31",
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "US",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: product.priceRange.maxVariantPrice.currencyCode,
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 3,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 5,
                maxValue: 12,
                unitCode: "DAY",
              },
            },
          },
        },
      }
    : null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Whiskcam",
    url: "https://whiskcam.com",
    logo: "https://whiskcam.com/images/logos/whiskcam-logo-icon.webp",
    description:
      "Whiskcam makes lightweight pet collar cameras that let you see the world from your cat or dog's perspective. 1080P Full HD, no app required.",
    foundingDate: "2026",
    sameAs: [
      "https://tiktok.com/@whiskcam",
      "https://instagram.com/whiskcam",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@whiskcam.com",
      contactType: "customer support",
      availableLanguage: ["English", "French", "German", "Spanish"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: pageUrl,
      },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Whiskcam Cat Collar Camera — See Their World",
    description:
      "Watch real POV footage captured by Whiskcam, a lightweight 24g camera designed for cats. 1080P Full HD, 170° wide-angle lens.",
    thumbnailUrl: `https://whiskcam.com${HERO_CONTENT.posterSrc}`,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: `https://whiskcam.com${HERO_CONTENT.videoSrc}`,
    embedUrl: "https://whiskcam.com",
    duration: "PT0M22S",
    inLanguage: locale,
  };

  // Parse "M:SS" video duration into ISO 8601 ("PTxMySS") — prior implementation
  // dropped minutes for any clip ≥ 1 minute, which was flagged by GSC as invalid.
  const toIsoDuration = (value: string): string => {
    const [rawMin, rawSec] = value.split(":");
    const mins = Number.parseInt(rawMin ?? "0", 10) || 0;
    const secs = Number.parseInt(rawSec ?? "0", 10) || 0;
    return `PT${mins}M${secs}S`;
  };

  const videoListJsonLd = VIDEOS.slice(0, 3).map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Whiskcam Cat POV — ${video.title}`,
    description: `Cat point-of-view footage captured with Whiskcam collar camera: ${video.title}.`,
    thumbnailUrl: `https://whiskcam.com${video.poster}`,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: `https://whiskcam.com${video.src}`,
    duration: toIsoDuration(video.duration),
  }));

  return (
    <>
      <link
        rel="preload"
        href={HERO_CONTENT.posterSrc}
        as="image"
        fetchPriority="high"
      />
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      {videoListJsonLd.map((v, i) => (
        <script
          key={`video-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(v) }}
        />
      ))}

      <HeroSection product={product} />
      <SocialProofBar />
      <VideoShowcase />
      <ProductSection product={product} />
      <ReviewsSection />
      <DuoPackCallout duoProduct={duoProduct} />
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
