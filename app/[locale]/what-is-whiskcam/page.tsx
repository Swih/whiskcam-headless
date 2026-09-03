import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";
import { PRODUCT_FACTS } from "lib/content";
import {
  ORG_ID,
  PRODUCT_ID,
  WEBSITE_ID,
  offerSchema,
  organizationSchema,
  productProperties,
  websiteSchema,
} from "lib/schema";
import { baseUrl } from "lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "What Is Whiskcam? — Pet Collar Camera",
    description:
      "Whiskcam is a 24 g pet collar camera that records 1080P Full HD video from your cat or dog's perspective. No app, no WiFi. Free worldwide shipping.",
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
    alternates: alternatesFor("/what-is-whiskcam", locale),
  };
}

export default async function WhatIsWhiskcamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Structured data. This page used to declare a *second*, unlinked Product with
  // its own hardcoded price, weight and US-only shipping policy — a near-duplicate
  // of the homepage's. It now references the same @id, so there is one Whiskcam
  // product entity across the site, and the specs come from PRODUCT_FACTS.
  const canonical = alternatesFor("/what-is-whiskcam", locale).canonical;
  const f = PRODUCT_FACTS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "Product",
        "@id": PRODUCT_ID,
        name: f.name,
        description: `A ${f.weightGrams} g pet collar camera that records ${f.resolution} video with a ${f.fieldOfViewDegrees}° wide-angle lens. Clips onto any collar. No app, no WiFi required. Includes a ${f.storageGb} GB MicroSD card and a phone adapter.`,
        brand: { "@id": ORG_ID },
        manufacturer: { "@id": ORG_ID },
        category: "Pet Cameras",
        image: `${baseUrl}/images/product/whiskcam-product-studio.webp`,
        url: baseUrl,
        weight: {
          "@type": "QuantitativeValue",
          value: String(f.weightGrams),
          unitCode: "GRM",
        },
        additionalProperty: productProperties(),
        offers: offerSchema({
          price: f.price,
          currency: f.currency,
          url: baseUrl,
          inStock: true,
        }),
      },
      {
        "@type": "WebPage",
        "@id": canonical,
        url: canonical,
        name: "What Is Whiskcam?",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PRODUCT_ID },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "What Is Whiskcam", item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div lang="en" className="mx-auto max-w-3xl px-5 pt-32 pb-16 md:pt-40">
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
            Whiskcam is a <strong>24 g pet collar camera</strong> that records 1080P Full HD video
            from your cat or dog&apos;s point of view. It clips onto any collar, requires no app or
            WiFi, and ships as a complete kit (camera + 32 GB MicroSD + phone adapter + collar +
            cable + digital guide) for &euro;79 with free worldwide shipping.
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
                  <td>Up to 2 hours</td>
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
            Key differences: Whiskcam is lighter (24 g vs 38 g) and ships as a complete kit at
            &euro;79 (camera + 32 GB SD + phone adapter + collar + cable + guide). Mr Petcam ships
            the camera alone at $70, so once you add a card and an adapter you&apos;re in the same
            range. Mr Petcam has been around longer and has more user reviews.
          </p>

          <h2>Pricing & Shipping</h2>
          <p>
            Whiskcam costs <strong>&euro;79</strong> for the complete kit, with <strong>free worldwide shipping</strong>.
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
            Shop Whiskcam — &euro;79
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
