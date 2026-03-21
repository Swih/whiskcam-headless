import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track My Order",
  description:
    "Track your Whiskcam order in real-time. Enter your tracking number to see delivery status and estimated arrival.",
  alternates: {
    canonical: "https://whiskcam.com/track",
  },
  openGraph: {
    title: "Track My Order — Whiskcam",
    description: "Track your Whiskcam delivery in real-time.",
    url: "https://whiskcam.com/track",
    siteName: "Whiskcam",
    type: "website",
  },
  robots: {
    index: false, // No need to index a tracking page
  },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
