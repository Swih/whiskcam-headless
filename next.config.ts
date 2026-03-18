import type { NextConfig } from "next";

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
  async rewrites() {
    const shopifyDomain =
      process.env.SHOPIFY_STORE_DOMAIN || "d1gegp-cw.myshopify.com";
    return [
      {
        // Proxy Shopify checkout URLs to the actual Shopify domain
        source: "/cart/:path*",
        destination: `https://${shopifyDomain}/cart/:path*`,
      },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://connect.facebook.net https://analytics.tiktok.com https://*.tiktok.com",
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

export default config;
