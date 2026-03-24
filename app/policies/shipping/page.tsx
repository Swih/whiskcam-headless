import Footer from "components/layout/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Whiskcam shipping information — free worldwide shipping, delivery times, and tracking.",
  keywords: ["Whiskcam", "shipping policy", "free shipping", "delivery times"],
  alternates: {
    canonical: "https://whiskcam.com/policies/shipping",
    languages: {
      en: "https://whiskcam.com/policies/shipping",
      fr: "https://whiskcam.com/policies/shipping",
      "x-default": "https://whiskcam.com/policies/shipping",
    },
  },
  openGraph: {
    title: "Shipping Policy — Whiskcam",
    description: "Free worldwide shipping, delivery times, and tracking information.",
    url: "https://whiskcam.com/policies/shipping",
    siteName: "Whiskcam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shipping Policy — Whiskcam",
    description: "Free worldwide shipping, delivery times, and tracking.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whiskcam.com" },
    { "@type": "ListItem", position: 2, name: "Shipping Policy", item: "https://whiskcam.com/policies/shipping" },
  ],
};

export default function ShippingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <nav className="mb-6 text-sm text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-wk-amber">Home</Link></li>
            <li>/</li>
            <li className="text-neutral-600">Shipping Policy</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-bold text-wk-black">Shipping Policy</h1>
        <div className="prose prose-neutral mt-8 max-w-none">
          <h2>Free Worldwide Shipping</h2>
          <p>
            All Whiskcam orders ship for free, no matter where you are in the world.
            No minimum order required.
          </p>

          <h2>Delivery Times</h2>
          <p>
            Due to worldwide demand, please allow <strong>7–14 business days</strong> for
            your Whiskcam to arrive. Delivery times vary depending on your location:
          </p>
          <ul>
            <li>United States: 7–12 business days</li>
            <li>Europe: 8–14 business days</li>
            <li>United Kingdom: 7–12 business days</li>
            <li>Canada &amp; Australia: 10–14 business days</li>
            <li>Rest of world: 10–18 business days</li>
          </ul>

          <h2>Order Tracking</h2>
          <p>
            You&apos;ll receive a tracking number via email as soon as your order ships.
            You can use this number to track your package at any time.
          </p>

          <h2>Delays</h2>
          <p>
            Occasionally, packages may be delayed due to customs processing or local
            postal conditions. If your order hasn&apos;t arrived within 30 days, please
            contact us at{" "}
            <a href="mailto:support@whiskcam.com">support@whiskcam.com</a> and
            we&apos;ll make it right.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
