import Footer from "components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Whiskcam privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black">Privacy Policy</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: March 2026</p>
        <div className="prose prose-neutral mt-8 max-w-none">
          <h2>Information We Collect</h2>
          <p>
            When you place an order, we collect your name, email address, shipping address,
            and payment information. Payment processing is handled securely by Shopify
            Payments — we never store your credit card details.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To fulfill and ship your orders</li>
            <li>To send order confirmation and shipping updates</li>
            <li>To respond to your customer support inquiries</li>
            <li>To improve our products and services</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We share data only with service
            providers necessary to fulfill your orders (shipping carriers, payment
            processors).
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies to provide a functional shopping experience. These
            include session cookies for your cart and analytics cookies to understand
            site usage.
          </p>

          <h2>Your Rights</h2>
          <p>
            Under GDPR and other applicable privacy laws, you have the right to access,
            correct, or delete your personal data. Contact us at{" "}
            <a href="mailto:support@whiskcam.com">support@whiskcam.com</a> to exercise
            these rights.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, email us at{" "}
            <a href="mailto:support@whiskcam.com">support@whiskcam.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
