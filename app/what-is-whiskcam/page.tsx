import Footer from "components/layout/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Whiskcam? — Pet Collar Camera",
  description:
    "Whiskcam is a 26-gram pet collar camera that records 1080P Full HD video from your cat or dog's perspective. No app, no WiFi. Free worldwide shipping.",
  keywords: [
    "whiskcam",
    "what is whiskcam",
    "pet collar camera",
    "cat collar camera",
    "cat camera",
  ],
  openGraph: {
    type: "article",
    title: "What Is Whiskcam?",
    description:
      "Whiskcam is a 24 g pet collar camera that records 1080P video from your pet's POV. No app required.",
    siteName: "Whiskcam",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Whiskcam?",
    description:
      "A 24 g collar camera for cats and dogs. 1080P Full HD, no app needed.",
  },
  alternates: {
    canonical: "https://whiskcam.com/what-is-whiskcam",
    languages: {
      en: "https://whiskcam.com/what-is-whiskcam",
      fr: "https://whiskcam.com/what-is-whiskcam",
      "x-default": "https://whiskcam.com/what-is-whiskcam",
    },
  },
};

export default function WhatIsWhiskcamPage() {
  // JSON-LD: Product + Organization entity
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Whiskcam Original",
    description:
      "A 26-gram pet collar camera that records 1080P Full HD video with a 170° wide-angle lens. Clips onto any collar. No app, no WiFi required. Includes 32 GB MicroSD card and phone adapter.",
    brand: { "@type": "Brand", name: "Whiskcam" },
    image: "https://whiskcam.com/images/product/whiskcam-product-studio.webp",
    url: "https://whiskcam.com",
    weight: { "@type": "QuantitativeValue", value: "26", unitCode: "GRM" },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Resolution",
        value: "1080P Full HD",
      },
      {
        "@type": "PropertyValue",
        name: "Field of View",
        value: "170 degrees",
      },
      {
        "@type": "PropertyValue",
        name: "Battery Life",
        value: "3+ hours",
      },
      {
        "@type": "PropertyValue",
        name: "Storage",
        value: "32 GB MicroSD (included)",
      },
    ],
    offers: {
      "@type": "Offer",
      price: "49.90",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://whiskcam.com",
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
          currency: "EUR",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "What Is Whiskcam",
        item: "https://whiskcam.com/what-is-whiskcam",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-5 pt-32 pb-16 md:pt-40">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-wk-amber">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-600">What Is Whiskcam</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-wk-black md:text-4xl lg:text-[42px]">
          What Is Whiskcam?
        </h1>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:text-wk-black prose-a:text-wk-amber prose-a:no-underline hover:prose-a:underline prose-strong:text-wk-black prose-table:text-sm prose-th:bg-neutral-50 prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-t">
          {/* Answer-first intro — 40-60 words for AI extraction */}
          <p className="lead text-lg">
            Whiskcam is a <strong>26-gram pet collar camera</strong> that records 1080P Full HD video
            from your cat or dog&apos;s point of view. It clips onto any collar, requires no app or
            WiFi, and comes with a 32 GB MicroSD card and phone adapter. It costs &euro;49.90 with
            free worldwide shipping.
          </p>

          <h2>How It Works</h2>
          <p>
            Whiskcam is designed to be as simple as possible. There are no apps to download, no
            WiFi to connect, and no accounts to create. Here&apos;s the entire process:
          </p>
          <ol>
            <li><strong>Clip it on</strong> — Attach Whiskcam to your pet&apos;s existing collar. It also comes with its own adjustable collar.</li>
            <li><strong>Press record</strong> — One button starts recording. That&apos;s it.</li>
            <li><strong>Watch the footage</strong> — When your pet comes home, pop out the MicroSD card and plug it into your phone using the included adapter.</li>
          </ol>

          <h2>Specifications</h2>
          <div className="overflow-x-auto">
            <table>
              <tbody>
                <tr>
                  <td><strong>Weight</strong></td>
                  <td>24 grams</td>
                </tr>
                <tr>
                  <td><strong>Video Resolution</strong></td>
                  <td>1080P Full HD</td>
                </tr>
                <tr>
                  <td><strong>Lens</strong></td>
                  <td>170&deg; wide angle</td>
                </tr>
                <tr>
                  <td><strong>Battery Life</strong></td>
                  <td>3+ hours</td>
                </tr>
                <tr>
                  <td><strong>Storage</strong></td>
                  <td>32 GB MicroSD card (included, pre-installed)</td>
                </tr>
                <tr>
                  <td><strong>Charging</strong></td>
                  <td>USB-C, full charge in under 1 hour</td>
                </tr>
                <tr>
                  <td><strong>Video Format</strong></td>
                  <td>AVI</td>
                </tr>
                <tr>
                  <td><strong>App Required</strong></td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>WiFi Required</strong></td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>What&apos;s in the Box</h2>
          <ul>
            <li>Whiskcam camera (1080P Full HD, 170&deg; lens)</li>
            <li>32 GB MicroSD card (pre-installed)</li>
            <li>MicroSD-to-USB-C/Lightning phone adapter</li>
            <li>Adjustable pet collar</li>
            <li>USB-C charging cable</li>
            <li>Digital guide: &quot;How to Capture Your Pet&apos;s Secret Life&quot;</li>
          </ul>

          <h2>Who Is Whiskcam For?</h2>
          <p>
            Whiskcam is designed for <strong>cat and small dog owners</strong> who want to see what
            their pet does when they&apos;re not watching. It&apos;s particularly popular with:
          </p>
          <ul>
            <li>Outdoor cat owners curious about their cat&apos;s territory and adventures</li>
            <li>Pet parents who want entertaining POV footage for TikTok, Instagram, or YouTube</li>
            <li>Anyone who&apos;s ever wondered &quot;what does my cat actually do all day?&quot;</li>
          </ul>
          <p>
            At 24 g, it&apos;s safe for cats of all sizes — even small breeds. For more on safety, see our guide on{" "}
            <a href="/blog/are-cat-collar-cameras-safe">cat collar camera safety</a>.
          </p>

          <h2>Whiskcam vs Competitors</h2>
          <p>
            The main alternative is the Mr Petcam (~38 g, ~$70, SD card not included). For a full
            breakdown, see our{" "}
            <a href="/blog/best-cat-collar-cameras-2026">
              comparison of the best cat collar cameras in 2026
            </a>
            .
          </p>
          <p>
            Key differences: Whiskcam is lighter (24 g vs 38 g), cheaper (&euro;49.90 vs ~$85-90
            with accessories), and includes everything in the box. Mr Petcam has been around longer
            and has more user reviews.
          </p>

          <h2>Pricing & Shipping</h2>
          <p>
            Whiskcam costs <strong>&euro;49.90</strong> with <strong>free worldwide shipping</strong>.
            Delivery takes 7-14 business days. There&apos;s a 30-day money-back guarantee — if
            you&apos;re not happy, email support@whiskcam.com for a full refund.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/#product"
            className="rounded-full bg-wk-amber px-8 py-3 text-sm font-semibold text-wk-dark transition-colors hover:bg-wk-amber-hover"
          >
            Shop Whiskcam — &euro;49.90
          </Link>
          <Link
            href="/blog/best-cat-collar-cameras-2026"
            className="text-sm font-medium text-wk-amber hover:underline"
          >
            Read the full comparison &rarr;
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
