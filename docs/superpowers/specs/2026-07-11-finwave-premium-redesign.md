# Finwave Forex — Premium Redesign Spec

**Date:** 2026-07-11
**Status:** Approved direction, spec under review
**Type:** UI/UX elevation ("deep overhaul") across all pages, preserving all business logic.

---

## 1. Goal

Elevate the Finwave Forex site from "well-built" to "world-class fintech," using the
money2abroad repository as a **design-language reference** (not a source to copy). Borrow
its editorial rigor and signature richness; keep Finwave's own **gold-on-paper** identity.

The visitor should immediately feel: *this is a credible, established forex desk.*

### Success criteria
- Every page shares one visible design system (type scale, spacing rhythm, card system, motion vocabulary).
- At least two genuine "wow" moments exist (live hero quote card; dark desk showcase).
- No business functionality, routing, SEO, form behavior, or ticker data source is broken.
- Lighthouse/perf stays high; a11y (keyboard, focus, contrast, reduced-motion) is preserved or improved.
- Passes `npm run build` (static export) and `npm run test`.

### Non-goals (YAGNI)
- No new backend, CMS, auth, or real transactional flows.
- No dark **mode** toggle (dark *sections* only).
- No new brand colors beyond the existing gold/paper/ink/accent tokens.
- No changes to content copy meaning (may restructure/relabel, not rewrite the business message).

---

## 2. What we borrow from money2abroad (and how it maps)

| Source device | Finwave application |
|---|---|
| Live hero "transfer" card w/ pulse dot, mono numerals, currency swap | Interactive `QuoteCard` fed by existing ticker feed, gold accent, "indicative · ask us" compliance kept |
| Dark product showcase + mock dashboard + floating annotations | New dark **"The Finwave desk"** section (near-black `ink`), mock quote/transaction panel + FX sparkline + annotation chips |
| Hairline cell grids (1px gaps) | Services rendered as bordered cell-grid; About values likewise |
| Editorial 2-col section head (title left, deck right) | New `SectionHeading` variant |
| Serif-italic emphasis in display type | Already present via `<Em>`; keep and apply consistently |
| Copper accent | **Not borrowed** — Finwave keeps gold (`--color-brand`) |

---

## 3. Design tokens (`src/app/globals.css`, `src/app/layout.tsx`)

Fonts unchanged: **Geist** (sans), **Instrument Serif** (display/italic), **Fragment Mono** (numerals).

**Type scale** — formalize and document as utility classes/conventions:
- `display` — hero H1: `Instrument Serif`, `clamp` ~3.5rem→6.5rem, `leading-[0.95]`, `tracking-[-0.03em]`.
- `title` — section H2: `Instrument Serif`, `clamp` ~2.25rem→3.5rem.
- `eyebrow` — Geist, 13px, semibold, tracking-wide, `ink` on a `sand` pill (existing pattern; formalize).
- `deck` — body-lead: 17–19px, `ink-soft`, `max-w-[60ch]`.
- `mono-num` — Fragment Mono, `tabular-nums`, `.tnum` (exists).

**Color usage rules (a11y):**
- Body text and labels: `ink` / `ink-soft`. **Never** raw `brand` (gold) for text on light backgrounds.
- `brand-deep` is the accessible gold for small text on light (`#9c6b00`).
- `brand` reserved for icons, dots, accents, focus rings, hover glows.
- Add a **positive/negative** pair for FX deltas (reuse the ticker's greens/reds; promote to `--color-pos` / `--color-neg`).

**Depth system** — keep `--shadow-rich`, `--shadow-rich-lg`; add `--shadow-soft` (level-1 rest state) so cards have a visible resting elevation, lifting to `-rich`/`-rich-lg` on hover.

**New utilities in `globals.css`:**
- `.hairline-grid` — `bg-hairline` container with `gap-px`, cells `bg-paper`/`bg-white`, outer rounded + `overflow-hidden`.
- Dark-surface helpers already available via `bg-ink` + white/opacity text; document the on-dark scale (`text-white`, `text-white/70`, `text-white/50`, hairlines `white/10`).
- Keep existing orb/marquee/gradient/sweep utilities.

---

## 4. Reusable components (new + refactors)

Goal: kill duplication so every page composes from the same primitives.

**New — `src/components/ui/`:**
- `Section` — wraps a section: props `variant?: "paper" | "sand" | "dark"`, `width?: "default" | "wide"`, `bordered?: boolean`; applies consistent `max-w-6xl`, responsive vertical padding, and bg/border per variant. Replaces the repeated `mx-auto max-w-6xl px-4 py-24 …`.
- `Card` — the white card used ~6 places (ServiceCard, About values, WhyFinwave visuals, form, teaser): consistent radius (`rounded-[20px]`), `--shadow-soft` rest → `-rich-lg` hover, optional gold corner-glow, optional hover-lift. Existing card markup migrates to it.
- `Eyebrow` — dot + label; used in section heads and dark sections.

**New — `src/components/motion/`:**
- `Stagger` — a container that staggers child `Reveal`s (replaces manual `delay={index * 0.08}` scattering; keep `Reveal` for one-offs).
- `ScrollProgress` — fixed 2px gold top bar driven by `useScroll`; reduced-motion → hidden.

**Refactor — existing:**
- `SectionHeading` — add `layout?: "stack" | "split"`; `split` renders title left / deck right, baseline-aligned (editorial), collapsing to stacked on mobile. `center`/`left` stack modes preserved.
- `ServiceCard` — reskin via `Card`; used by hairline grid on home, standalone grid on /services.
- `button.tsx` — keep `btn-sweep`; ensure `lg` sizing rhythm and built-in arrow-shift affordance are consistent. No API change.

---

## 5. Signature sections

### 5.1 Interactive `QuoteCard` (hero)
Upgrade the static card into a live-feeling one, **client component**, no new deps.
- Header: "Exchange quote" + live **pulse dot** ("Live indicative").
- Send row (USD) / receive row (INR) with **Fragment Mono** numerals; a **swap** control that animates rotate + row cross-fade (respects reduced-motion).
- Pull USD/INR (and one alt pair) from the **existing** `fawazahmed0` feed used by `MarketTicker` (extract the fetch into a small shared `lib/fx.ts` so both share one code path + fallback to `tickerQuotes`).
- "Rate refreshed · <relative time>" line in mono; **"Indicative · ask us for today's rate"** compliance kept, plus `RBI-approved` badge.
- Skeleton shimmer while first fetch resolves; illustrative fallback if fetch fails (never blank).

### 5.2 "The Finwave desk" dark showcase (new)
New section `src/components/sections/DeskShowcase.tsx`, **lazy-loaded**, dark (`bg-ink`), replacing `WhyFinwave`'s "three steps" visual (its copy is preserved as the section intro).
- Left: editorial eyebrow + serif title + deck ("From quote to cash…").
- Right: a **mock desk panel** on `#131311`-style surface: a small quote summary, a short indicative-transaction list (illustrative, clearly labeled), and a lightweight inline **SVG FX sparkline** (static path, no chart lib).
- 1–2 **floating annotation chips** (gold pill + connector dot) e.g. "RBI-approved", "Rate bettered". Hidden < lg.
- Radial gold glow accent (reuse gradient utility). All motion reduced-motion-gated. Everything clearly **illustrative** to stay compliant.

### 5.3 Hairline services grid
On home, render services via `.hairline-grid`: numbered cells (`01`–`04` mono), icon, name, blurb, "Learn more" link; hover raises cell bg. `/services` keeps a larger 2-col `Card` grid for detail.

---

## 6. Page-by-page

**Home (`src/app/page.tsx`)** — order:
`MarketTicker` → `Hero` (live QuoteCard) → hairline `ServicesGrid` → `DeskShowcase` (dark) → editorial `WhyFinwave` (split heads) → `RatesTeaser` (live mini values) → `StatsBand` (bordered/sand) → `PullQuote` → `CitiesSection` → `CtaBand`.

**Services (`/services`, `/services/[slug]`)** — editorial split hero; `Card` grid; detail page gets a cleaner two-column layout (overview + features + steps timeline + FAQs) via existing `ServiceDetail`, reskinned to the system.

**Rates (`/rates`)** — ticker on top; disclaimer card; table gets sticky header, `mono` `tabular-nums`, zebra/hover, and where the shared `lib/fx.ts` feed has a value, show a subtle live indicative figure next to "Ask us" (still compliance-safe). Elegant, not busy.

**About (`/about`)** — split hero; a compact **story/milestones** block (decade of exchange); values as `.hairline-grid`; `StatsBand`; the `TODO: Leadership` block is **removed from render until real content exists** (kept in content/comments, not shown). CTA.

**Contact (`/contact`)** — split layout kept; inputs reskinned for consistent radius/height/focus-visible; the `select` restyled to match `Input`; add a small trust/assurance sidebar (RBI, KYC, cities). Form logic untouched.

**Legal (`/privacy`, `/terms`)** — consistent heading + prose spacing via shared styles (existing `LegalArticle`).

---

## 7. Motion & polish
- `ScrollProgress` gold bar (2px) in `layout.tsx`.
- **Route transitions:** App Router `template.tsx` with a subtle fade/rise on `children` (framer-motion). Must verify against `node_modules/next/dist/docs` that `template.tsx` behaves as expected under **static export** before relying on it; if not viable, fall back to per-page `Reveal` on the top section.
- Stagger reveals via `Stagger`; skeletons for async QuoteCard/rates; unified `focus-visible` ring.
- Everything gated by `prefers-reduced-motion` (extend existing media-query blocks).

---

## 8. Constraints / must-not-break
- **Framework:** read `node_modules/next/dist/docs/` before any framework-level change (fonts, `Image`, `template.tsx`, metadata, export) — per `AGENTS.md`.
- **Static export** (`output: "export"`): no server runtime, route handlers, or dynamic APIs. All new data (FX) stays client-fetched with static fallback.
- Preserve: routing + `generateStaticParams`, all `metadata`/`pageMetadata`/`JsonLd`/sitemap/robots, `ContactForm` submit logic (endpoint + mailto fallback), `MarketTicker` fetch/fallback, all `src/content/*` data (values may be reused, not deleted).
- Keep `src/content/content.test.ts` passing; add tests only if new pure logic is introduced (e.g. `lib/fx.ts` formatting).
- Accessibility: semantic headings, keyboard nav, visible focus, WCAG-AA contrast (enforced by the color-usage rules in §3), reduced-motion.
- Performance: minimize new `"use client"`; lazy-load `DeskShowcase`; no new heavy deps (no chart lib — inline SVG).

---

## 9. Rollout / sequencing (for the plan)
1. Tokens + `globals.css` utilities + color-usage cleanup.
2. Primitives: `Section`, `Card`, `Eyebrow`, `Stagger`, `ScrollProgress`; `SectionHeading` split mode.
3. `lib/fx.ts` extraction (+ test); refactor `MarketTicker` onto it.
4. Signature: `QuoteCard` (live) → `DeskShowcase` → hairline services grid.
5. Page passes: Home → Services(+detail) → Rates → About → Contact → Legal.
6. Motion polish: `ScrollProgress`, route transitions (doc-checked), skeletons.
7. Verify: `npm run build`, `npm run test`, manual responsive/a11y/reduced-motion check; visual pass in browser.

Each step ends buildable; commit clean, production-quality increments.
