# CLAUDE.md — Whiskcam

Headless Shopify storefront for **whiskcam.com**, a single-product D2C store selling a
pet collar camera. Forked from `vercel/commerce` (Next.js Commerce) and heavily rewritten
into a landing-page-first funnel. Deployed on Vercel.

## Stack

- **Next.js 15.6 canary** (App Router, PPR + `useCache` + `inlineCss` all enabled in `next.config.ts`)
- **React 19**, TypeScript 5.8, Tailwind CSS 4
- **next-intl 4** — 4 locales (`en` default, `fr`, `de`, `es`), `localePrefix: "as-needed"`
- **framer-motion** for section animations
- **pnpm** (`pnpm dev` uses `--turbopack`)
- Shopify Storefront API via `lib/shopify`

`pnpm test` only runs `prettier:check`. There is no test suite and no typecheck script —
run `pnpm build` to catch type errors.

## Architecture

```
app/[locale]/page.tsx        The store. Landing page + all JSON-LD. Everything happens here.
app/[locale]/blog/           13 hand-written articles, English only (see i18n caveat below)
app/[locale]/[page]/         Shopify CMS pages (e.g. /contact)
app/sitemap.ts, robots.ts    Sitemap is hand-maintained; Shopify routes deliberately excluded
middleware.ts                Geo-detects locale from `x-vercel-ip-country`, sets `country` cookie
lib/content.ts               PRODUCT_FACTS (specs + prices), media paths, FAQ copy for JSON-LD
lib/seo.ts                   Canonical + hreflang. One source of truth for pages AND the sitemap.
lib/schema.ts                Shared JSON-LD nodes with stable @ids (Organization, Offer, shipping)
app/llms.txt/route.ts        llms.txt, generated from PRODUCT_FACTS so it cannot drift
lib/blog/index.ts            Article registry (metadata); one .tsx per article for the body
locales/{en,fr,de,es}.json   All UI copy
public/llms.txt              Hand-written brand summary for AI crawlers
```

This is a **single-product store**. `/product/[handle]` is a permanent redirect to `/`.
There are no collection pages. The homepage *is* the product page — treat it as such for
SEO, schema, and conversion work.

## Conventions that matter

- **Prices are hardcoded in several places.** `€79` (kit) and the `€109` strikethrough anchor
  live in `app/[locale]/page.tsx`, `lib/content.ts` (`COMPARISON`), the locale JSON files,
  `what-is-whiskcam/page.tsx`, and `public/llms.txt`. Shopify's `compareAtPrice` is
  deliberately ignored. **Changing the price means changing all of them** — grep for the
  number, don't assume one source of truth.
- **Product specs are also duplicated** and currently disagree with each other
  (weight is stated as both 24 g and 26 g across the site). Any spec change needs the same
  grep-everywhere treatment: `lib/content.ts`, `locales/*.json`, `what-is-whiskcam`,
  `public/llms.txt`, and the blog articles.
- **JSON-LD is written inline** in each page as `<script type="application/ld+json">` with
  `dangerouslySetInnerHTML`. The homepage emits 8 blocks (Product, FAQPage, Organization,
  BreadcrumbList, 4× VideoObject).
- **`FAQ_ITEMS` in `lib/content.ts` is English-only on purpose** — it feeds JSON-LD. The
  visible FAQ UI reads from `locales/*.json` instead. The two can drift.
- **Canonical/hreflang are hand-written per page** and are currently inconsistent: some
  pages use `/${locale}/path` (which 307-redirects under `as-needed`), others use the
  correct unprefixed form. See `docs/` audit before touching.
- `baseUrl` comes from `VERCEL_PROJECT_PRODUCTION_URL`, falling back to `localhost:3000`.
- Checkout redirects the buyer to the `*.myshopify.com` domain (`components/cart/actions.ts`).

## i18n caveat

The 4 locales translate **UI copy only**. Blog articles are English `.tsx` components
served under every locale prefix, so `/de/blog/<slug>` renders `<html lang="de">` around
English text. The sitemap declares hreflang alternates for all 4 locales on every blog URL.
Keep this in mind before adding locale-scoped SEO logic.

## Analytics

GA4 + Microsoft Clarity + TikTok Pixel in `components/analytics.tsx`, all gated behind the
cookie banner (`wk-cookie-consent` in localStorage). `trackViewContent` / `trackAddToCart`
helpers exist; `window.fbq` is referenced but **Meta Pixel is never loaded**. There is no
`begin_checkout` / `InitiateCheckout` event.

## Docs

- `DESIGN.md` — design system (tokens, type scale, section rhythm). Follow it for UI work.
- `docs/audit-2026-04-13.md` — earlier design/UX audit.
- `docs/review-request-emails.md` — post-purchase review request templates.

## House rules

- Match the existing code style; don't reintroduce upstream `vercel/commerce` patterns that
  were removed (search, collections, multi-product grids).
- `README.md` is still the untouched upstream Vercel Commerce readme. Ignore it.
- Don't commit or push unless asked.
