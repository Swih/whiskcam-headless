import { getArticle, getAllSlugs, BLOG_ARTICLES } from "lib/blog";
import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";

// Article content components — lazy loaded per slug
const articleComponents: Record<string, React.ComponentType> = {
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
      canonical: `https://whiskcam.com/${locale}/blog/${slug}`,
      languages: {
        en: `https://whiskcam.com/en/blog/${slug}`,
        fr: `https://whiskcam.com/fr/blog/${slug}`,
        "x-default": `https://whiskcam.com/en/blog/${slug}`,
      },
    },
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
  if (slug === "how-to-watch-avi-on-iphone-cat-cam") {
    faqItems.push(
      {
        question: "Why won't my iPhone play AVI files from a cat camera?",
        answer:
          "iOS Photos only supports MOV, MP4 (H.264/HEVC), and M4V. AVI is a legacy container format Apple has never added native support for. You need a third-party app like VLC or a converter.",
      },
      {
        question: "What is the fastest way to watch cat camera AVI on iPhone?",
        answer:
          "Install VLC for Mobile (free). Plug the SD card via USB-C or Lightning reader, open Files, tap the AVI, share to VLC. Playback is instant without conversion.",
      },
      {
        question: "How do I post cat camera footage to TikTok from iPhone?",
        answer:
          "TikTok requires MP4. Play the AVI in VLC, use Share → Save to Photos (VLC converts automatically). Takes 20-30 seconds per 2-minute clip on a modern iPhone. Then upload to TikTok normally.",
      },
      {
        question: "Do all cat collar cameras use AVI?",
        answer:
          "No. Lower-cost cameras default to AVI for battery efficiency. Premium and newer models increasingly default to MP4. Check the camera's specs — MJPEG or AVI output both indicate AVI files.",
      },
    );
  }
  if (slug === "cat-collar-weight-chart-by-size") {
    faqItems.push(
      {
        question: "How heavy can a cat collar be?",
        answer:
          "A cat collar plus any attached device should weigh less than 3% of the cat's healthy body weight for daily use, and 5% maximum for short sessions. For a 4 kg adult cat, that's 120 g maximum all-day (60 g ideal). Most collar cameras weigh 20-40 g, leaving headroom for the collar and tags.",
      },
      {
        question: "What is the maximum collar weight for a small cat?",
        answer:
          "For a 3 kg small adult cat, the 3% daily limit is 90 g total, and the 5% short-session limit is 150 g. A 26 g camera plus a 10 g nylon breakaway collar comes to 36 g — 1.2% of body weight. Avoid stacking heavy accessories past 90 g combined.",
      },
      {
        question: "Is 40 grams too heavy for a cat?",
        answer:
          "No, not for a healthy adult cat over roughly 2.5 kg. 40 g on a 3 kg cat is 1.33% of body weight, well under the 3% daily threshold. For cats under 2.5 kg or kittens, stick to cameras under 30 g and keep sessions short. Always include the collar weight in your total.",
      },
      {
        question: "Can kittens wear collar cameras?",
        answer:
          "Not safely under 2 kg or under 6 months old. Kittens are still developing their cervical spine and neck muscles, and even a light 26 g camera represents a disproportionate load on a growing skeleton. Wait until the kitten is at least 6 months old and reliably over 2 kg.",
      },
    );
  }
  if (slug === "i-filmed-my-cat-for-7-days-what-i-learned") {
    faqItems.push(
      {
        question: "Did the camera bother your cat?",
        answer:
          "Barely. About 20 minutes of mild irritation on the first day — a couple of scratches, one head-shake — then she ignored it. By day 3 she didn't react at all when the camera was clipped on. A cat already used to a breakaway collar adapts much faster than one that has never worn anything around the neck.",
      },
      {
        question: "What battery life did you actually get from a cat collar camera?",
        answer:
          "About 90-120 minutes per session in practice, slightly less than the manufacturer spec. Cold weather shortens it further. The camera warms up slightly during long recordings, which is normal. Plan for roughly two hours per full charge in real-world use.",
      },
      {
        question: "Can you use a collar camera at night?",
        answer:
          "Daylight-first cameras without true night vision produce grainy but workable footage in rooms with ambient light from streetlamps or a hallway. Fully pitch-dark rooms are essentially unusable. If night footage matters, buy a model with an actual infrared sensor, not a standard daytime camera.",
      },
      {
        question: "Is a 7-day experiment enough to learn your cat's routine?",
        answer:
          "Seven days is enough to spot the main recurring patterns — sleep spots, favorite routes, social encounters. Rare behaviors (monthly patterns, weather-dependent routines) need longer. For most owners, one week of recording gives 90% of the interesting insights that a month would.",
      },
    );
  }
  if (slug === "5-weird-discoveries-from-cat-collar-cameras") {
    faqItems.push(
      {
        question: "Do all outdoor cats have a second home?",
        answer:
          "Most don't. Informal surveys of collar camera footage in dense urban and suburban neighborhoods suggest 20-25% of outdoor cats have a consistent secondary feeder or resting spot. Rural cats with more spread-out human populations are less likely to develop this pattern. Indoor-only cats don't have one at all.",
      },
      {
        question: "Is it ethical to film a cat going into a neighbor's property?",
        answer:
          "Video recording in publicly visible spaces is generally legal in most jurisdictions. Audio recording rules are stricter and vary by country. If your cat regularly enters a neighbor's enclosed space, the respectful move is to mention it before reviewing extended footage. Most people find it funny rather than invasive.",
      },
      {
        question: "How often should I review cat camera footage to spot patterns?",
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
  if (slug === "cat-collar-camera-vs-insta360-go-3") {
    faqItems.push(
      {
        question: "Can the Insta360 Go 3 be used on a cat collar safely?",
        answer:
          "Yes, on cats over roughly 4 kg, with two caveats. Use a breakaway cat collar with a magnetic-pendant attachment, or a harness like the Furee. The pod alone is around 35 g; with any mount, total load lands at 39-42 g. That is safe for a 4-5 kg cat but closer to the margin for smaller cats.",
      },
      {
        question: "Is 4K worth it for cat videos?",
        answer:
          "For TikTok, Reels, and Shorts, no — the platforms compress and often cap mobile playback at 720P, so the 4K detail does not reach the viewer. For YouTube long-form, aggressive cropping, or archival footage, yes. Most casual cat owners will not benefit from 4K. Dedicated content creators will.",
      },
      {
        question: "Which camera does Mr Kitters use?",
        answer:
          "Mr. Kitters The Cat uses the Insta360 Go 3 mounted on a Furee cat harness. This is public information from his own content — no sponsorship implied. The harness mount spreads the ~40 g load across the chest rather than concentrating it at the neck, which matters over long recording sessions.",
      },
      {
        question: "Why is Whiskcam so much cheaper than Insta360?",
        answer:
          "Different specs and different markets. Whiskcam is 1080P, no electronic stabilization, no app, no WiFi, and limited waterproofing. Built for a single use case — a cat's collar — which strips out hardware that doesn't serve that case. The 8x price gap reflects real hardware differences, not branding.",
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
  if (slug === "cat-collar-camera-vs-gps-tracker-2026") {
    faqItems.push(
      {
        question: "Can a GPS tracker replace a cat collar camera?",
        answer:
          "No. They solve different problems. A GPS tracker shows a moving dot on a map — where your cat is, not what your cat is doing. A collar camera shows video footage of your cat's activities but has no location data and no live feed. Choosing depends on whether you want to find your cat or understand your cat.",
      },
      {
        question: "What's the best GPS tracker for cats in 2026?",
        answer:
          "For most owners, Tractive GPS Cat LTE is the default pick — 25 g, LTE-based with effectively unlimited range where there's cell coverage, mature app. Weenect Cats 2 is a close alternative, especially in Europe. Eureka Marco Polo is the best no-subscription option but radio range is capped at 3 km line-of-sight.",
      },
      {
        question: "Does Whiskcam have GPS?",
        answer:
          "No. Whiskcam is a recording-only device — 1080P video to an SD card, no location tracking, no cellular chip, no live streaming. Adding GPS would roughly double the weight and require a subscription, which defeats the lightweight, one-time-purchase design. For location, pair Whiskcam with a dedicated GPS tracker.",
      },
      {
        question: "Can I track my cat without a subscription?",
        answer:
          "Yes, with trade-offs. Eureka Marco Polo uses radio signals instead of LTE, so no monthly fee — but range is capped at around 3 km in clear line of sight and much less in dense urban or wooded areas. For true unlimited-range tracking, an LTE tracker and subscription are the only real option in 2026.",
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
                We&apos;re an independent two-person team building cat collar cameras
                since 2026. Every article we publish is based on tested Whiskcam units,
                footage reviewed from our own cats and early beta users, and cross-checked
                against published veterinary and feline-behavior sources. If something
                here is wrong, we want to know —{" "}
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
          <h2 className="text-2xl font-bold text-white">Ready to see their world?</h2>
          <p className="mt-3 text-neutral-400">
            The Whiskcam Original — 24 g, 1080P, no app needed. Free worldwide shipping.
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
