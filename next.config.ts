import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const config: NextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/password",
        destination: "/",
        permanent: true,
      },
      // Single-product store: product and legacy Shopify theme URLs consolidate
      // on the homepage. Redirecting here returns a real 308; the page-level
      // permanentRedirect() was streamed after PPR's 200 shell.
      {
        source: "/:locale(fr|de|es)/product/:handle*",
        destination: "/:locale",
        permanent: true,
      },
      { source: "/product/:handle*", destination: "/", permanent: true },
      { source: "/products/:handle*", destination: "/", permanent: true },
      { source: "/collections/:path*", destination: "/", permanent: true },
      // English is unprefixed. next-intl answers /en/* with a 307; make the
      // legacy URLs (still in Google's index) permanent.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://connect.facebook.net https://analytics.tiktok.com https://*.tiktok.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.shopify.com https://www.google-analytics.com https://www.facebook.com https://*.clarity.ms https://analytics.tiktok.com https://*.tiktok.com",
              "font-src 'self' data:",
              "connect-src 'self' https://*.shopify.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://*.facebook.com https://analytics.tiktok.com https://*.tiktok.com https://*.tiktokapi.eu https://a.klaviyo.com",
              "media-src 'self' blob:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(config);
