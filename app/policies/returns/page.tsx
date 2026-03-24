import Footer from "components/layout/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Whiskcam 30-day money-back guarantee. No questions asked.",
  keywords: ["Whiskcam", "return policy", "refund", "money-back guarantee"],
  alternates: {
    canonical: "https://whiskcam.com/policies/returns",
    languages: {
      en: "https://whiskcam.com/policies/returns",
      fr: "https://whiskcam.com/policies/returns",
      "x-default": "https://whiskcam.com/policies/returns",
    },
  },
  openGraph: {
    title: "Return Policy — Whiskcam",
    description: "30-day money-back guarantee. No questions asked.",
    url: "https://whiskcam.com/policies/returns",
    siteName: "Whiskcam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Return Policy — Whiskcam",
    description: "30-day money-back guarantee. No questions asked.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whiskcam.com" },
    { "@type": "ListItem", position: 2, name: "Return Policy", item: "https://whiskcam.com/policies/returns" },
  ],
};

export default function ReturnsPage() {
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
            <li className="text-neutral-600">Return Policy</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-bold text-wk-black">Return &amp; Refund Policy</h1>
        <div className="prose prose-neutral mt-8 max-w-none">
          <h2>30-Day Money-Back Guarantee</h2>
          <p>
            We want you and your pet to love Whiskcam. If for any reason you&apos;re not
            satisfied, you have <strong>30 days from delivery</strong> to request a full
            refund. No questions asked.
          </p>

          <h2>How to Request a Refund</h2>
          <ol>
            <li>
              Email us at <a href="mailto:support@whiskcam.com">support@whiskcam.com</a> with
              your order number
            </li>
            <li>We&apos;ll process your refund within 3–5 business days</li>
            <li>The refund will appear on your original payment method within 5–10 business days</li>
          </ol>

          <h2>Do I Need to Return the Product?</h2>
          <p>
            In most cases, no. We don&apos;t require you to ship the product back.
            We&apos;d rather you keep it or gift it to a friend.
          </p>

          <h2>Damaged or Defective Items</h2>
          <p>
            If your Whiskcam arrives damaged or defective, please contact us immediately
            with photos of the issue. We&apos;ll send a replacement at no cost.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
