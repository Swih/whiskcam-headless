import { BLOG_ARTICLES } from "lib/blog";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

export const revalidate = 3600;

const locales = ["en", "fr", "de", "es"] as const;

// Routes explicitly excluded from the sitemap (noindex'd pages, redirects, thin pages, auth'd pages).
// Keeping these out avoids GSC "page redirected" / "crawled not indexed" alerts.
const EXCLUDED_SHOPIFY_PAGE_HANDLES = new Set<string>([
  // Pages that are better served from static routes with full canonical/hreflang support.
  // Shopify-managed CMS pages are accessed via `/[page]` but lack canonicals, which
  // creates duplicate-content signals. List them here if they exist in the Shopify store.
]);

function localizedUrl(path: string, locale: string): string {
  if (locale === "en") return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
}

function withHreflang(
  path: string,
  lastModified: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedUrl(path, locale);
  }
  languages["x-default"] = localizedUrl(path, "en");

  return {
    url: localizedUrl(path, "en"),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // Static routes — priorities reflect importance (homepage > blog > policies).
  // `/track` is noindex'd at the page level and is therefore NOT listed here.
  // `/product/[handle]` is a 301 redirect to `/` and is therefore NOT listed here.
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/what-is-whiskcam", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/policies/shipping", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/policies/returns", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/policies/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/policies/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((r) => withHreflang(r.path, now, r.priority, r.changeFrequency));

  const blogRoutes = BLOG_ARTICLES.map((article) =>
    withHreflang(`/blog/${article.slug}`, article.dateModified, 0.7, "monthly"),
  );

  // NOTE: Shopify dynamic routes (collections, products, CMS pages) are intentionally
  // NOT listed in the sitemap for the following reasons:
  //   - /product/[handle] issues a 301 redirect to "/" (single-product storefront design)
  //   - /[page] Shopify CMS routes currently lack canonical + hreflang metadata
  //   - /collections/* are not a front-of-house route on this single-product store
  // Re-add them here only if their respective route handlers gain proper canonicals
  // and their content is unique enough to be indexed.
  void EXCLUDED_SHOPIFY_PAGE_HANDLES;

  return [...staticRoutes, ...blogRoutes];
}
