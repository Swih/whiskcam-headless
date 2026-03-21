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
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_ARTICLES.map((a) => a.slug);
}
