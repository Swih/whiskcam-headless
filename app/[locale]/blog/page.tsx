import { BLOG_ARTICLES } from "lib/blog";
import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Cat Collar Camera Guides: Safety, Weight Limits & Comparisons",
    description:
      "13 tested guides on cat collar cameras: which models we tried, safe weight limits by cat size, playing AVI footage on an iPhone, and what the footage actually shows.",
    keywords: [
      "cat collar camera",
      "pet camera guide",
      "cat camera comparison",
      "Whiskcam blog",
    ],
    alternates: alternatesFor("/blog", locale),
    openGraph: {
      title: "Cat Collar Camera Guides — Whiskcam",
      description:
        "13 tested guides on cat collar cameras: models compared, safe weight limits by cat size, and what collar footage actually reveals.",
      url: alternatesFor("/blog", locale).canonical,
      siteName: "Whiskcam",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Cat Collar Camera Guides — Whiskcam",
      description: "13 tested guides: models compared, safe weight limits, and what the footage shows.",
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whiskcam.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://whiskcam.com/blog",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div lang="en" className="mx-auto max-w-4xl px-5 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black md:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-neutral-600">
          Guides, comparisons, and everything you need to know about cat collar
          cameras.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-wk-amber hover:shadow-md"
            >
              {article.image && (
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-wk-amber/10 px-3 py-1 text-xs font-medium text-wk-amber"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-bold text-wk-black group-hover:text-wk-amber">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                  <time dateTime={article.datePublished}>
                    {new Date(article.datePublished).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </time>
                  <span>&middot;</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
