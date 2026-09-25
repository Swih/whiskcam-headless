import { ReactNode } from "react";
import type { Metadata } from "next";
import { baseUrl } from "lib/utils";

export const metadata: Metadata = { metadataBase: new URL(baseUrl) };

// Root layout — minimal shell. All locale-specific logic is in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
