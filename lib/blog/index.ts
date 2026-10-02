// =============================================================================
// Blog — Article registry & types
// =============================================================================

import { COMPARISON_REVIEWED } from "./comparison-facts";
import { LEGAL_REVIEWED } from "./legal-facts";

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO 8601
  dateModified: string;
  author: string;
  readingTime: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "mr-petcam-vs-whiskcam",
    title: "Mr Petcam HD vs Whiskcam: Weight, Storage & Night Vision",
    description:
      "Compare Mr Petcam HD and Whiskcam: listed weight, night vision, included storage and phone playback. Manufacturer sources and each kit's limitations explained.",
    datePublished: "2026-09-04T00:00:00Z",
    dateModified: COMPARISON_REVIEWED,
    author: "Whiskcam Team",
    readingTime: "7 min read",
    tags: ["mr petcam", "cat collar camera", "comparison", "review"],
    image: "/images/blog/guides/mr-petcam-vs-whiskcam.webp",
    imageAlt:
      "Whiskcam camera on its collar, with Mr Petcam HD and Whiskcam key specifications",
  },
  {
    slug: "best-cat-collar-cameras-2026",
    title: "Best Cat Collar Cameras 2026: 5 Options Compared",
    description:
      "The best cat collar cameras of 2026 compared: Whiskcam, Mr Petcam HD, Insta360 GO 3S and more. Weight, night vision, storage, breakaway fit, GPS and UK buying.",
    datePublished: "2026-03-19T00:00:00Z",
    dateModified: COMPARISON_REVIEWED,
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: ["cat collar camera", "comparison", "pet camera", "review"],
    image: "/images/blog/guides/best-cat-collar-cameras-2026.webp",
    imageAlt:
      "Real Whiskcam collar-camera frame of a tabby cat in a garden, beside a chart of published camera weights",
  },
  {
    slug: "are-cat-collar-cameras-safe",
    title: "Are Cat Collar Cameras Safe? Fit, Weight & Warning Signs",
    description:
      "Check collar-camera fit, total mounted weight and signs to stop a trial. Quick-release collar guidance, a load calculator and practical first-use checks.",
    datePublished: "2026-03-19T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "6 min read",
    tags: ["cat safety", "collar camera", "veterinary", "pet wearable"],
    image: "/images/blog/guides/are-cat-collar-cameras-safe.webp",
    imageAlt:
      "Whiskcam camera held next to a coin for size, with a cat collar camera safety checklist",
  },
  {
    slug: "what-cats-do-when-alone-at-home",
    title: "What Cats Actually Do When Alone at Home (and How to Check)",
    description:
      "What cats usually do when home alone, from naps to window-watching, which signs can point to stress, and how to record your own cat. Cited guidance from Cats Protection, iCatCare and VCA.",
    datePublished: "2026-04-18T00:00:00Z",
    dateModified: "2026-10-02T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "10 min read",
    tags: ["cat behavior", "home alone", "cat enrichment", "cat camera"],
    image: "/images/blog/guides/what-cats-do-when-alone-at-home.webp",
    imageAlt:
      "Grey tabby cat asleep on a sunny windowsill, with what cats do when home alone",
  },
  {
    slug: "how-to-watch-avi-on-iphone-cat-cam",
    title: "How to Watch Cat Camera AVI Files on iPhone: A Practical Guide",
    description:
      "Find your camera files in iPhone Files, try compatible playback, and convert a copy for editing. Reader checks and troubleshooting with Apple and VideoLAN sources.",
    datePublished: "2026-04-25T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "5 min read",
    tags: ["iphone", "avi", "cat camera", "how to"],
    image: "/images/blog/guides/how-to-watch-avi-on-iphone-cat-cam.webp",
    imageAlt:
      "Real Whiskcam POV frame of a cat crossing a terrace, with steps to play AVI files on iPhone",
  },
  {
    slug: "cat-collar-weight-chart-by-size",
    title: "Cat Collar Weight Chart & Camera Load Calculator",
    description:
      "Calculate total collar, camera and accessory weight in kg or lb. Worked examples explain the percentage of body weight without promising a universal safe limit.",
    datePublished: "2026-05-02T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "5 min read",
    tags: ["cat safety", "weight guide", "cat breeds", "buying guide"],
    image: "/images/blog/guides/cat-collar-weight-chart-by-size.webp",
    imageAlt:
      "Whiskcam camera shown at scale next to a coin, with the total collar load formula",
  },
  {
    slug: "i-filmed-my-cat-for-7-days-what-i-learned",
    title: "A 7-Day Cat Camera Diary: Recording Plan & Observation Template",
    description:
      "Plan short observations with a cat camera: fit checks, playback, a seven-day diary and a recording log. A practical template, not a claimed product trial.",
    datePublished: "2026-05-09T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "5 min read",
    tags: [
      "cat collar camera",
      "7 day experiment",
      "cat behavior",
      "observation template",
    ],
    image: "/images/blog/guides/i-filmed-my-cat-for-7-days-what-i-learned.webp",
    imageAlt:
      "Real Whiskcam POV frame of a cat peering through garden grass, with a seven-day recording plan",
  },
  {
    slug: "5-weird-discoveries-from-cat-collar-cameras",
    title: "5 Weird Things People Discovered With a Cat Collar Camera",
    description:
      "Second feeders, hidden nap spots, standoffs with neighbourhood cats: five things owners commonly report finding with collar cameras, and what research and welfare guidance say about why.",
    datePublished: "2026-05-16T00:00:00Z",
    dateModified: "2026-10-02T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: [
      "cat behavior",
      "collar camera footage",
      "outdoor cats",
      "cat discoveries",
    ],
    image:
      "/images/blog/guides/5-weird-discoveries-from-cat-collar-cameras.webp",
    imageAlt:
      "Real Whiskcam POV frame of a fence and neighbouring garden seen from a cat's collar",
  },
  {
    slug: "cat-collar-camera-vs-insta360-go-3",
    title: "Whiskcam vs Insta360 GO 3 on a Cat Collar: 2026 Comparison",
    description:
      "Compare Whiskcam and Insta360 GO 3: 24 g vs 35.5 g camera bodies, 1080P vs 2.7K, storage, mounting and phone workflow. Manufacturer sources and trade-offs.",
    datePublished: "2026-05-23T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "5 min read",
    tags: [
      "insta360 go 3",
      "cat pov camera",
      "cat collar camera",
      "camera comparison",
    ],
    image: "/images/blog/guides/cat-collar-camera-vs-insta360-go-3.webp",
    imageAlt:
      "Whiskcam collar camera on a white background, with Insta360 GO 3 and Whiskcam specifications",
  },
  {
    slug: "cat-pov-tiktok-viral-guide-2026",
    title: "How to Make a Viral Cat POV TikTok Video (2026 Guide)",
    description:
      "A practical guide to cat POV TikToks: filming at active times, short story arcs, editing tips, safety and privacy, and a realistic 30-day plan. No guaranteed views.",
    datePublished: "2026-05-30T00:00:00Z",
    dateModified: "2026-10-02T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["cat tiktok", "cat pov", "content creation", "cat camera"],
    image: "/images/blog/guides/cat-pov-tiktok-viral-guide-2026.webp",
    imageAlt:
      "Real Whiskcam POV frame of a sunny sky and field from a cat's collar, with filming tips",
  },
  {
    slug: "cat-collar-camera-vs-gps-tracker-2026",
    title: "Cat Collar Camera vs GPS Tracker: Which Do You Need?",
    description:
      "GPS trackers find your missing cat. Collar cameras show what your cat does. Compare Tractive, Weenect, and Whiskcam — costs, weight, and when to use both.",
    datePublished: "2026-06-06T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["cat gps tracker", "cat collar camera", "tractive", "cat safety"],
    image: "/images/blog/guides/cat-collar-camera-vs-gps-tracker-2026.webp",
    imageAlt:
      "Real Whiskcam POV frame of a snowy street under a blue sky, whiskers in view, with camera versus GPS tracker differences",
  },
  {
    slug: "my-cat-found-the-camera-what-to-do",
    title: "My Cat Found the Camera — What It Means and What to Do",
    description:
      "Your cat swatting, staring, or meowing at the pet camera isn't aggression. Here's what the behavior means and how to handle it calmly.",
    datePublished: "2026-06-13T00:00:00Z",
    dateModified: "2026-06-13T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: ["cat behavior", "pet camera", "cat psychology", "habituation"],
    image: "/images/blog/guides/my-cat-found-the-camera-what-to-do.webp",
    imageAlt:
      "Real Whiskcam POV frame of a white and ginger cat looking straight at the camera",
  },
  {
    slug: "best-cat-collar-camera-for-maine-coon",
    title: "Cat Collar Cameras for Maine Coons: Fit, Fur & Buying Guide",
    description:
      "Choose a camera for your Maine Coon by measured fit, lens clearance and total collar load. Practical checks, recording trade-offs and signs to stop a trial.",
    datePublished: "2026-06-20T00:00:00Z",
    dateModified: "2026-09-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "5 min read",
    tags: [
      "maine coon",
      "cat collar camera",
      "large cat breeds",
      "buying guide",
    ],
    image: "/images/blog/guides/best-cat-collar-camera-for-maine-coon.webp",
    imageAlt:
      "Whiskcam collar camera resting on grass at sunset, with fit checks for large cats",
  },
  {
    slug: "where-does-my-outdoor-cat-actually-go",
    title: "Where Does My Outdoor Cat Go? What GPS Studies Reveal",
    description:
      "GPS studies of 925 pet cats found an average home range of about 3.6 hectares, with most staying near home. What tracking research shows, and what a collar camera can add.",
    datePublished: "2026-06-27T00:00:00Z",
    dateModified: "2026-10-02T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["outdoor cats", "cat behavior", "GPS tracking", "cat territory"],
    image: "/images/blog/guides/where-does-my-outdoor-cat-actually-go.webp",
    imageAlt:
      "Real Whiskcam POV frame of a cat's chin over a garden and houses",
  },
  {
    slug: "is-it-legal-to-put-a-camera-on-your-cat",
    title: "Is It Legal to Put a Camera on Your Cat? UK, EU & US Rules",
    description:
      "What privacy and recording laws say about cat collar cameras: neighbours, public spaces, audio and posting footage online, with official UK, EU and US sources.",
    datePublished: LEGAL_REVIEWED,
    dateModified: LEGAL_REVIEWED,
    author: "Whiskcam Team",
    readingTime: "7 min read",
    tags: ["privacy", "collar camera", "cat pov", "law"],
    image: "/images/blog/guides/is-it-legal-to-put-a-camera-on-your-cat.webp",
    imageAlt:
      "Real Whiskcam POV frame of a neighbour's cat on a terrace, with privacy rules for cat cameras",
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_ARTICLES.map((a) => a.slug);
}

// Prefer useful next steps rather than linking every article below every page.
const RELATED_ARTICLES: Record<string, string[]> = {
  "best-cat-collar-cameras-2026": [
    "mr-petcam-vs-whiskcam",
    "cat-collar-camera-vs-insta360-go-3",
    "cat-collar-camera-vs-gps-tracker-2026",
  ],
  "mr-petcam-vs-whiskcam": [
    "best-cat-collar-cameras-2026",
    "cat-collar-camera-vs-insta360-go-3",
    "how-to-watch-avi-on-iphone-cat-cam",
  ],
  "cat-collar-camera-vs-insta360-go-3": [
    "best-cat-collar-cameras-2026",
    "mr-petcam-vs-whiskcam",
    "cat-collar-weight-chart-by-size",
  ],
  "are-cat-collar-cameras-safe": [
    "cat-collar-weight-chart-by-size",
    "best-cat-collar-camera-for-maine-coon",
    "is-it-legal-to-put-a-camera-on-your-cat",
  ],
  "cat-collar-weight-chart-by-size": [
    "are-cat-collar-cameras-safe",
    "best-cat-collar-camera-for-maine-coon",
    "best-cat-collar-cameras-2026",
  ],
  "best-cat-collar-camera-for-maine-coon": [
    "cat-collar-weight-chart-by-size",
    "are-cat-collar-cameras-safe",
    "best-cat-collar-cameras-2026",
  ],
  "cat-collar-camera-vs-gps-tracker-2026": [
    "where-does-my-outdoor-cat-actually-go",
    "best-cat-collar-cameras-2026",
    "cat-collar-weight-chart-by-size",
  ],
  "where-does-my-outdoor-cat-actually-go": [
    "cat-collar-camera-vs-gps-tracker-2026",
    "5-weird-discoveries-from-cat-collar-cameras",
    "is-it-legal-to-put-a-camera-on-your-cat",
  ],
  "5-weird-discoveries-from-cat-collar-cameras": [
    "where-does-my-outdoor-cat-actually-go",
    "my-cat-found-the-camera-what-to-do",
    "what-cats-do-when-alone-at-home",
  ],
  "what-cats-do-when-alone-at-home": [
    "my-cat-found-the-camera-what-to-do",
    "5-weird-discoveries-from-cat-collar-cameras",
    "i-filmed-my-cat-for-7-days-what-i-learned",
  ],
  "my-cat-found-the-camera-what-to-do": [
    "what-cats-do-when-alone-at-home",
    "are-cat-collar-cameras-safe",
    "cat-pov-tiktok-viral-guide-2026",
  ],
  "i-filmed-my-cat-for-7-days-what-i-learned": [
    "how-to-watch-avi-on-iphone-cat-cam",
    "what-cats-do-when-alone-at-home",
    "are-cat-collar-cameras-safe",
  ],
  "how-to-watch-avi-on-iphone-cat-cam": [
    "cat-pov-tiktok-viral-guide-2026",
    "i-filmed-my-cat-for-7-days-what-i-learned",
    "mr-petcam-vs-whiskcam",
  ],
  "cat-pov-tiktok-viral-guide-2026": [
    "how-to-watch-avi-on-iphone-cat-cam",
    "is-it-legal-to-put-a-camera-on-your-cat",
    "my-cat-found-the-camera-what-to-do",
  ],
  "is-it-legal-to-put-a-camera-on-your-cat": [
    "are-cat-collar-cameras-safe",
    "cat-pov-tiktok-viral-guide-2026",
    "where-does-my-outdoor-cat-actually-go",
  ],
};

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const article = getArticle(slug);
  if (!article) return [];
  const preferred = RELATED_ARTICLES[slug] ?? [];
  const score = (candidate: BlogArticle) =>
    preferred.includes(candidate.slug)
      ? 100 - preferred.indexOf(candidate.slug)
      : candidate.tags.filter((tag) => article.tags.includes(tag)).length;
  return BLOG_ARTICLES.filter((candidate) => candidate.slug !== slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
