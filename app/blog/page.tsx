import { BLOG_ARTICLES } from "lib/blog";
import Footer from "components/layout/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, comparisons, and tips about cat collar cameras, pet safety, and capturing your pet's secret adventures.",
  keywords: ["cat collar camera", "pet camera guide", "cat camera comparison", "Whiskcam blog"],
  alternates: {
    canonical: "https://whiskcam.com/blog",
    languages: {
      en: "https://whiskcam.com/blog",
      fr: "https://whiskcam.com/blog",
      "x-default": "https://whiskcam.com/blog",
    },
  },
  openGraph: {
    title: "Blog — Whiskcam",
    description:
      "Guides, comparisons, and tips about cat collar cameras, pet safety, and capturing your pet's secret adventures.",
    url: "https://whiskcam.com/blog",
    siteName: "Whiskcam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog — Whiskcam",
    description:
      "Guides and comparisons about cat collar cameras.",
  },
};

export default function BlogIndex() {
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

      <div className="mx-auto max-w-4xl px-5 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black md:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-neutral-600">
          Guides, comparisons, and everything you need to know about cat collar cameras.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl border border-neutral-200 p-6 transition-all hover:border-wk-amber hover:shadow-md"
            >
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
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{article.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
