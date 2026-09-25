// Read-only HTTP regression checks. Run against a local preview or deployed site:
// node scripts/check-seo.mjs http://localhost:3157
import assert from "node:assert/strict";

const origin = process.argv[2] || "http://localhost:3157";
const canonicalOrigin = "https://whiskcam.com";
let checks = 0;
function check(condition, message) {
  assert.ok(condition, message);
  checks++;
}
async function get(path, headers = {}) {
  const response = await fetch(new URL(path, origin), {
    redirect: "manual",
    headers,
    signal: AbortSignal.timeout(30000),
  });
  check(
    response.status === 200,
    `${path}: expected 200, got ${response.status} (${response.headers.get("location")})`,
  );
  return response.text();
}
function decode(s) {
  return s
    .replace(/&#x([\da-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
const compact = (s) => decode(s).replace(/\s+/g, " ").trim();
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => m[0]);
const attr = (tag, name) =>
  decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "");
function canonical(html) {
  return attr(
    tags(html, "link").find((t) => attr(t, "rel") === "canonical") || "",
    "href",
  );
}

// Locale cookies, browser language and country must not redirect canonical URLs.
for (const headers of [
  { "x-vercel-ip-country": "FR", "accept-language": "fr-FR" },
  { "x-vercel-ip-country": "DE", cookie: "NEXT_LOCALE=de; country=DE" },
  { "x-vercel-ip-country": "ES", cookie: "NEXT_LOCALE=es" },
]) {
  const html = await get("/blog/best-cat-collar-cameras-2026", headers);
  check(
    /<html[^>]+lang="en"/.test(html),
    "Canonical article must have English document language",
  );
}
for (const locale of ["en", "fr", "de", "es"]) {
  const path = locale === "en" ? "/" : `/${locale}`;
  const html = await get(path, { cookie: "NEXT_LOCALE=fr" });
  check(/<h1\b/.test(html), `${path}: rendered page heading missing`);
  check(
    canonical(html).replace(/\/$/, "") ===
      canonicalOrigin + (locale === "en" ? "" : path),
    `${path}: canonical mismatch`,
  );
  check(
    tags(html, "link").filter((t) => attr(t, "hreflang")).length === 5,
    `${path}: reciprocal hreflang cluster missing`,
  );
}
for (const slug of [
  "best-cat-collar-cameras-2026",
  "mr-petcam-vs-whiskcam",
  "are-cat-collar-cameras-safe",
  "cat-collar-weight-chart-by-size",
]) {
  for (const prefix of ["", "/fr"]) {
    const path = `${prefix}/blog/${slug}`;
    const html = await get(path);
    check(
      canonical(html) === `${canonicalOrigin}/blog/${slug}`,
      `${path}: canonical mismatch`,
    );
    check(
      (html.match(/<h1\b/g) || []).length === 1,
      `${path}: expected one H1`,
    );
    check(
      !/We Tested 5 on 4 Cats/.test(html),
      `${path}: undocumented test title remains`,
    );
    const graph = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].flatMap((m) => {
      const value = JSON.parse(m[1]);
      return value["@graph"] || [value];
    });
    const article = graph.find((n) => n["@type"] === "Article");
    check(
      article?.dateModified === "2026-09-25T00:00:00Z",
      `${path}: article modification date mismatch`,
    );
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    check(faq?.mainEntity.length > 0, `${path}: FAQ absent`);
    const visible = compact(
      html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]*>/g, " "),
    );
    for (const q of faq.mainEntity) {
      check(
        visible.includes(compact(q.name)),
        `${path}: schema-only FAQ question`,
      );
      check(
        visible.includes(compact(q.acceptedAnswer.text)),
        `${path}: schema-only FAQ answer`,
      );
    }
    check(
      !graph.some((n) => ["Product", "HowTo"].includes(n["@type"])),
      `${path}: unexpected Product/HowTo schema`,
    );
    const related =
      html.match(
        /<section[^>]*aria-label="Related articles"[^>]*>([\s\S]*?)<\/section>/,
      )?.[1] || "";
    check(
      tags(related, "a").filter((t) => attr(t, "href").startsWith("/blog/"))
        .length === 3,
      `${path}: expected 3 canonical related links`,
    );
    const list = graph.find((n) => n["@type"] === "ItemList");
    if (slug === "best-cat-collar-cameras-2026") {
      check(list?.numberOfItems === 5, `${path}: comparison count mismatch`);
      for (const item of list.itemListElement) {
        check(
          html.includes(`id="${new URL(item.url).hash.slice(1)}"`),
          `${path}: broken comparison anchor`,
        );
      }
    }
  }
}
for (const slug of [
  "how-to-watch-avi-on-iphone-cat-cam",
  "best-cat-collar-camera-for-maine-coon",
  "i-filmed-my-cat-for-7-days-what-i-learned",
  "cat-collar-camera-vs-insta360-go-3",
]) {
  const html = await get("/blog/" + slug);
  check(
    canonical(html) === canonicalOrigin + "/blog/" + slug,
    slug + ": canonical",
  );
  check((html.match(/<h1\b/g) || []).length === 1, slug + ": H1");
  check(!html.includes('"@type":"FAQPage"'), slug + ": obsolete FAQ schema");
  check(
    !html.includes("Tested on a 7.8 kg Boy"),
    slug + ": unsupported trial title",
  );
}
const safety = await get("/blog/are-cat-collar-cameras-safe");
check(
  !safety.includes("Within the conservative 3% limit"),
  "Unsafe calculator verdict",
);
check(
  safety.includes("Accessories weight in grams"),
  "Total equipment input absent",
);
const sitemap = await get("/sitemap.xml");
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (m) => m[1],
);
check(entries.length > 0, "Empty sitemap");
const urls = entries.map((e) => e.match(/<loc>(.*?)<\/loc>/)?.[1]);
check(new Set(urls).size === urls.length, "Duplicate sitemap URLs");
for (const [i, entry] of entries.entries()) {
  check(
    new URL(urls[i]).origin === canonicalOrigin,
    "Noncanonical sitemap host",
  );
  check(
    !/\/(fr|de|es|en)\/blog\//.test(urls[i]),
    "English article advertised as translation",
  );
  if (!urls[i].includes("/blog/"))
    check(!entry.includes("<lastmod>"), "Synthetic static lastmod date");
}
check(sitemap === (await get("/sitemap.xml")), "Unstable sitemap");
const robots = await get("/robots.txt");
check(
  robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`),
  "Wrong sitemap declaration",
);
console.log(
  JSON.stringify(
    {
      origin,
      checks,
      status: "passed",
      catalogue:
        "Depends on the server under test; no purchases are performed.",
    },
    null,
    2,
  ),
);
