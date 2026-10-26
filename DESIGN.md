# Whiskcam Design System — "Their secret life. Your front-row seat."

The homepage is the store. Direction chosen by the owner: **premium and quiet —
beautiful photos, large typography, few effects.** Copy sells the delight;
design stays out of the way of the photos, the clips and the buy button.

## 1. Brand idea

A cat leads a whole life we never see. Whiskcam lets you see it — and hear it —
when they come home.

- **Promise:** discovering their little adventures, smiling at an unexpected
  encounter, sharing the best bits.
- **Proof:** real Whiskcam clips early on the page; the real product, sizeable
  and legible.
- **Why buy here:** a step-by-step first-film guide in four languages, a real
  person on email, a 30-day refund policy.

### Voice

- Lead with desire and curiosity; keep facts exact. Warm, short sentences.
- Limits are information, not headlines: they live in **Good to know**, next
  to the purchase (microSD) and in the FAQ. Never headline what it can't do,
  never "honest checklist" or "choose something else" rhetoric.
- Never say _live_, _streaming_, _GPS_, _night vision_ as abilities. Never
  invent runtime, included storage, arrival dates, free returns, bundles,
  review counts or "verified" buyers.
- No film jargon piles (ticket, box office, premiere…).

## 2. Colour

CSS variables on `.storefront` in `components/landing/storefront-v2.module.css`.

| Token               | Value                                                        | Role                                          |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `--bg`              | `#faf8f4`                                                    | Page canvas (warm near-white)                 |
| `--stone`           | `#f1ede6`                                                    | Shop and help sections, photo backgrounds     |
| `--white`           | `#ffffff`                                                    | Option cards, product plates                  |
| `--ink`             | `#1d1c1a`                                                    | Text, primary button, selected states         |
| `--muted`           | `#615d55`                                                    | Secondary text (AA on all light surfaces)     |
| `--line`            | `#e4ded3`                                                    | Hairlines                                     |
| `--night`           | `#171614`                                                    | Real-clips section and announcement bar       |
| `--accent`          | evergreen `#6f5434` · Halloween `#b0440e` · autumn `#965314` | Small labels, campaign line, code price label |
| `--accent-on-night` | `#d9b98f` · `#f0a46a` · `#e8b27a`                            | Eyebrows on `--night`                         |

The season (`data-season` = `halloween` / `autumn` / `evergreen`) changes the
accent only. Halloween reads as a tasteful seasonal collection: burnt-orange
labels, a small dot before the campaign name, one seasonal line in the clips
section. No pumpkins, bats, gradients, glows or textures.

## 3. Typography

DM Sans only (existing `next/font`). No other face.

| Element                     | Desktop                                           | Mobile                       |
| --------------------------- | ------------------------------------------------- | ---------------------------- |
| H1 display line             | `clamp(40px, 4.6vw, 68px)`, 600, −0.045em, lh 1.0 | 31–38px (30 on short phones) |
| H2                          | `clamp(30px, 3.4vw, 46px)`, 600, −0.035em         | 30px                         |
| Category / eyebrow          | 13px, 600, uppercase, 0.12em                      | 13px                         |
| Body                        | 15–18px, lh 1.6                                   | 15–16px                      |
| Smallest informational text | 13px                                              | **14px**                     |

The single H1 = category line ("Whiskcam · the cat collar camera") + display
line. The H1 never depends on the campaign.

## 4. Page structure

1. **Hero** `#hero` — category + headline; large lifestyle photo
   (`wk-cat-1.webp`, camera visible on the collar); a real-clip teaser under the
   photo (desktop); direct purchase: Original/Duo option cards with live
   Shopify prices, code note, one charcoal pill CTA, microSD line. No box
   around the purchase.
2. **Facts** — four hairline-separated numbers.
3. **Real clips** `#footage` — `--night` section, feature clip + two, captions
   only. No autoplay; one plays at a time.
4. **How it works** — `wk-cat-2.webp` beside three benefit-led beats and the
   `/start` guide.
5. **Shop** `#product` — gallery + full offer (specs, packs with taglines,
   kit, microSD, CTA, terms, delivery, phone details).
6. **Good to know** — four short items (offline, microSD, phone playback,
   comfort) + "Help comes in the box" (guide, email, refund policy).
7. Reviews (historical, disclosed) and FAQ `#faq` — homepage presentation via
   `compact` reviews and `FaqSection`, same data.
8. Help & reading list, footer.

Mobile ≤760px: title → photo (full-bleed, 160–260px) → purchase → intro.
Category, real photo, price and Add-to-bag are in the first screen at 360×740
and 390×844. The sticky bar appears after the hero when the main button is out
of view.

## 5. Components

- **Primary button** — charcoal pill, white text, 56px (48px in the sticky
  bar). Hover black, press 0.99. Disabled `#d9d4ca`.
- **Option cards** — white, 1px `--line`, 10px radius; selected = 2px ink
  ring. Native radio inputs (visually hidden), focus ring on the label.
- **Photos** — 4px radius, `object-fit: cover`, no filters, no overlays or
  badges on photos.
- **Rules** — 1px `--line` hairlines structure lists; one 1px ink rule above
  the service row.

## 6. Motion

Colour/scale transitions ≤0.2s only. No scroll animation, parallax, loops or
autoplay. `prefers-reduced-motion` removes transitions.

## 7. Accessibility & performance

AA contrast, 14px minimum on mobile, 44px targets, visible focus. `next/image`
with `sizes`; the hero photo is `priority`. The clip teaser reuses the
preloaded hero poster.

## 8. Don'ts

- No pixel fonts, scanlines, CRT effects, offset shadows, thick borders.
- No illustration or generated imagery presented as Whiskcam; never call
  lifestyle photos customer photos or footage.
- No hardcoded prices; derive from Shopify. No invented urgency.
- No generic SaaS cards, bento grids or glows.

## 9. Measurement and evidence

Product views now cover either visible buy panel, once per product with consent.
This definition changed on 26 October with the new hero purchase controls; its
view-to-cart ratio is not directly comparable with the earlier offer-only view.
CTA placements are bounded to hero, offer and sticky; video placements to
home_hero and home_footage. Analytics failures must not interrupt shopping.
Shopify paid orders and refunds remain the revenue reference. No uplift is
established at launch.

The owner's 28-day comparison is 13 orders before the September 25 change and
4 after (launch day excluded). Incomplete session tracking prevents computing a
reliable conversion-rate change or attributing that drop to the design.

Practical reference: [Shopify product-page guidance](https://www.shopify.com/blog/product-page)
for recognizable photography, benefit-led descriptions, transparent pricing and
an obvious purchase action. These are design principles, not a promised uplift.
