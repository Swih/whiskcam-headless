import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// Single-product store: all `/product/[handle]` URLs permanently redirect to the
// localized homepage. Using a 308 (permanent) signal so Google de-indexes these
// URLs and consolidates ranking signals on `/` instead of keeping them as stale
// duplicates. We also mark the route noindex as a belt-and-braces measure in case
// any crawler reaches it before following the redirect.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect(locale === "en" ? "/" : `/${locale}`);
}
