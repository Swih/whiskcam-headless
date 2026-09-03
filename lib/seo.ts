// =============================================================================
// Whiskcam — Canonical URLs & hreflang
// Single source of truth shared by every `generateMetadata` and by app/sitemap.ts.
// Before this existed the two disagreed: pages self-canonicalised to `/en/…`
// (which 307-redirects under `localePrefix: "as-needed"`) while the sitemap
// listed the unprefixed form, so Google indexed both variants of the same page.
// =============================================================================

import { baseUrl } from "lib/utils";

export const LOCALES = ["en", "fr", "de", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Routes whose page content is genuinely translated.
 *
 * Everything else is authored in English and merely *served* under the other
 * locale prefixes (the blog articles are English `.tsx` components, the policy
 * and `what-is-whiskcam` pages are hardcoded English JSX). Those prefixed URLs
 * must therefore canonicalise back to the English one rather than claim to be a
 * translation — otherwise `/de/blog/x`, `/es/blog/x` and `/fr/blog/x` compete
 * with `/blog/x` as four duplicates of the same text.
 *
 * Add a path here the day its content is actually translated, and the sitemap
 * picks the change up automatically.
 */
export const TRANSLATED_ROUTES = new Set<string>(["", "/about", "/faq"]);

/** Absolute URL for `path` in `locale`, honouring next-intl's `as-needed` prefix. */
export function localizedUrl(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE
    ? `${baseUrl}${clean}`
    : `${baseUrl}/${locale}${clean}`;
}

export function isTranslatedRoute(path: string): boolean {
  return TRANSLATED_ROUTES.has(path === "/" ? "" : path);
}

type Alternates = {
  canonical: string;
  languages: Record<string, string>;
};

/**
 * `alternates` block for a page. Pass the locale-agnostic path (`""`, `/faq`,
 * `/blog/some-slug`) and the locale currently being rendered.
 *
 * For English-only routes the `locale` argument is deliberately ignored: the
 * canonical is always the unprefixed English URL, which is what consolidates
 * the four served copies into a single indexed page.
 */
export function alternatesFor(path: string, locale: string): Alternates {
  const english = localizedUrl(path, DEFAULT_LOCALE);

  if (!isTranslatedRoute(path)) {
    return { canonical: english, languages: { en: english, "x-default": english } };
  }

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localizedUrl(path, l);
  languages["x-default"] = english;

  return { canonical: localizedUrl(path, locale), languages };
}

/**
 * Sitemap `alternates.languages` for a path — omitted entirely for English-only
 * routes so the sitemap stops advertising translations that do not exist.
 */
export function sitemapLanguagesFor(path: string): Record<string, string> | undefined {
  if (!isTranslatedRoute(path)) return undefined;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localizedUrl(path, l);
  languages["x-default"] = localizedUrl(path, DEFAULT_LOCALE);
  return languages;
}
