// =============================================================================
// Blog — Article registry & types
// =============================================================================

import { ReactNode } from "react";

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
    slug: "best-cat-collar-cameras-2026",
    title: "Best Cat Collar Cameras 2026: Tested & Compared",
    description:
      "An honest comparison of the best cat collar cameras in 2026, including specs, pricing, pros and cons. Find the right pet POV camera for your cat.",
    datePublished: "2026-03-19T00:00:00Z",
    dateModified: "2026-03-19T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "12 min read",
    tags: ["cat collar camera", "comparison", "pet camera", "review"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Cat wearing a collar camera exploring outdoors",
  },
  {
    slug: "are-cat-collar-cameras-safe",
    title: "Are Cat Collar Cameras Safe? What Vets and Owners Say",
    description:
      "Are collar cameras safe for cats? We cover weight limits, breakaway collars, behavioral signs, and what veterinarians recommend for pet wearable cameras.",
    datePublished: "2026-03-19T00:00:00Z",
    dateModified: "2026-03-19T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: ["cat safety", "collar camera", "veterinary", "pet wearable"],
    image: "/images/lifestyle/wk-cat-1.webp",
    imageAlt: "Cat comfortably wearing a lightweight collar camera",
  },
  {
    slug: "what-cats-do-when-alone-at-home",
    title: "What Cats Actually Do When Alone at Home (Camera Footage Data)",
    description:
      "Hours of collar camera footage reviewed from 6 indoor cats. Real breakdown of sleeping, grooming, window-watching, patrolling and stress signals — with percentages.",
    datePublished: "2026-04-18T00:00:00Z",
    dateModified: "2026-04-18T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "10 min read",
    tags: ["cat behavior", "home alone", "cat enrichment", "cat camera"],
    image: "/images/lifestyle/wk-cat-1.webp",
    imageAlt: "Cat resting near a sunny window at home",
  },
  {
    slug: "how-to-watch-avi-on-iphone-cat-cam",
    title: "How to Watch AVI Videos on iPhone from a Cat Collar Camera",
    description:
      "iPhones don't play AVI natively. Here are the three working methods (VLC, Infuse, conversion) tested on iPhone 14 and 15 — plus which SD readers actually work.",
    datePublished: "2026-04-25T00:00:00Z",
    dateModified: "2026-04-25T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "7 min read",
    tags: ["iphone", "avi", "cat camera", "how to"],
    image: "/images/product/wk-product-1.webp",
    imageAlt: "iPhone displaying cat collar camera footage",
  },
  {
    slug: "cat-collar-weight-chart-by-size",
    title: "Cat Collar Weight Chart: Maximum Camera Weight by Cat Size (2026)",
    description:
      "The 3% rule, weight limits by breed, and how to calculate total collar load for your cat. Safe camera weight chart for 15 common cat breeds.",
    datePublished: "2026-05-02T00:00:00Z",
    dateModified: "2026-05-02T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: ["cat safety", "weight guide", "cat breeds", "buying guide"],
    image: "/images/lifestyle/wk-cat-1.webp",
    imageAlt: "Cat wearing a lightweight collar camera, close-up of neck and collar fit",
  },
  {
    slug: "i-filmed-my-cat-for-7-days-what-i-learned",
    title: "I Filmed My Cat for 7 Days with a Collar Camera — Here's What I Learned",
    description:
      "I filmed my tabby Nori for 7 days with a collar camera. Hidden napping spots, a 3:47 AM visitor, the neighbor's garden — here's the day-by-day.",
    datePublished: "2026-05-09T00:00:00Z",
    dateModified: "2026-05-09T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "10 min read",
    tags: ["cat collar camera", "7 day experiment", "cat behavior", "first-person review"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Gray and white tabby cat walking through a garden wearing a small collar camera",
  },
  {
    slug: "5-weird-discoveries-from-cat-collar-cameras",
    title: "5 Weird Things People Discovered With a Cat Collar Camera",
    description:
      "From secret second homes to hidden nap spots, here are 5 true patterns cat owners keep discovering with collar cameras — and why they happen.",
    datePublished: "2026-05-16T00:00:00Z",
    dateModified: "2026-05-16T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "8 min read",
    tags: ["cat behavior", "collar camera footage", "outdoor cats", "cat discoveries"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Outdoor cat wearing a lightweight collar camera walking along a garden wall",
  },
  {
    slug: "cat-collar-camera-vs-insta360-go-3",
    title: "Whiskcam vs Insta360 Go 3 for Cat Collar Use: Honest 2026 Comparison",
    description:
      "Honest 2026 comparison of Whiskcam and Insta360 Go 3 for cat collar use. Weight, 4K vs 1080P, price, safety, and who should buy which.",
    datePublished: "2026-05-23T00:00:00Z",
    dateModified: "2026-05-23T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["insta360 go 3", "cat pov camera", "cat collar camera", "camera comparison"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Cat wearing a lightweight collar camera outdoors, Whiskcam vs Insta360 Go 3 comparison",
  },
  {
    slug: "cat-pov-tiktok-viral-guide-2026",
    title: "How to Make a Viral Cat POV TikTok Video (2026 Guide)",
    description:
      "A pragmatic guide to viral cat POV TikToks in 2026: golden hour timing, 7-second story arcs, editing rules, and a realistic 30-day plan.",
    datePublished: "2026-05-30T00:00:00Z",
    dateModified: "2026-05-30T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["cat tiktok", "cat pov", "content creation", "cat camera"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Cat wearing a collar camera filming outdoor POV footage for TikTok",
  },
  {
    slug: "cat-collar-camera-vs-gps-tracker-2026",
    title: "Cat Collar Camera vs GPS Tracker: Which Do You Actually Need in 2026?",
    description:
      "GPS trackers find your missing cat. Collar cameras show what your cat does. Compare Tractive, Weenect, and Whiskcam — costs, weight, and when to use both.",
    datePublished: "2026-06-06T00:00:00Z",
    dateModified: "2026-06-06T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["cat gps tracker", "cat collar camera", "tractive", "cat safety"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Outdoor cat wearing a collar camera exploring the garden",
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
    image: "/images/lifestyle/wk-cat-1.webp",
    imageAlt: "Curious cat investigating a small indoor pet camera on a shelf",
  },
  {
    slug: "best-cat-collar-camera-for-maine-coon",
    title: "Best Cat Collar Camera for a Maine Coon: Size, Weight, and Fur Considerations",
    description:
      "Maine Coons need different collar cameras than average cats. Guide covers collar size (30-40 cm), fur interference, battery life, and breed-specific picks.",
    datePublished: "2026-06-20T00:00:00Z",
    dateModified: "2026-06-20T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "7 min read",
    tags: ["maine coon", "cat collar camera", "large cat breeds", "buying guide"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Large long-haired cat outdoors wearing a collar camera",
  },
  {
    slug: "where-does-my-outdoor-cat-actually-go",
    title: "Where Does My Outdoor Cat Actually Go? What GPS and Camera Studies Reveal",
    description:
      "GPS research says outdoor cats spend 80% of their time within 100 m of home. What multi-university data and collar cameras reveal about cat territory.",
    datePublished: "2026-06-27T00:00:00Z",
    dateModified: "2026-06-27T00:00:00Z",
    author: "Whiskcam Team",
    readingTime: "9 min read",
    tags: ["outdoor cats", "cat behavior", "GPS tracking", "cat territory"],
    image: "/images/lifestyle/wk-cat-outdoor.webp",
    imageAlt: "Outdoor cat walking along a garden wall at dusk",
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_ARTICLES.map((a) => a.slug);
}
