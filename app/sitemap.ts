import { getCollections, getPages, getProducts } from "lib/shopify";
import { BLOG_ARTICLES } from "lib/blog";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Blog articles
  const blogRoutes = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.dateModified,
  }));

  let fetchedRoutes: { url: string; lastModified: string }[] = [];

  try {
    const [collections, products, pages] = await Promise.all([
      getCollections(),
      getProducts({}),
      getPages(),
    ]);

    fetchedRoutes = [
      ...collections.map((c) => ({ url: `${baseUrl}${c.path}`, lastModified: c.updatedAt })),
      ...products.map((p) => ({ url: `${baseUrl}/product/${p.handle}`, lastModified: p.updatedAt })),
      ...pages.map((p) => ({ url: `${baseUrl}/${p.handle}`, lastModified: p.updatedAt })),
    ];
  } catch {
    // Shopify not configured — return static routes only
  }

  return [...routesMap, ...blogRoutes, ...fetchedRoutes];
}
