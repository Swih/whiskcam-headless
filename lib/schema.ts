// =============================================================================
// Whiskcam — Shared JSON-LD building blocks
//
// Structured data is how both Google and the AI assistants read this store, and
// it was previously retyped per page: the homepage and /what-is-whiskcam each
// declared their own unlinked `Product`, with a US-only shipping and return
// policy attached to EUR prices. Everything below is derived from PRODUCT_FACTS
// so the markup cannot contradict the storefront, and every entity carries a
// stable `@id` so the graph resolves to one Organization and one Product instead
// of a handful of look-alike islands.
// =============================================================================

import { PRODUCT_FACTS, SHIPPING_COUNTRIES } from "lib/content";
import { baseUrl } from "lib/utils";

export const ORG_ID = `${baseUrl}/#organization`;
export const WEBSITE_ID = `${baseUrl}/#website`;
export const PRODUCT_ID = `${baseUrl}/#product`;

const f = PRODUCT_FACTS;

/** One year out, recomputed at render time. A hardcoded date silently expires
 *  and Google then reports the offer as stale. */
export function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Whiskcam",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logos/whiskcam-logo-icon.webp`,
    },
    description:
      `Whiskcam makes ${f.weightGrams} g pet collar cameras that record ${f.resolution} video from a cat's or small dog's point of view. No app, no WiFi, no subscription.`,
    foundingDate: "2026",
    knowsAbout: [
      "pet collar cameras",
      "cat wearable safety",
      "pet point-of-view video",
      "collar camera weight limits",
    ],
    sameAs: ["https://tiktok.com/@whiskcam", "https://instagram.com/whiskcam"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@whiskcam.com",
      contactType: "customer support",
      availableLanguage: ["English", "French", "German", "Spanish"],
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: baseUrl,
    name: "Whiskcam",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** Return policy covering the markets the store actually ships to, rather than
 *  the previous US-only declaration sitting on EUR prices. */
export function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: [...SHIPPING_COUNTRIES],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: f.returnDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };
}

export function offerShippingDetails(currency: string = f.currency) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency,
    },
    shippingDestination: SHIPPING_COUNTRIES.map((country) => ({
      "@type": "DefinedRegion",
      addressCountry: country,
    })),
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
        minValue: f.shippingDaysMin,
        maxValue: f.shippingDaysMax,
        unitCode: "DAY",
      },
    },
  };
}

/** The specification table, as machine-readable properties. Mirrors the visible
 *  table on /what-is-whiskcam — keep the two in step. */
export function productProperties() {
  return [
    { "@type": "PropertyValue", name: "Weight", value: `${f.weightGrams} g` },
    { "@type": "PropertyValue", name: "Resolution", value: f.resolution },
    { "@type": "PropertyValue", name: "Field of View", value: `${f.fieldOfViewDegrees} degrees` },
    { "@type": "PropertyValue", name: "Battery Life", value: `Up to ${f.batteryHours} hours` },
    { "@type": "PropertyValue", name: "Storage", value: `${f.storageGb} GB MicroSD (included)` },
    { "@type": "PropertyValue", name: "Charging", value: `${f.charging}, full charge under ${f.chargeTimeHours} hour` },
    { "@type": "PropertyValue", name: "Video Format", value: f.videoFormat },
    { "@type": "PropertyValue", name: "App Required", value: "No" },
    { "@type": "PropertyValue", name: "WiFi Required", value: "No" },
  ];
}

export function offerSchema(opts: {
  price: string;
  currency: string;
  url: string;
  inStock: boolean;
}) {
  return {
    "@type": "Offer",
    url: opts.url,
    priceCurrency: opts.currency,
    price: opts.price,
    availability: opts.inStock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": ORG_ID },
    priceValidUntil: priceValidUntil(),
    hasMerchantReturnPolicy: merchantReturnPolicy(),
    shippingDetails: offerShippingDetails(opts.currency),
  };
}
