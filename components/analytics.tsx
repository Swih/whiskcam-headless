"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-D315FW4BML";
const CLARITY_ID = "vxtexd0crl";
const TIKTOK_PIXEL_ID = "D6TF923C77U1ODGOMAU0";
const CONSENT_KEY = "wk-cookie-consent";

/** Check if user accepted cookies */
function hasConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    if (raw === "accepted") return true;
    const data = JSON.parse(raw);
    return data?.accepted === true;
  } catch {
    return false;
  }
}

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(hasConsent());

    // Listen for consent changes (from CookieConsent component)
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) setConsent(hasConsent());
    };
    window.addEventListener("storage", onStorage);

    // Also listen for custom event (same-tab consent)
    const onConsent = () => setConsent(hasConsent());
    window.addEventListener("wk-consent-update", onConsent);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("wk-consent-update", onConsent);
    };
  }, []);

  if (!consent) return null;

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>

      {/* TikTok Pixel */}
      <Script id="tiktok-init" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('${TIKTOK_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>
    </>
  );
}

// ─── Tracking helpers (call from components) ───

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: (...args: unknown[]) => void; identify: (...args: unknown[]) => void };
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // GA4
  window.gtag?.("event", eventName, params);
  // Meta Pixel (when added)
  window.fbq?.("track", eventName, params);
  // TikTok Pixel (when added)
  window.ttq?.track(eventName, params);
}

export function trackViewContent(product: { name: string; price: string; currency: string }) {
  // GA4
  window.gtag?.("event", "view_item", {
    currency: product.currency,
    value: parseFloat(product.price),
    items: [{ item_name: product.name, price: parseFloat(product.price) }],
  });
  // Meta
  window.fbq?.("track", "ViewContent", {
    content_name: product.name,
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency,
  });
  // TikTok
  window.ttq?.track("ViewContent", {
    content_name: product.name,
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency,
  });
}

export function trackAddToCart(product: { name: string; price: string; currency: string; quantity: number }) {
  // GA4
  window.gtag?.("event", "add_to_cart", {
    currency: product.currency,
    value: parseFloat(product.price) * product.quantity,
    items: [{ item_name: product.name, price: parseFloat(product.price), quantity: product.quantity }],
  });
  // Meta
  window.fbq?.("track", "AddToCart", {
    content_name: product.name,
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency,
  });
  // TikTok
  window.ttq?.track("AddToCart", {
    content_name: product.name,
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency,
    quantity: product.quantity,
  });
}
