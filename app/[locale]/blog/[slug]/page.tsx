import { getArticle, getAllSlugs, getRelatedArticles } from "lib/blog";
import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import CanonicalLink from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";
import {
  ORG_ID,
  WEBSITE_ID,
  organizationSchema,
  websiteSchema,
} from "lib/schema";
import { baseUrl } from "lib/utils";
import { CAMERA_OPTIONS, COMPARISON_FAQS } from "lib/blog/comparison-facts";
import { BlogProductLink } from "components/blog/product-link";
import { SAFETY_FAQS, WEIGHT_FAQS } from "lib/blog/safety-facts";

// Article content components — lazy loaded per slug
const articleComponents: Record<string, React.ComponentType> = {
  "mr-petcam-vs-whiskcam": dynamic(
    () => import("lib/blog/mr-petcam-vs-whiskcam"),
  ),
  "best-cat-collar-cameras-2026": dynamic(
    () => import("lib/blog/best-cat-collar-cameras-2026"),
  ),
  "are-cat-collar-cameras-safe": dynamic(
    () => import("lib/blog/are-cat-collar-cameras-safe"),
  ),
  "what-cats-do-when-alone-at-home": dynamic(
    () => import("lib/blog/what-cats-do-when-alone-at-home"),
  ),
  "how-to-watch-avi-on-iphone-cat-cam": dynamic(
    () => import("lib/blog/how-to-watch-avi-on-iphone-cat-cam"),
  ),
  "cat-collar-weight-chart-by-size": dynamic(
    () => import("lib/blog/cat-collar-weight-chart-by-size"),
  ),
  "i-filmed-my-cat-for-7-days-what-i-learned": dynamic(
    () => import("lib/blog/i-filmed-my-cat-for-7-days-what-i-learned"),
  ),
  "5-weird-discoveries-from-cat-collar-cameras": dynamic(
    () => import("lib/blog/5-weird-discoveries-from-cat-collar-cameras"),
  ),
  "cat-collar-camera-vs-insta360-go-3": dynamic(
    () => import("lib/blog/cat-collar-camera-vs-insta360-go-3"),
  ),
  "cat-pov-tiktok-viral-guide-2026": dynamic(
    () => import("lib/blog/cat-pov-tiktok-viral-guide-2026"),
  ),
  "cat-collar-camera-vs-gps-tracker-2026": dynamic(
    () => import("lib/blog/cat-collar-camera-vs-gps-tracker-2026"),
  ),
  "my-cat-found-the-camera-what-to-do": dynamic(
    () => import("lib/blog/my-cat-found-the-camera-what-to-do"),
  ),
  "best-cat-collar-camera-for-maine-coon": dynamic(
    () => import("lib/blog/best-cat-collar-camera-for-maine-coon"),
  ),
  "where-does-my-outdoor-cat-actually-go": dynamic(
    () => import("lib/blog/where-does-my-outdoor-cat-actually-go"),
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const articleImage = article.image
    ? `https://whiskcam.com${article.image}`
    : "https://whiskcam.com/images/logos/whiskcam-logo-icon.webp";

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      url: alternatesFor(`/blog/${slug}`, locale).canonical,
      title: article.title,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      siteName: "Whiskcam",
      locale: "en_US",
      images: [
        {
          url: articleImage,
          width: 1536,
          height: 864,
          alt: article.imageAlt ?? article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [articleImage],
    },
    alternates: alternatesFor(`/blog/${slug}`, locale),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const ArticleContent = articleComponents[slug];
  if (!ArticleContent) notFound();

  // Related articles (exclude current)
  const related = getRelatedArticles(slug);

  const canonical = alternatesFor(`/blog/${slug}`, locale).canonical;
  const articleImage = article.image
    ? `${baseUrl}${article.image}`
    : `${baseUrl}/images/logos/whiskcam-logo-icon.webp`;

  // JSON-LD: Article, wired into the site-wide entity graph so the publisher
  // resolves to the same Organization the homepage declares rather than a
  // look-alike copy per article.
  const articleJsonLd = {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "en",
    keywords: article.tags.join(", "),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    image: {
      "@type": "ImageObject",
      url: articleImage,
      width: 1536,
      height: 864,
    },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };

  // The two updated comparisons share exactly the visible FAQ text.
  const faqItems: { question: string; answer: string }[] =
    slug in COMPARISON_FAQS
      ? [...COMPARISON_FAQS[slug as keyof typeof COMPARISON_FAQS]]
      : [];
  if (slug === "are-cat-collar-cameras-safe") faqItems.push(...SAFETY_FAQS);
  if (slug === "what-cats-do-when-alone-at-home") {
    faqItems.push(
      {
        question: "Do cats get lonely when home alone all day?",
        answer:
          "Most adult cats tolerate 8-10 hours alone without stress signals. Kittens under 6 months and older cats with health conditions need shorter gaps. Signs of loneliness include excessive vocalization, over-grooming, and door-sitting with no other activity.",
      },
      {
        question: "Is it cruel to leave a cat alone for a full workday?",
        answer:
          "No, provided basic needs are met: fresh water, food access, clean litter, environmental enrichment like windows and hiding spots. Camera footage shows well-provided cats handling 8-9 hour gaps calmly.",
      },
      {
        question: "Do cats sleep all day really?",
        answer:
          "No. The '16 hours a day' figure averages over 24 hours including night. Daytime alone-time sleep is 40-45%, not 70-80%. The rest is quiet activity owners rarely observe.",
      },
      {
        question: "Will a cat destroy the house when bored?",
        answer:
          "Boredom-driven destruction is rarer than people think. Chewing and scratching peaks typically happen within 30 minutes of the owner's return — suggesting frustration at absence ending, not boredom during it.",
      },
    );
  }
  if (slug === "cat-collar-weight-chart-by-size") faqItems.push(...WEIGHT_FAQS);
  if (slug === "5-weird-discoveries-from-cat-collar-cameras") {
    faqItems.push(
      {
        question: "Do all outdoor cats have a second home?",
        answer:
          "Most don't. Informal surveys of collar camera footage in dense urban and suburban neighborhoods suggest 20-25% of outdoor cats have a consistent secondary feeder or resting spot. Rural cats with more spread-out human populations are less likely to develop this pattern. Indoor-only cats don't have one at all.",
      },
      {
        question:
          "Is it ethical to film a cat going into a neighbor's property?",
        answer:
          "Video recording in publicly visible spaces is generally legal in most jurisdictions. Audio recording rules are stricter and vary by country. If your cat regularly enters a neighbor's enclosed space, the respectful move is to mention it before reviewing extended footage. Most people find it funny rather than invasive.",
      },
      {
        question:
          "How often should I review cat camera footage to spot patterns?",
        answer:
          "Once a week is plenty. Patterns show up quickly because cats are deeply routine-driven — same nap spots, same walking routes, same social encounters at similar times. Daily review produces fatigue without extra insight. A weekly hour at 4x playback speed catches almost everything.",
      },
      {
        question: "Can short recording sessions reveal cat behavior patterns?",
        answer:
          "Not reliably. Most interesting patterns need at least 3-4 hours of continuous recording to become visible. Short 20-minute sessions catch isolated moments, not patterns. Consistency over weeks beats individual clip length, which beats resolution — in that order of importance.",
      },
    );
  }
  if (slug === "cat-pov-tiktok-viral-guide-2026") {
    faqItems.push(
      {
        question: "Can any cat be a viral TikTok cat?",
        answer:
          "Honestly, no. Temperament matters more than looks. A calm, curious cat who tolerates a collar and explores actively will outperform a gorgeous-but-anxious cat every time. About 1 in 10 cats refuses the camera entirely, and another 20-30% will tolerate it but won't give you interesting footage because their baseline behavior is too sedentary.",
      },
      {
        question: "Do I need 4K to go viral on TikTok with cat POV?",
        answer:
          "No. 1080p is more than enough for TikTok, which compresses everything anyway. The visible quality difference between a $50 1080p collar camera and a $400 4K rig disappears almost entirely after TikTok's upload pipeline. Viral clips are made by moment selection, edit pace, and audio choice — not resolution.",
      },
      {
        question: "What camera does Mr. Kitters use?",
        answer:
          "Publicly, he uses an Insta360 Go 3 paired with a Furee harness — both mentioned in several of his own behind-the-scenes clips. Together around $450. Worth noting: he started the account on a much cheaper setup and only upgraded after his format was already working. The gear is a consequence of his growth, not the cause.",
      },
      {
        question: "How many views is considered viral for a cat video?",
        answer:
          "In 2026: 100,000 views is a genuine hit — your video broke out of your usual audience. 1 million views is viral by any reasonable definition. 10 million and up is top-tier cat content for the year. Most accounts spend weeks or months in the 500-5,000 view range before the first 100k-plus clip lands.",
      },
    );
  }
  if (slug === "my-cat-found-the-camera-what-to-do") {
    faqItems.push(
      {
        question: "Why does my cat attack the pet camera?",
        answer:
          "It's almost always curiosity, not aggression. Your cat detects a small object that emits a faint whine, sometimes moves on its own, and gives off a low-level heat signature — every one of those triggers an investigative swat. Ears forward and a relaxed tail mean exploration. The behavior typically fades within one to three weeks of habituation.",
      },
      {
        question: "Can my cat hear the pet camera when I can't?",
        answer:
          "Yes. Most consumer pet cameras emit a high-frequency whine in the 15-22 kHz range from their power supply and internal components. Human hearing typically stops around 16-17 kHz. Cat hearing extends to roughly 65 kHz. From their ears, the camera is quietly chirping all day — one of the main reasons cats notice a camera you thought was silent.",
      },
      {
        question: "Should I hide my pet camera from my cat?",
        answer:
          "No. Hiding it extends the discovery phase — cats are systematically curious about concealed objects in their territory, so a hidden camera becomes a higher-priority investigation target, not a lower one. Leave it visible, let them inspect fully on day one, and let habituation run. Ignored visibility beats imperfect concealment.",
      },
      {
        question: "Do collar cameras have the same discovery problem?",
        answer:
          "No. A collar camera is worn by the cat, which means there is no external object in the room to discover, swat, or avoid. Once the cat has habituated to the collar itself — usually a few days — the camera stops registering as a separate thing. Households with an anti-camera cat often switch to collar cameras for exactly this reason.",
      },
    );
  }
  if (slug === "where-does-my-outdoor-cat-actually-go") {
    faqItems.push(
      {
        question: "How far do outdoor cats typically roam?",
        answer:
          "Median daily range across the major GPS studies sits between 40 and 200 m from home, with most cats keeping roughly 80% of their outdoor time inside a 100 m radius. Intact males roam 2-3x further than females, and suburban cats range further than urban ones. Ranges over 500 m are uncommon.",
      },
      {
        question: "Where does my cat go at night?",
        answer:
          "If your cat comes home to sleep, almost nowhere — most indoor-nighters are inactive from roughly 22:00 to 04:00. Cats that stay outside overnight often cover their widest ground between 03:00 and 05:00, with the most frequent activity being social encounters with other neighborhood cats on shared walls, paths, and garden boundaries.",
      },
      {
        question: "Should I keep my cat indoors to limit roaming?",
        answer:
          "That's a personal decision with legitimate arguments on both sides. Indoor-only cats live longer on average and face fewer road, predator, and fight risks. Outdoor access provides mental stimulation hard to replicate indoors. A middle-ground option — catio, harness walks, or supervised garden — preserves most enrichment without the risk.",
      },
      {
        question: "Can I know where my cat goes without a GPS?",
        answer:
          "Partially, yes. A collar camera gives rich behavioral context and identifiable landmarks, even without exact coordinates. Combined with neighborhood observation — asking neighbors, checking common cat corridors like fence tops and hedges — you can usually reconstruct the rough territory in a couple of weeks without paying for GPS subscriptions.",
      },
    );
  }

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          inLanguage: "en",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const itemListJsonLd =
    slug === "best-cat-collar-cameras-2026"
      ? {
          "@type": "ItemList",
          "@id": `${canonical}#comparison`,
          name: "Cat collar camera options compared",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: CAMERA_OPTIONS.length,
          itemListElement: CAMERA_OPTIONS.map(({ name, anchor }, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            url: `${canonical}#${anchor}`,
          })),
        }
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      articleJsonLd,
      breadcrumbJsonLd,
      ...(faqJsonLd ? [faqJsonLd] : []),
      ...(itemListJsonLd ? [itemListJsonLd] : []),
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article */}
      <div lang="en" className="mx-auto max-w-3xl px-5 pt-32 pb-16 md:pt-40">
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
              <CanonicalLink href="/blog" className="hover:text-wk-amber">
                Blog
              </CanonicalLink>
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
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
            <span>By {article.author}</span>
            <span>&middot;</span>
            <time dateTime={article.datePublished}>
              {new Date(article.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {/* Freshness belongs in the byline, not only in the footer. On a
                "best X 2026" query the update date is half the reason to click. */}
            {article.dateModified !== article.datePublished && (
              <>
                <span>&middot;</span>
                <time
                  dateTime={article.dateModified}
                  className="font-medium text-wk-amber"
                >
                  Updated{" "}
                  {new Date(article.dateModified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
            <span>&middot;</span>
            <span>{article.readingTime}</span>
          </div>
        </header>

        {article.image && (
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={article.image}
              alt={article.imageAlt ?? article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none prose-headings:scroll-mt-28 prose-headings:text-wk-black prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-lg prose-a:text-wk-amber prose-a:no-underline hover:prose-a:underline prose-strong:text-wk-black prose-table:text-sm prose-th:bg-neutral-50 prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-t prose-img:rounded-xl">
          <ArticleContent />
        </div>

        {/* Author Bio — E-E-A-T signal */}
        <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-wk-amber/15 text-lg font-bold text-wk-amber">
              W
            </div>
            <div>
              <p className="text-sm font-semibold text-wk-black">
                Written by the Whiskcam Team
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                We publish guides about choosing and using collar cameras.
                Whiskcam sells a camera featured in our comparisons;
                manufacturer specifications and any documented hands-on
                observations should be read separately. For product questions or
                corrections, contact{" "}
                <a
                  href="mailto:support@whiskcam.com"
                  className="font-medium text-wk-amber hover:underline"
                >
                  support@whiskcam.com
                </a>
                .
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
                <time dateTime={article.dateModified}>
                  Last updated{" "}
                  {new Date(article.dateModified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-wk-dark p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-white">
            Ready to see their world?
          </h2>
          <p className="mt-3 text-neutral-400">
            Offline 1080P video with a phone adapter. MicroSD required
            separately. Check the current kit, price and delivery options.
          </p>
          <div className="mt-6">
            <BlogProductLink slug={slug} placement="article-footer">
              View Whiskcam kit and current price
            </BlogProductLink>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-16" aria-label="Related articles">
            <h2 className="text-xl font-bold text-wk-black">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <CanonicalLink
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
                </CanonicalLink>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
