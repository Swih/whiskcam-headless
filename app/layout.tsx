import { ReactNode } from "react";

// Root layout — minimal shell. All locale-specific logic is in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
