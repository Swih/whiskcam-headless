import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

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
    alternates: {
      canonical: `https://whiskcam.com/${locale}/track`,
    },
    openGraph: {
      title: "Track My Order — Whiskcam",
      description: "Track your Whiskcam delivery in real-time.",
      url: `https://whiskcam.com/${locale}/track`,
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
