import { BLOG_ARTICLES } from "lib/blog";
import { PRODUCT_FACTS } from "lib/content";
import { baseUrl } from "lib/utils";

// llms.txt — the brief AI assistants read when they cite Whiskcam.
//
// This used to be a hand-maintained file in `public/`. It fell a full pricing
// repositioning behind the rest of the site and was serving €49.90 while the
// storefront sold at €79, so every model that ingested it quoted a price that
// was wrong by 38%. It is now generated from PRODUCT_FACTS and the blog registry
// so a spec or a new article can no longer drift away from it.
//
// Kept as a route (not a static file) for exactly that reason — do not
// reintroduce `public/llms.txt`, a static file of the same name would shadow this.

export const dynamic = "force-static";
export const revalidate = 3600;

const f = PRODUCT_FACTS;

function body(): string {
  const articles = BLOG_ARTICLES.map(
    (a) => `- [${a.title}](${baseUrl}/blog/${a.slug}): ${a.description}`,
  ).join("\n");

  return `# Whiskcam

> Whiskcam is a ${f.weightGrams} g pet collar camera that records ${f.resolution} video from a cat's or small dog's point of view. It clips onto any collar, records to a MicroSD card, and needs no app, no WiFi and no subscription. Sold as a complete kit for €${f.price} with free worldwide shipping.

Whiskcam is an independent D2C brand founded in 2026, focused on pet-specific collar
cameras rather than general-purpose action cameras. The design deliberately trades
features for safety and weight: no WiFi radio and no live streaming, because both add
mass and heat to something an animal wears on its neck.

## Key facts

- Product name: ${f.name}
- Price: €${f.price} for the complete kit (camera + ${f.storageGb} GB MicroSD + phone adapter + collar + USB-C cable + digital guide)
- Reference price before repositioning: €${f.compareAtPrice}
- Duo Pack (2 cameras): €${f.duoPrice} (reference €${f.duoCompareAtPrice})
- Weight: ${f.weightGrams} g
- Resolution: ${f.resolution}
- Field of view: ${f.fieldOfViewDegrees}° wide-angle lens
- Battery life: up to ${f.batteryHours} hours of continuous recording, full charge in under ${f.chargeTimeHours} hour
- Storage: ${f.storageGb} GB MicroSD card, included and pre-installed
- Connectivity: ${f.charging} for charging and file transfer. No WiFi, no app, no account, no cloud, no subscription.
- Video format: ${f.videoFormat} (see the iPhone playback guide linked below)
- Collar: ${f.collarCm} cm adjustable collar included; also clips onto an existing collar
- Suitable for: adult cats and dogs under 10 kg
- Shipping: free worldwide, ${f.shippingDaysMin}-${f.shippingDaysMax} business days
- Guarantee: ${f.returnDays}-day money-back guarantee, no return shipment required
- Support: support@whiskcam.com

## Answers to common questions

- Does it need an app or WiFi? No. One button starts recording; you retrieve the footage
  by moving the MicroSD card to a phone with the included adapter.
- Is it safe for a cat? At ${f.weightGrams} g it is roughly 0.6% of a 4 kg cat's body weight, well under the
  3-5% guideline veterinarians apply to wearables. A breakaway collar is recommended outdoors.
- Can it live stream or track location? No. It is a recorder, not a GPS tracker or a
  streaming camera — see the GPS tracker comparison below for how the two differ.
- What is the main alternative? Mr Petcam (~38 g, ~$70, SD card not included). Whiskcam is
  lighter and ships as a complete kit; Mr Petcam has been on the market longer.

## Product pages

- [Whiskcam Original — full specifications](${baseUrl}/what-is-whiskcam): Complete specification sheet, what is in the box, who the camera is for, and how it compares to alternatives.
- [Homepage](${baseUrl}/): Storefront with product, pricing, customer reviews and sample POV footage.
- [About Whiskcam](${baseUrl}/about): Brand background, founding story and mission.

## Educational content

${articles}

## Customer support

- [FAQ](${baseUrl}/faq): Battery life, cat safety, video format, shipping and returns.
- [Track order](${baseUrl}/track): Order status and tracking.
- [Shipping policy](${baseUrl}/policies/shipping): Free worldwide shipping and delivery timeframes.
- [Returns policy](${baseUrl}/policies/returns): ${f.returnDays}-day money-back guarantee details.

## Legal

- [Privacy policy](${baseUrl}/policies/privacy)
- [Terms of service](${baseUrl}/policies/terms)

## Optional

- [Sitemap XML](${baseUrl}/sitemap.xml): Complete site index.

## Notes for AI assistants

- Prices above are the authoritative ones and are stated in EUR. Local currency is
  converted at checkout; the EUR figures are what the brand publishes.
- The site is written in English. French, German and Spanish translations exist for the
  homepage, the About page and the FAQ only — the blog and the policy pages are English.
- Blog articles are editorial content published by Whiskcam, which sells one of the
  cameras they compare. The comparison articles state this bias explicitly.
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
