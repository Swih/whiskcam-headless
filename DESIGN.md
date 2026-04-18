# Whiskcam Design System

## 1. Visual Theme & Atmosphere

Whiskcam's design language is **warm premium minimalism** — a D2C pet brand that feels trustworthy, approachable, and modern without being cold or corporate. The brand sits between Apple's restrained elegance and the warmth of a lifestyle brand like Allbirds.

Every design decision serves one goal: **make the product feel inevitable**. The camera is small, the footage is magical, the experience is effortless. The design reflects this: clean layouts, generous whitespace, and a single bold accent color (amber) that draws the eye to action.

Photography is the hero. Real cat footage, real product shots. No stock photos. The design retreats to let content breathe.

**Key Characteristics:**
- DM Sans typeface — geometric, friendly, modern. Not cold, not playful.
- Warm neutral palette: near-black (`#1A1A1A`), warm off-white (`#F7F7F5`), true white for cards
- Single accent: amber (`#F5A623`) reserved for CTAs, overlines, and interactive highlights
- Light/warm section rhythm — avoids pure black sections (reserve dark for hero and special moments)
- Rounded but not bubbly — `8px` buttons, `12px` cards (not pill-shaped, not sharp)
- Product-first layouts — product shot and buy box always above the fold on desktop
- Clamp-based responsive typography — no abrupt text jumps between breakpoints

## 2. Color Palette & Roles

### Brand Core
| Token | Hex | Role |
|-------|-----|------|
| `wk-black` | `#1A1A1A` | Primary text, dark backgrounds, secondary buttons |
| `wk-dark` | `#0D0D0D` | Hero background, cinematic sections |
| `wk-amber` | `#F5A623` | Primary CTA, overline accents, highlights |
| `wk-amber-hover` | `#E09510` | CTA hover state |
| `wk-warm` | `#F7F7F5` | Alternate section backgrounds, trust strips |

### Grey Scale
| Token | Hex | Role |
|-------|-----|------|
| `wk-grey-50` | `#FAFAFA` | Hover backgrounds, subtle fills |
| `wk-grey-100` | `#F3F4F6` | Borders, dividers on white |
| `wk-grey-200` | `#E5E7EB` | Default borders, card outlines |
| `wk-grey-300` | `#D1D5DB` | Ghost button borders, disabled outlines |
| `wk-grey-400` | `#9CA3AF` | Placeholder text, inactive nav on dark |
| `wk-grey-500` | `#6B7280` | Body text (secondary), subtitles |
| `wk-grey-600` | `#4B5563` | Body text (primary weight), footer links |

### Functional
| Token | Hex | Role |
|-------|-----|------|
| `wk-red` | `#E74C3C` | Urgency badges, error states, sale prices |
| `wk-green` | `#27AE60` | Success states, in-stock indicators |

### Usage Rules
- **Amber appears ONLY on:** CTA buttons, overline text, free gift badges, price highlights
- **Never use amber for:** body text, backgrounds, borders, or decorative elements
- **Dark sections (`wk-dark`):** Reserved for hero and special moments. Most sections use `white` or `wk-warm`
- **Text on white:** Use `wk-black` for headings, `wk-grey-500` for body, `wk-grey-400` for tertiary
- **Text on dark:** Use `white` for headings, `wk-grey-400` for body

## 3. Typography

**Typeface:** DM Sans (Google Fonts) — weights 400, 500, 600, 700

### Scale

| Element | Size | Weight | Line Height | Letter Spacing | Notes |
|---------|------|--------|-------------|----------------|-------|
| H1 (Hero) | `clamp(2rem, 8vw, 4.5rem)` | 700 | 1.05 | -0.02em | One per page only |
| H2 (Section) | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | 1.15 | -0.02em | Section titles |
| H3 (Card) | `text-lg` (18px) | 600 | 1.3 | -0.02em | Card/feature titles |
| Body | `text-base` (16px) | 400 | 1.6 (relaxed) | normal | Descriptions, paragraphs |
| Body Small | `text-sm` (14px) | 400 | 1.5 | normal | Captions, metadata |
| Overline | `text-xs` (12px) | 600 | 1.0 | 0.1em | Uppercase, amber color |
| Label | `text-sm` (14px) | 600 | 1.0 | normal | Buttons, badges |
| Micro | `text-xs` (12px) | 500 | 1.0 | normal | Trust strip, footnotes |

### Rules
- All `h1`, `h2`, `h3` get `letter-spacing: -0.02em` (set globally in CSS)
- Use `clamp()` for responsive headlines — never use fixed sizes with breakpoint jumps
- Minimum readable text: **12px** on desktop, **14px** on mobile
- Never use `text-[11px]` or smaller for any user-facing text

## 4. Components

### Button
Three variants, three sizes:

| Variant | Class | Use |
|---------|-------|-----|
| `primary` | Amber bg, dark text, amber glow on hover | Main CTAs: "I Want This", "Add to Cart" |
| `secondary` | Dark bg, white text, subtle glow on hover | Secondary actions |
| `ghost` | Transparent, grey border, dark text | Tertiary: "Read more", "Show all" |

| Size | Padding | Font | Min Width |
|------|---------|------|-----------|
| `sm` | `px-5 py-2.5` | 14px | — |
| `md` | `px-7 py-3.5` | 15px | — |
| `lg` | `px-9 py-4` | 16px | 240px (desktop) |

All buttons: `rounded-[8px]`, `font-semibold`, `active:scale-[0.98]`, `transition-all duration-200`

### Section Wrapper
Three background modes: `white`, `warm`, `dark`
- Vertical padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Section Heading
Standard pattern for every content section:
- **Overline:** uppercase, xs, amber, 0.1em tracking, `mb-3`
- **Title:** H2, clamp-sized, bold, tight leading
- **Subtitle:** base size, grey-500, `max-w-2xl mx-auto`, `mt-4`
- Bottom margin: `mb-12 md:mb-16`

### Cards
- Background: white
- Border: `border border-wk-grey-100`
- Radius: `rounded-[12px]` (var `--radius-card`)
- Padding: `p-5 sm:p-7`
- Hover: `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- No gradient backgrounds, no colored borders

### Badges
- Shape: `rounded-full`
- Padding: `px-3 py-1` or `px-2.5 py-0.5`
- Font: `text-xs font-semibold`
- Colors: amber bg + dark text (highlight), grey-100 bg + grey-600 text (neutral)

## 5. Layout & Spacing

### Grid System
- Container: `max-w-7xl` (1280px) centered
- Padding: `px-4` (mobile) → `px-6` (sm) → `px-8` (lg)
- Standard grids:
  - 2-col: `lg:grid-cols-2 gap-8 lg:gap-14` (product section)
  - 3-col: `sm:grid-cols-2 lg:grid-cols-3 gap-5` (features, how it works)
  - 4-col: `grid-cols-2 md:grid-cols-4 gap-8` (stats)

### Spacing Scale (Tailwind defaults)
- Section vertical: `py-16` (64px mobile) → `py-24` (96px desktop)
- Between sections: handled by stacked section padding
- Heading to content: `mb-12` (48px) → `mb-16` (64px)
- Card internal: `p-5` (20px mobile) → `p-7` (28px desktop)
- Element gaps: `gap-3` (12px) → `gap-4` (16px) → `gap-8` (32px)

### Section Order (Conversion Funnel)
1. **Hero** — hook + product shot
2. **Social Proof Bar** — trust signals
3. **Video Showcase** — emotional proof (real footage)
4. **Product Section** — buy box (position 4 = above fold scroll)
5. **Reviews** — social validation
6. **Features Grid** — rational justification
7. **How It Works** — ease of use
8. **Comparison Table** — competitive advantage
9. **CTA Banner** — final push
10. **FAQ** — objection handling
11. **Footer** — trust + navigation

## 6. Depth & Motion

### Shadows
| Level | Value | Use |
|-------|-------|-----|
| None | — | Default state for most elements |
| `shadow-sm` | Tailwind default | Buttons at rest |
| `shadow-md` | Tailwind default | Cards on hover |
| `shadow-lg` | Tailwind default | Elevated cards, modals |
| Amber glow | `0 0 20px rgba(245,166,35,0.4)` | Primary button hover |
| Product hero | `0 20px 60px rgba(0,0,0,0.5)` | Hero product circle |

### Motion
- **Entrance animations:** Framer Motion `AnimatedElement` — fade up with slight Y translate
- **Hover transitions:** `transition-all duration-200 ease-out` (buttons), `duration-300` (cards)
- **Scale on press:** `active:scale-[0.98]` on all buttons
- **Card lift:** `hover:-translate-y-1` with shadow increase
- **Scroll behavior:** `scroll-behavior: smooth` globally
- **Reduced motion:** All animations honor `prefers-reduced-motion: reduce`

### Rules
- No bouncing, no elastic easing, no playful animations
- Subtle and confident: 200ms for interactions, 300ms for layout shifts
- Never animate color changes on text
- Carousels: snap scroll, no autoplay

## 7. Do's & Don'ts

### Do
- Use amber sparingly — it's the "buy" color
- Let content breathe with generous whitespace
- Use real cat footage and product photos
- Keep copy short, punchy, benefit-focused
- Round corners consistently (8px buttons, 12px cards)
- Dark hero, then alternate white/warm sections
- Put product buy box in the top 4 sections

### Don't
- Don't use more than one accent color
- Don't use gradients (background or text)
- Don't use colored borders or colored card backgrounds
- Don't use text smaller than 12px (14px minimum on mobile)
- Don't add decorative illustrations or icons — photography only
- Don't use parallax or scroll-hijacking
- Don't add urgency timers or fake countdown clocks
- Don't use more than 2 font weights per element
- Don't break the amber = action association

## 8. Responsive Strategy

### Breakpoints (Tailwind defaults)
| Name | Width | Typical Device |
|------|-------|----------------|
| Base | 0-639px | Mobile phones |
| `sm` | 640px+ | Large phones, small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Desktops |
| `xl` | 1280px+ | Large desktops |

### Mobile-First Rules
1. **Typography scales via `clamp()`** — no breakpoint jumps for headlines
2. **Grids collapse naturally:** 3-col → 2-col → 1-col
3. **Buttons are `w-full` on mobile**, `w-auto` on `sm:`
4. **Section padding:** `py-16` (mobile) → `py-24` (desktop)
5. **Container padding:** `px-4` → `px-6` → `px-8`
6. **Touch targets:** Minimum **44x44px** for all interactive elements
7. **Sticky ATC bar:** Visible only on mobile (`md:hidden`), respects `safe-area-inset-bottom`
8. **Product images:** Responsive sizes — 150px (mobile) → 200px (sm) → 300px (lg)
9. **Carousels:** Horizontal scroll with snap, visible overflow hints on edges
10. **Navigation:** Hamburger on mobile, inline links on `lg:`

### Performance Targets (Core Web Vitals 2026)
- **LCP:** < 2.5s — preload hero poster, priority on above-fold images
- **CLS:** < 0.1 — explicit dimensions on all images/videos, font-display: swap
- **INP:** < 200ms — minimal JS on interactive elements, no heavy client-side logic

## 9. Agent Prompts

When generating new components or sections for Whiskcam, follow these rules:

```
You are building UI for Whiskcam, a D2C pet collar camera brand.

DESIGN RULES:
- Use DM Sans font, Tailwind CSS v4, Framer Motion for animations
- Colors: wk-black (#1A1A1A), wk-amber (#F5A623), wk-warm (#F7F7F5)
- Amber is ONLY for CTAs and accent highlights — never for backgrounds or text
- Cards: white bg, border-wk-grey-100, rounded-[12px], p-5 sm:p-7
- Buttons: rounded-[8px], font-semibold, three variants (primary/secondary/ghost)
- Sections: use SectionWrapper (white/warm/dark) + SectionHeading (overline/title/subtitle)
- Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- Mobile-first: w-full buttons on mobile, clamp() for headlines, 44px min touch targets
- All text must use next-intl translations — no hardcoded strings
- Respect prefers-reduced-motion
- No gradients, no colored backgrounds on cards, no decorative illustrations
- Keep it clean, warm, premium. Think Apple warmth, not Apple coldness.
```
