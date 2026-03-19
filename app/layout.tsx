import { Analytics } from "components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { AnnouncementBar } from "components/layout/announcement-bar";
import { CartProvider } from "components/cart/cart-context";
import { CookieConsent } from "components/cookie-consent";
import { EmailPopup } from "components/email-popup";
import { Navbar } from "components/layout/navbar";
import { getCart, getProduct } from "lib/shopify";
import { computeDiscount, computeSavings } from "lib/format";
import { PRODUCT_HANDLE } from "lib/content";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Whiskcam — Pet Collar Camera | See Their World",
    template: "%s | Whiskcam",
  },
  description:
    "The lightweight pet collar camera that captures your cat or dog's secret adventures. 1080P Full HD, no app required. Free worldwide shipping.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    follow: true,
    index: true,
  },
  other: {
    "geo.region": "GLOBAL",
    "geo.placename": "Worldwide",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A1A1A",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const country = (await cookies()).get("country")?.value || "FR";
  const cart = getCart();
  const product = await getProduct(PRODUCT_HANDLE, country);
  const compareAt = product?.variants[0]?.compareAtPrice;
  const discount = compareAt
    ? computeDiscount(product!.priceRange.maxVariantPrice.amount, compareAt.amount)
    : 0;
  const savingsPerUnit = compareAt
    ? computeSavings(product!.priceRange.maxVariantPrice.amount, compareAt.amount)
    : 0;
  const currencyCode = product?.priceRange.maxVariantPrice.currencyCode || "EUR";

  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-white font-[family-name:var(--font-dm-sans)] text-wk-black antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-wk-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-wk-black">
          Skip to content
        </a>
        <CartProvider cartPromise={cart}>
          <AnnouncementBar discount={discount} />
          <Navbar savingsPerUnit={savingsPerUnit} currencyCode={currencyCode} />
          <main id="main-content" className="overflow-x-clip">{children}</main>
          <Toaster closeButton />
          <EmailPopup />
          <CookieConsent />
          <Analytics />
          <VercelAnalytics />
        </CartProvider>
      </body>
    </html>
  );
}
