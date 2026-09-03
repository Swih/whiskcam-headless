import { BLOG_ARTICLES } from "lib/blog";
import { LOCALES, localizedUrl, sitemapLanguagesFor } from "lib/seo";
import { MetadataRoute } from "next";

export const revalidate = 3600;

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
};

// Static routes. Priorities reflect importance (homepage > pillar > blog > policies).
// `/track` is noindex at the page level and `/product/[handle]` 308-redirects to `/`,
// so neither belongs here.
const STATIC_ROUTES: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/what-is-whiskcam", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/policies/shipping", priority: 0.4, changeFrequency: "yearly" },
  { path: "/policies/returns", priority: 0.4, changeFrequency: "yearly" },
  { path: "/policies/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/terms", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Emit sitemap entries for one route.
 *
 * A translated route gets one entry per locale, each carrying the full reciprocal
 * hreflang cluster — that is what Google asks for and it is what the page's own
 * `alternates` now declares too.
 *
 * An English-only route gets a single unprefixed entry with no alternates. The
 * `/de`, `/es` and `/fr` copies still resolve (they are not redirected, so no
 * existing inbound link breaks) but they canonicalise back here instead of being
 * advertised as translations that do not exist.
 */
function entriesFor(route: Route, lastModified: string): MetadataRoute.Sitemap {
  const languages = sitemapLanguagesFor(route.path);
  const base = {
    lastModified: route.lastModified ?? lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  };

  if (!languages) {
    return [{ url: localizedUrl(route.path, "en"), ...base }];
  }

  return LOCALES.map((locale) => ({
    url: localizedUrl(route.path, locale),
    ...base,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.flatMap((route) => entriesFor(route, now));

  // Blog articles are English-only components, so each ships one canonical URL.
  const blogEntries = BLOG_ARTICLES.flatMap((article) =>
    entriesFor(
      {
        path: `/blog/${article.slug}`,
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: article.dateModified,
      },
      now,
    ),
  );

  // Shopify dynamic routes stay out on purpose: `/product/[handle]` 308-redirects
  // to `/`, there are no collection pages on a single-product store, and the
  // `/[page]` CMS route renders content this repo does not control.
  return [...staticEntries, ...blogEntries];
}
