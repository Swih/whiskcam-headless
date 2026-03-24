# Gallery Mobile UX — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Replace mobile pill-dots with an Instagram Stories-style progress bar + slide counter, add a real peek-of-next-slide effect, and show thumbnails on both mobile and desktop.

**Architecture:** Single-file rewrite of `ProductGallery` in `product-section.tsx`. Introduce a CSS-transform sliding track (all slides laid out horizontally, translateX controls the viewport). Container is `overflow-hidden aspect-square`, so the peek is achieved by making each slide slightly narrower than the container (`containerWidth - PEEK_PX - GAP_PX`), leaving the leading edge of the next slide visible on the right. ResizeObserver + useLayoutEffect give accurate pixel measurements without hydration flashes.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript 5.8

---

## Key Geometry

```
Container width = W
PEEK_PX = 20   (pixels of next slide visible)
GAP_PX  = 8   (gap between slides)
slideW  = W - PEEK_PX - GAP_PX   (mobile only; desktop = W)
trackX  = -(active × (slideW + GAP_PX))
```

Verification at W=390 (iPhone 14):
- slideW = 362, slideW+GAP = 370
- active=0 → slide 1 starts at 370, visible window 0..390 → peek = 20px ✓
- active=1 → slide 2 starts at 370 in container → same 20px peek ✓

Peek is MOBILE-only. Desktop (`window.matchMedia('(max-width:1023px)') = false`) uses `slideW = W`, no peek.

---

## File Changes

| File | Action |
|------|--------|
| `components/landing/product-section.tsx` | Modify `ProductGallery` function only |

No new files. No new dependencies.

---

## Overlay Stack (inside main container)

```
z-10  image/video/infographic (sliding track)
z-20  story bar (top, lg:hidden)
z-20  counter "1/N" (top-right, lg:hidden)
z-20  best-seller badge (top-left, slide 0 only — drops below story bar on mobile)
z-20  social proof pill (bottom-centre, slide 0 only)
z-30  nav arrows
```

Story bar positioning: `absolute top-0 left-0 right-0, px-3 pr-12 pt-3` — right padding leaves 48px clear for the counter badge (≈36px wide at right-3).

Badge position: `top-3` on desktop, `top-8` on mobile (below story bar).

---

## Task 1 — Sliding track + peek

**Files:** `components/landing/product-section.tsx` — `ProductGallery` function

- [ ] Add `useLayoutEffect` to React import
- [ ] Add state: `containerWidth` (number, 0), `isMobile` (boolean, false)
- [ ] Add refs: `containerRef` (HTMLDivElement), `thumbnailStripRef` (HTMLDivElement)
- [ ] `useLayoutEffect`: measure `containerRef.offsetWidth` + ResizeObserver on mount
- [ ] `useEffect`: `window.matchMedia('(max-width: 1023px)')` → set `isMobile`
- [ ] Derive `slideW`, `trackX` from geometry formula above
- [ ] Cap media to **7 items max**: `allMedia.slice(0, 7)`
- [ ] Change `goNext`/`goPrev` from wrapping to **clamped** (`Math.min`/`Math.max`) — linear carousel
- [ ] Replace single-media `absolute inset-0` render with **horizontal track div**:
  - `absolute top-0 left-0 bottom-0 flex`
  - inline style: `width`, `gap`, `transform: translateX(...)`, `transition: transform 0.32s cubic-bezier(...)`, `willChange: transform`
  - Each slide: `relative flex-none overflow-hidden`, `width: slideW`, `height: 100%`, `borderRadius: 1rem`
- [ ] Apply `lg:group-hover:scale-110` zoom only on **current** image slide (not all slides)
- [ ] `priority` on first slide only; `loading="lazy"` on others

---

## Task 2 — Story bar (replaces dots)

**Files:** same

- [ ] Remove existing pill-dots block (`{/* Mobile: pill-progress dots */}`)
- [ ] Add story bar INSIDE the main container, `absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 pr-12 pt-3 pointer-events-none lg:hidden`
- [ ] Each segment: `h-[3px] flex-1 rounded-full transition-colors duration-300`
  - `i < active` → `bg-white/80`
  - `i === active` → `bg-wk-amber`
  - `i > active` → `bg-white/25`
- [ ] No click handlers on segments (visual only — thumbnails handle navigation)

---

## Task 3 — Slide counter "1/N"

**Files:** same

- [ ] Add INSIDE main container: `pointer-events-none absolute right-3 top-2.5 z-20 lg:hidden`
- [ ] Content: `<span className="rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">{active + 1}/{total}</span>`

---

## Task 4 — Adjust badge position for story bar

**Files:** same

- [ ] Best-Seller badge: add `lg:top-3` + `top-8` so it clears the story bar on mobile but stays at top on desktop
- [ ] Keep all other first-slide overlays unchanged

---

## Task 5 — Thumbnails on mobile (show always)

**Files:** same

- [ ] Change thumbnail strip from `hidden ... lg:flex` → `flex` (always visible)
- [ ] Keep `overflow-x-auto scrollbar-hide scroll-smooth` and existing styling

---

## Task 6 — Build check + commit + push

- [ ] Run `cd whiskcam-headless && npm run build`
- [ ] Fix any TypeScript/ESLint errors
- [ ] Commit with conventional message
- [ ] `git push origin master`

---

## Visual QA Checklist

- [ ] Mobile: story bar visible, segments progress as you swipe
- [ ] Mobile: counter "1/7" (or actual total) top-right
- [ ] Mobile: first slide shows Best-Seller badge BELOW story bar (not overlapping)
- [ ] Mobile: swipe right → next slide with 20px peek of next-next slide
- [ ] Mobile: thumbnails visible below, active one highlighted
- [ ] Desktop: no story bar, no counter; zoom-on-hover works; thumbnails below
- [ ] Desktop: no peek (slide fills full width)
- [ ] Last slide: no peek (blank container bg on right is acceptable)
- [ ] Build passes with 0 TypeScript errors
