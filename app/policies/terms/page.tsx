import Footer from "components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Whiskcam terms of service — the rules that govern your use of our website and products.",
};

export default function TermsPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black">Terms of Service</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: March 2026</p>
        <div className="prose prose-neutral mt-8 max-w-none">
          <h2>Overview</h2>
          <p>
            This website is operated by Whiskcam. Throughout the site, the terms
            &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to Whiskcam. By
            visiting our site and/or purchasing something from us, you agree to be bound
            by these terms.
          </p>

          <h2>Products</h2>
          <p>
            We have made every effort to display the colors and images of our products
            accurately. We cannot guarantee that your monitor&apos;s display will be
            accurate. We reserve the right to limit quantities of any products.
          </p>

          <h2>Pricing</h2>
          <p>
            Prices for our products are subject to change without notice. We reserve the
            right to modify or discontinue any product without notice.
          </p>

          <h2>Orders</h2>
          <p>
            We reserve the right to refuse any order. We may limit or cancel quantities
            purchased per person. If we cancel an order, we will refund the full amount.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            We are not responsible if information made available on this site is not
            accurate, complete, or current. The material on this site is provided for
            general information only.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Whiskcam shall not be liable for any injury, loss, claim, or damage arising
            from the use of our products. Our products are designed for use on healthy
            adult pets under supervision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about the Terms of Service should be sent to us at{" "}
            <a href="mailto:support@whiskcam.com">support@whiskcam.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
