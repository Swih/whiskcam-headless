"use client";

import { Link } from "i18n/navigation";
import { hasConsent } from "components/analytics";

export function BlogProductLink({
  slug,
  placement,
  children,
}: {
  slug: string;
  placement: "comparison" | "article-footer";
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/#product"
      className="inline-block rounded-lg bg-wk-amber px-6 py-3 text-sm font-semibold text-wk-dark transition-colors hover:bg-wk-amber-hover"
      onClick={() => {
        if (hasConsent()) {
          window.gtag?.("event", "blog_product_click", {
            article_slug: slug,
            cta_placement: placement,
            destination_path: "/#product",
          });
        }
      }}
    >
      {children}
    </Link>
  );
}
