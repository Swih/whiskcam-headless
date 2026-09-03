import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Track My Order",
    description:
      "Track your Whiskcam order in real-time. Enter your tracking number to see delivery status and estimated arrival.",
    alternates: alternatesFor("/track", locale),
    openGraph: {
      title: "Track My Order — Whiskcam",
      description: "Track your Whiskcam delivery in real-time.",
      url: alternatesFor("/track", locale).canonical,
      siteName: "Whiskcam",
      type: "website",
    },
    robots: {
      index: false, // No need to index a tracking page
    },
  };
}

export default async function TrackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return children;
}
