import { getCollections, getPages, getProducts } from "lib/shopify";
import { BLOG_ARTICLES } from "lib/blog";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

export const revalidate = 3600;

function withHreflang(url: string, lastModified: string) {
  return {
    url,
    lastModified,
    alternates: {
      languages: { en: url, fr: url },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/faq",
    "/track",
    "/what-is-whiskcam",
    "/blog",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
  ].map((route) =>
    withHreflang(`${baseUrl}${route}`, new Date().toISOString()),
  );

  const blogRoutes = BLOG_ARTICLES.map((article) =>
    withHreflang(`${baseUrl}/blog/${article.slug}`, article.dateModified),
  );

  let fetchedRoutes: ReturnType<typeof withHreflang>[] = [];

  try {
    const [collections, products, pages] = await Promise.all([
      getCollections(),
      getProducts({}),
      getPages(),
    ]);

    fetchedRoutes = [
      ...collections.map((c) => withHreflang(`${baseUrl}${c.path}`, c.updatedAt)),
      ...products.map((p) => withHreflang(`${baseUrl}/product/${p.handle}`, p.updatedAt)),
      ...pages.map((p) => withHreflang(`${baseUrl}/${p.handle}`, p.updatedAt)),
    ];
  } catch {
    // Shopify not configured — return static routes only
  }

  return [...staticRoutes, ...blogRoutes, ...fetchedRoutes];
}
