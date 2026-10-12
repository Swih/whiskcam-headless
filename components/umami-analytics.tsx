"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BLOG_ARTICLES } from "lib/blog";
import { configureUmamiPages, syncUmami } from "lib/umami";

export function UmamiAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    configureUmamiPages(BLOG_ARTICLES.map((article) => article.slug));
    syncUmami();
    const changed = () => syncUmami();
    const storage = (event: StorageEvent) => {
      if (event.key === "wk-cookie-consent") syncUmami();
    };
    window.addEventListener("wk-consent-update", changed);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener("wk-consent-update", changed);
      window.removeEventListener("storage", storage);
    };
  }, [pathname]);
  return null;
}
