import { getArticle, getAllSlugs, BLOG_ARTICLES } from "lib/blog";
import Footer from "components/layout/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Article content components — lazy loaded per slug
const articleComponents: Record<string, React.ComponentType> = {
  "best-cat-collar-cameras-2026": dynamic(
    () => import("lib/blog/best-cat-collar-cameras-2026"),
  ),
  "are-cat-collar-cameras-safe": dynamic(
    () => import("lib/blog/are-cat-collar-cameras-safe"),
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      siteName: "Whiskcam",
      locale: "en_US",
      alternateLocale: ["fr_FR"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `https://whiskcam.com/blog/${slug}`,
      languages: {
        en: `https://whiskcam.com/blog/${slug}`,
        fr: `https://whiskcam.com/blog/${slug}`,
        "x-default": `https://whiskcam.com/blog/${slug}`,
      },
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const ArticleContent = articleComponents[slug];
  if (!ArticleContent) notFound();

  // Related articles (exclude current)
  const related = BLOG_ARTICLES.filter((a) => a.slug !== slug);

  // JSON-LD: Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: "Whiskcam",
      url: "https://whiskcam.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Whiskcam",
      url: "https://whiskcam.com",
      logo: {
        "@type": "ImageObject",
        url: "https://whiskcam.com/images/logos/whiskcam-logo-icon.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whiskcam.com/blog/${slug}`,
    },
    image: article.image
      ? `https://whiskcam.com${article.image}`
      : "https://whiskcam.com/images/logos/whiskcam-logo-icon.webp",
  };

  // JSON-LD: BreadcrumbList
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://whiskcam.com/blog/${slug}`,
      },
    ],
  };

  // JSON-LD: HowTo (only for the comparatif article)
  const howToJsonLd =
    slug === "best-cat-collar-cameras-2026"
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Set Up a Cat Collar Camera",
          description:
            "Step-by-step guide to setting up a collar camera on your cat for the first time.",
          step: [
            {
              "@type": "HowToStep",
              name: "Charge the camera",
              text: "Charge the camera fully using the included USB-C cable. Most cameras charge in under 1 hour.",
            },
            {
              "@type": "HowToStep",
              name: "Insert the MicroSD card",
              text: "Insert the MicroSD card if not pre-installed. Format it first on your computer if it's new.",
            },
            {
              "@type": "HowToStep",
              name: "Attach to collar",
              text: "Attach the camera to your cat's collar. Use a breakaway collar for outdoor cats.",
            },
            {
              "@type": "HowToStep",
              name: "Test indoors",
              text: "Let your cat wear it inside for 15-30 minutes. Watch for signs of discomfort.",
            },
            {
              "@type": "HowToStep",
              name: "Record",
              text: "Press record and let your cat explore. When they return, remove the SD card and view the footage.",
            },
          ],
        }
      : null;

  // JSON-LD: FAQPage (for articles with FAQ sections)
  const faqItems: { question: string; answer: string }[] = [];
  if (slug === "best-cat-collar-cameras-2026") {
    faqItems.push(
      {
        question: "How heavy should a cat collar camera be?",
        answer:
          "Under 30 g is ideal for most cats. The veterinary guideline is that wearables should weigh less than 3-5% of body weight. For a 4 kg cat, that's a maximum of 120-200 g.",
      },
      {
        question: "Do cat collar cameras have WiFi or live streaming?",
        answer:
          "Most dedicated collar cameras do not have WiFi or live streaming. They record to an SD card that you retrieve later, which keeps them lighter and simpler.",
      },
      {
        question: "Cat collar camera vs GoPro — which is better for cats?",
        answer:
          "A dedicated collar camera. A GoPro weighs 154 g vs 26-38 g for collar cameras, costs $350+ vs $50-70, and the video quality difference is irrelevant on social media.",
      },
      {
        question: "How much storage do I need for a cat collar camera?",
        answer:
          "At 1080P, most collar cameras use approximately 1-2 GB per 10 minutes. A 32 GB card gives you roughly 3-5 hours of footage.",
      },
    );
  }
  if (slug === "are-cat-collar-cameras-safe") {
    faqItems.push(
      {
        question: "Can a collar camera hurt my cat's neck?",
        answer:
          "Not if the camera is under 40 g and the collar fits properly. The collar should allow two fingers between it and your cat's neck.",
      },
      {
        question: "Can the camera overheat on my cat?",
        answer:
          "Dedicated collar cameras are designed for the heat generated during recording. They don't get hot enough to burn. Always remove for charging.",
      },
      {
        question: "Is it legal to record with a cat collar camera?",
        answer:
          "In most countries, recording video in public spaces is legal. Audio recording laws vary. Since collar cameras capture outdoor adventures, this is rarely an issue.",
      },
    );
  }

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Article */}
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-16 md:pt-40">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-wk-amber">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-wk-amber">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-600">{article.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-wk-amber/10 px-3 py-1 text-xs font-medium text-wk-amber"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-wk-black md:text-4xl lg:text-[42px]">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-neutral-400">
            <span>By {article.author}</span>
            <span>&middot;</span>
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
        </header>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none prose-headings:text-wk-black prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-lg prose-a:text-wk-amber prose-a:no-underline hover:prose-a:underline prose-strong:text-wk-black prose-table:text-sm prose-th:bg-neutral-50 prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-t prose-img:rounded-xl">
          <ArticleContent />
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-wk-dark p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-white">Ready to see their world?</h2>
          <p className="mt-3 text-neutral-400">
            The Whiskcam Original — 26 g, 1080P, no app needed. Free worldwide shipping.
          </p>
          <Link
            href="/#product"
            className="mt-6 inline-block rounded-full bg-wk-amber px-8 py-3 text-sm font-semibold text-wk-dark transition-colors hover:bg-wk-amber-hover"
          >
            Shop Whiskcam — &euro;49.90
          </Link>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-wk-black">Related Articles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group rounded-xl border border-neutral-200 p-5 transition-all hover:border-wk-amber"
                >
                  <h3 className="font-bold text-wk-black group-hover:text-wk-amber">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                    {a.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
