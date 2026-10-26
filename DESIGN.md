# Whiskcam Design System — "A film by your cat"

The homepage is the store. Its design job is to make one small, honest product
feel like a brand worth buying from, and to keep the purchase obvious.

## 1. Brand idea

**Whiskcam turns your cat into the director.** A 24 g camera on the collar
records their rounds offline; you watch the cut when they come home. The brand
borrows the language of film and tape — premiere, screening, box office, tape
numbers — and the look of a sampled signal: big pixel type, scanlines, hard
offset shadows on a cream canvas.

- **Who it is for:** owners who wonder what their cat does all day and are
  happy to watch afterwards (not live, not GPS, not at night).
- **The moment:** opening the card in the evening and seeing their day from
  collar height.
- **Why buy from us:** real sample clips before ordering, a first-film guide in
  four languages, phone/AVI playback help, a person on email, and a plain
  30-day refund policy (return shipping normally paid by the customer).

Copy never says _live_, _signal from your cat_, _streaming_ or anything that
implies transmission. The signal aesthetic is visual only.

Reference: the public preview of Scrolltide's _Mitten_ hero (large pixel
headline left, scanline cat portrait right, faint ghost echo, minimal mono
nav, ~12 fps feel). We use the composition principles only; no template code,
footage or prompt was used. Everything is implemented with our own CSS/SVG.

## 2. Colour

Defined as CSS variables on `.storefront` in
`components/landing/storefront-v2.module.css`. The season changes only the
accent family; layout and type never depend on it.

| Token             | Evergreen | Halloween | Autumn    | Role                                   |
| ----------------- | --------- | --------- | --------- | -------------------------------------- |
| `--ink`           | `#1b1a17` | —         | —         | Text, rules, buttons, dark sections    |
| `--paper`         | `#f3ecdf` | —         | —         | Hero canvas, alternate sections        |
| `--sheet`         | `#fbf7ef` | —         | —         | Page and ticket background             |
| `--muted`         | `#59554b` | —         | —         | Secondary text (6:1 on paper)          |
| `--line`          | `#d9cfbd` | —         | —         | Hairlines                              |
| `--accent`        | `#8a4a12` | `#a8390a` | `#94510f` | Accent **text** on cream (≥ 5:1)       |
| `--accent-on-ink` | `#f2b75e` | `#ff9a52` | `#f0b46a` | Accent text on ink                     |
| `--pop`           | `#f5a623` | `#ff6b1a` | `#e08a2c` | Fills only: hard shadows, chips, strip |
| `--glow`          | `#e6dbc5` | `#ff7a22` | `#e9a95a` | The striped moon behind the portrait   |

Rules:

- Fill colours (`--pop`, `--glow`) never carry text except ink text on `--pop`
  (≥ 6:1). Accent text uses `--accent` / `--accent-on-ink`.
- No gradients other than the scanline/stripe patterns. No glows, no glass.

## 3. Typography

- **Display — "Whiskcam Signal"**: self-hosted Silkscreen
  (`public/fonts/Silkscreen-Regular.ttf`, SIL OFL 1.1, licence in
  `public/fonts/OFL-Silkscreen.txt`), declared in
  `components/landing/pixel-art.module.css`, `font-display: swap`, falling back
  to the system monospace. Always uppercase. Use via the exported
  `signalType` class.
  - Use for: H1 display line, H2s, eyebrows, nav links, tape/timecode labels,
    step numbers, campaign names and codes.
  - Never for: body copy, prices, legal/terms, form controls.
- **Text — DM Sans** (existing `next/font`), 400–700.

| Element                     | Desktop                   | Mobile                    |
| --------------------------- | ------------------------- | ------------------------- |
| H1 display (pixel)          | 64px (56 ≤1100, 48 ≤1000) | 40px (34 on short phones) |
| H2 (pixel)                  | 40px                      | 28px                      |
| Eyebrow (pixel)             | 14px                      | 14px                      |
| Body                        | 15–17px                   | 15–16px                   |
| Smallest informational text | 13px                      | **14px**                  |

The single H1 is the category descriptor ("Whiskcam cat collar camera") plus
the pixel line ("A film by your cat."). It is campaign-neutral so the
server-rendered H1 never changes.

## 4. Components

- **Category slate** — ink chip with the pixel cat mark; part of the H1.
- **Box-office ticket** (hero buy panel) — 2px ink border, hard 8px `--pop`
  shadow, square corners. Real product photo, kit line, facts, Original/Duo
  toggle with live Shopify prices (code price + "without the code" price
  during a campaign), direct **Add to bag**, microSD note, link to `#product`.
  Shares selection, pending and error state with the `#product` offer and the
  sticky bar — there is one cart state, not three.
- **Primary button** — ink background, cream text, square, hard `--pop`
  offset shadow; hover lifts 2px, press sinks 3px, in `steps()`. Disabled:
  `#d6cebf`, no shadow. Minimum height 56px (48px in the sticky bar).
- **Scanline portrait** (`components/landing/signal-portrait.tsx`) — an
  existing real photo (`/images/lifestyle/wk-cat-2.webp`, camera visible on the
  collar), grayscale + `multiply` on the canvas, cream rules every 5px, an
  offset seasonal ghost echo, a striped moon behind. A **Full colour** toggle
  removes the treatment. It is never presented as camera footage.
- **Real-clip monitor** — desktop-only ink tile with the hero poster; plays the
  real 0:22 clip in the screening section.
- **Spec strip** — pixel labels separated by sprites; ink (evergreen) or
  orange (Halloween).
- **Screening** (`#footage`) — ink section, real clips only, tape labels, one
  plays at a time, no autoplay.
- **Fit checklist** — honest "good fit if / choose something else if" with
  pixel tick and cross; followed by the three setup steps.
- **Credit roll** — numbered list of what buying from Whiskcam actually
  includes; every item links to something real.
- **Sprites** (`components/landing/pixel-art.tsx`) — original cat, pumpkin,
  bat, leaf, drawn as crisp SVG rects. `X` = `currentColor`, `O` =
  `--pixel-accent`. Decorative (`aria-hidden`) unless titled.

## 5. Seasons

`useHalloweenCampaign()` sets `data-season` on `.storefront`:

| State       | Dates (Paris)                   | Visual                                                                                                                    |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `halloween` | until 31 Oct 23:59              | Orange accents, striped orange moon, bats + pumpkin, "Little Monsters" premiere credit, orange strip, pumpkin ticket stub |
| `autumn`    | 1–8 Nov 23:59                   | Amber accents, leaves, "autumn screening"                                                                                 |
| `evergreen` | otherwise (and on first render) | Amber accents, pale moon, no seasonal sprites                                                                             |

The countdown is the fixed Shopify deadline only. Never add per-visitor
timers, stock pressure or invented scarcity.

## 6. Motion

- Portrait scans in once (`steps(10)`, 0.8s). The ghost echo jumps a few times
  then rests. Bats flap a few times then rest. **No infinite loops.**
- On fine pointers only, the ghost follows the pointer at ~12 updates/s in
  3px steps (`--gx/--gy`). Touch devices get no pointer motion.
- Buttons move in `steps(2)`.
- `prefers-reduced-motion: reduce` removes all animation and transitions.
  `prefers-reduced-data: reduce` drops the ghost and the moon.
- No scroll hijacking, parallax, autoplaying video or audio.

## 7. Layout

- Hero (desktop): `title / intro / ticket` in a ≤500px left column, portrait
  stage on the right (min 620px tall).
- Hero (mobile ≤760px): title → portrait (190px, 130px on short phones) →
  ticket overlapping the portrait by ~48px → intro. Category, price and the
  add button sit in the first screen at 390×844 and 360×740.
- Section order: hero → spec strip → screening `#footage` → details
  `#product` → fit checklist + steps → credit roll → reviews + FAQ `#faq` →
  help & reading → footer. Anchors `#product`, `#footage`, `#faq` are stable.
- Containers: content max ≈1240px; side padding 32px desktop, 24px tablet,
  16px mobile.
- Sticky buy bar (mobile): ink, appears after the hero when the main add
  button is off-screen; respects the safe-area inset.

## 8. Accessibility & performance

- AA contrast for all text; 14px minimum on mobile; 44px minimum targets.
- Focus: 3px `--focus` outline, 4px offset (accent-on-ink inside dark
  sections). Radio toggles keep native inputs (visually hidden) and show focus
  on the label.
- Images: `next/image` with explicit `sizes`; only the portrait and the ticket
  product shot are `priority`. The pixel font is ~tens of KB, self-hosted, no
  network font fetches.

## 9. Don'ts

- Don't present the treated portrait, sprites or any artwork as camera footage.
- Don't filter real footage or product photos into illegibility; the product
  must stay identifiable.
- Don't use the pixel face for paragraphs, prices or legal text.
- Don't introduce rounded "SaaS cards", glowing panels or bento grids.
- Don't add WebGL, new animation libraries or fonts loaded from a network.
- Don't add fake review badges, aggregate ratings, "verified" claims, or
  free-return / risk-free promises.
- Don't hardcode prices; derive them from the Shopify product objects.

## 9. Measurement

Product views start when either buy panel is visible, once per product and only
with consent. This definition changed on 26 October when the hero became a buy
panel; do not compare the resulting view-to-cart ratio directly with the old
offer-only measurement. Add-to-cart events identify `hero`, `offer` or `sticky`.
Video events identify `home_hero` or `home_footage`. Umami accepts only these
bounded placement values and never receives cart IDs or form content.

Analytics failures must never turn a successful Shopify add into a cart error.
Shopify paid orders and refunds remain the revenue reference. The redesign has
no measured conversion uplift at launch.
