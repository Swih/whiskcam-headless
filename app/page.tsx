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
import { FAQ_ITEMS, PRODUCT_HANDLE } from "lib/content";
import { formatPrice } from "lib/format";

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
  const product = await getProduct(PRODUCT_HANDLE);

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
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: product.priceRange.maxVariantPrice.currencyCode,
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              businessDays: { "@type": "QuantitativeValue", minValue: 7, maxValue: 14 },
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
    sameAs: [
      "https://tiktok.com/@whiskcam",
      "https://instagram.com/whiskcam",
    ],
  };

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
