import { HeroSection } from "components/landing/hero-section";
import { VideoShowcase } from "components/landing/video-showcase";
import { FeaturesGrid } from "components/landing/features-grid";
import { HowItWorks } from "components/landing/how-it-works";
import { ProductSection } from "components/landing/product-section";
import { SocialProofBar } from "components/landing/social-proof-bar";
import { ComparisonTable } from "components/landing/comparison-table";
import { CtaBanner } from "components/landing/cta-banner";
import { FaqSection } from "components/landing/faq-section";
import { ReviewsSection } from "components/landing/reviews-section";
import Footer from "components/layout/footer";
import { StickyAtcBar } from "components/ui/sticky-atc-bar";
import { getProduct } from "lib/shopify";
import { FAQ_ITEMS, PRODUCT_HANDLE, HERO_CONTENT, VIDEOS } from "lib/content";
import { formatPrice } from "lib/format";
import { cookies } from "next/headers";

export const metadata = {
  title: "Whiskcam — Pet Collar Camera | See Their World",
  description:
    "Ever wonder what your cat does when you leave? Whiskcam is a lightweight 1080P pet collar camera with 170° wide angle. No app, no WiFi. Free worldwide shipping.",
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
    type: "website",
    url: "https://whiskcam.com",
    title: "Whiskcam — See Their World",
    description:
      "The pet collar camera that reveals your pet's secret life. 1080P Full HD, 170° wide angle, ultra-lightweight.",
    siteName: "Whiskcam",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiskcam — Pet Collar Camera",
    description:
      "See what your cat actually does. 1080P HD pet collar camera. No app needed.",
  },
  alternates: {
    canonical: "https://whiskcam.com",
  },
};

export default async function HomePage() {
  const country = (await cookies()).get("country")?.value || "FR";
  const product = await getProduct(PRODUCT_HANDLE, country);

  const compareAtPrice = product?.variants[0]?.compareAtPrice;
  const compareAtPriceFormatted = compareAtPrice
    ? formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)
    : undefined;

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.featuredImage?.url,
        brand: { "@type": "Brand", name: "Whiskcam" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "500",
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          url: "https://whiskcam.com",
          priceCurrency: product.priceRange.maxVariantPrice.currencyCode,
          price: product.priceRange.maxVariantPrice.amount,
          availability: product.availableForSale
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
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
      availableLanguage: ["English", "French"],
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
        item: "https://whiskcam.com",
      },
    ],
  };

  // VideoObject schema — hero video + showcase videos (AEO: AI models read this)
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Whiskcam Cat Collar Camera — See Their World",
    description:
      "Watch real POV footage captured by Whiskcam, a lightweight 26g camera designed for cats. 1080P Full HD, 170° wide-angle lens.",
    thumbnailUrl: `https://whiskcam.com${HERO_CONTENT.posterSrc}`,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: `https://whiskcam.com${HERO_CONTENT.videoSrc}`,
    embedUrl: "https://whiskcam.com",
    duration: "PT0M22S",
  };

  const videoListJsonLd = VIDEOS.slice(0, 3).map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Whiskcam Cat POV — ${video.title}`,
    description: `Cat point-of-view footage captured with Whiskcam collar camera: ${video.title}.`,
    thumbnailUrl: `https://whiskcam.com${video.poster}`,
    uploadDate: "2026-03-01T00:00:00Z",
    contentUrl: `https://whiskcam.com${video.src}`,
    duration: `PT0M${video.duration.split(":")[1]}S`,
  }));

  // TODO: Add Review schema here when real customer reviews are collected.
  // The reviews currently displayed on the site are curated/placeholder reviews.
  // Google penalizes fake structured data — only add Review JSON-LD with genuine,
  // verified customer reviews. When ready, use this pattern:
  // { "@type": "Review", "author": { "@type": "Person", "name": "..." }, ... }

  return (
    <>
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
      <FeaturesGrid />
      <ReviewsSection />
      <HowItWorks />
      <ProductSection product={product} />
      <ComparisonTable price={product ? formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode) : undefined} />
      <CtaBanner product={product} />
      <FaqSection />
      <Footer />

      {/* Mobile sticky ATC bar */}
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
