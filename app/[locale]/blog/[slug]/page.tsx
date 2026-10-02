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
import { LEGAL_FAQS } from "lib/blog/legal-facts";

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
  "is-it-legal-to-put-a-camera-on-your-cat": dynamic(
    () => import("lib/blog/is-it-legal-to-put-a-camera-on-your-cat"),
  ),
};

// Unknown slugs must be a real 404, not a 200 shell with a streamed notFound().
export const dynamicParams = false;

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
  if (slug === "is-it-legal-to-put-a-camera-on-your-cat")
    faqItems.push(...LEGAL_FAQS);
  if (slug === "what-cats-do-when-alone-at-home") {
    faqItems.push(
      {
        question: "Do cats get lonely when home alone all day?",
        answer:
          "Some do. Many adult cats cope with a normal working day if their needs are met, but cats closely bonded to their owners can show separation-related problems. Signs include excessive vocalisation, restlessness, changes in appetite, hiding and toileting outside the tray. Check with your vet if you notice them.",
      },
      {
        question: "Is it cruel to leave a cat alone for a full workday?",
        answer:
          "Not usually, if the basics are covered: food, fresh water, a clean litter tray, safe toys, and places to hide and perch. Cats Protection says most adult cats can occasionally be left for up to 12 hours. Kittens, and cats with health conditions, need more frequent care.",
      },
      {
        question: "Will a cat destroy the house when bored?",
        answer:
          "It can happen. Cats Protection lists damage to furniture among the possible effects of boredom, and destructive behaviour was among the problems owners most often reported in the 2020 separation-related problems study. Enrichment, play before you leave and puzzle feeders are sensible first steps. Recordings can help you see when it happens.",
      },
      {
        question: "Do cats really sleep all day?",
        answer:
          "Cats often nap for 12 to 16 hours a day, but in short bursts spread across the day and night. They are most active around dawn and dusk, so a quiet midday while you are out is normal.",
      },
      {
        question: "Can I see what my cat does without a camera?",
        answer:
          "Partially. Activity trackers show when a cat moves but not what it does. Fixed pet cameras show one room. Collar cameras follow the cat but add weight to the collar. Each approach has trade-offs.",
      },
    );
  }
  if (slug === "cat-collar-weight-chart-by-size") faqItems.push(...WEIGHT_FAQS);
  if (slug === "5-weird-discoveries-from-cat-collar-cameras") {
    faqItems.push(
      {
        question: "Do all outdoor cats have a second home?",
        answer:
          "No, and there is no reliable figure for how many do. GPS research shows most pet cats stay within about 100 m of home, so neighbouring gardens are often part of their range. A cat that is regularly fed or sheltered by a neighbour is a common story, but how often it happens is unknown.",
      },
      {
        question:
          "Is it ethical to film a cat going into a neighbor's property?",
        answer:
          "Rules on recording, especially audio, differ by country and region, so check what applies where you live. Out of respect, tell a neighbour if your cat regularly goes into their home or enclosed garden. Don't publish footage of the inside of someone else's home without their permission.",
      },
      {
        question: "How often should I review footage to spot patterns?",
        answer:
          "There is no set rule. Many owners find a weekly review easier than checking every clip daily. Cats tend to follow routines, so writing down rest spots, routes and encounters in a simple log makes repeated patterns easier to see.",
      },
      {
        question: "Can short recording sessions reveal cat behavior patterns?",
        answer:
          "Yes, if you repeat them. One short clip shows a moment, not a pattern. Several short sessions at similar times of day, over a few weeks, will show what repeats. Short sessions also let you check that your cat tolerates the collar and camera.",
      },
    );
  }
  if (slug === "cat-pov-tiktok-viral-guide-2026") {
    faqItems.push(
      {
        question: "Can any cat be a viral TikTok cat?",
        answer:
          "Not necessarily. Temperament matters more than looks. A calm, curious cat who accepts a collar and explores will give you more to work with than a cat who is anxious about it. Some cats never accept a camera, and many will mostly record sleeping. If your cat dislikes the camera, don't force it.",
      },
      {
        question: "Do I need 4K to go viral?",
        answer:
          "No. 1080P is enough for vertical social video, and platforms compress uploads anyway. What makes a clip work is the moment you choose, the pace of the edit and the sound. Higher resolution gives you more room to crop, but it is not what makes a video spread.",
      },
      {
        question: "What camera do the big cat POV accounts use?",
        answer:
          "It varies, and setups change over time. Some creators mention their gear in their own videos or profiles. Check those directly instead of relying on second-hand lists. Better gear usually follows a format that already works. It doesn't create one.",
      },
      {
        question: "How many views is considered viral for a cat video?",
        answer:
          "There is no official threshold. A practical definition is a video that reaches far beyond your usual audience, measured against your own average. For a new account that might be a few thousand views. For an established one it could be many times more.",
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
          "Less than most owners think. In the Cat Tracker study of 925 pet cats, the average home range was about 3.6 ha, and most cats stayed within roughly 100 m of home. Only three ranged over more than 1 km². Older cats roamed less. Males, unneutered cats and rural cats tended to range further.",
      },
      {
        question: "Where does my cat go at night?",
        answer:
          "It depends on the cat. Cats are most active around dawn and dusk, and many outdoor cats stay within a few gardens of home. If your cat is out overnight, the best way to find out is to track or record them, and there is no reliable universal pattern. Keeping cats in at night is a choice many owners make for safety.",
      },
      {
        question: "Should I keep my cat indoors to limit roaming?",
        answer:
          "That's a personal decision with legitimate arguments on both sides. Outdoor access brings risks from traffic, fights and getting lost, and outdoor cats affect local wildlife. It also gives cats stimulation that is hard to replicate indoors. A catio, harness walks or supervised garden time can be a middle ground.",
      },
      {
        question: "Can I know where my cat goes without a GPS?",
        answer:
          "Partially, yes. A collar camera gives you behaviour and recognisable landmarks, even without exact coordinates. Combined with asking neighbours and checking common cat routes like fence tops and hedges, you can often piece together the rough territory over a few weeks.",
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
