# Grand polish pass — design spec

**Date:** 2026-07-30
**Status:** Approved, ready for implementation plan

## 1. Goal

The site's content, structure, and brand identity (warm gold/cream/ink) are right and stay as-is. This pass makes it feel **grander and more confident** — closer to the scale, restraint, and institutional weight of jpmorganchase.com — without adopting JPM's cooler navy/black/white palette or any dark/black sections. Everything stays on Finwave's existing light cream/paper surfaces.

Three qualities drive this pass, in order of what "grand" means here:

1. **Scale & confidence** — bigger type, more generous spacing, less crowding.
2. **Restraint & polish in motion/detail** — fewer, more consistent effects; tighter alignment and timing.
3. **Institutional trust signals** — leadership presence surfaced more prominently; stats read with more authority.

Explicitly out of scope: palette shift toward navy/black/corporate, new photography-led storytelling, any new content sections beyond surfacing existing leadership content on the homepage.

## 2. Type & scale

- Push the display headline scale up one notch across tiers (`xl`, `lg`, `md` in `globals.css` `@theme`), building on the existing measured leading work (xl 1.15, lg 1.15, md 1.20, sm 1.30) — tighten leading further at the largest sizes for a more compressed, confident hero headline.
- Increase internal padding/gaps in the hero, cards, and section heads: more vertical space between eyebrow → headline → deck → CTA row, not just larger font sizes.
- Bump section vertical rhythm again at `lg`/`xl` breakpoints only (building on the prior 128px → 144px change), so pages breathe more on desktop without going sparse on mobile.
- Hero specifically: larger, tighter-leaded headline on the existing cream/paper background; the quote card gets a touch more internal padding and can sit on the slightly brighter `--color-canvas` surface already defined, to read as the most-elevated object on the page (per the existing shadow ladder) — no color or darkness change, just scale and elevation.

## 3. Motion & detail polish

- Audit all existing motion primitives (`Reveal`, `Stagger`, hover-lift, glow/sweep utilities) and standardize on one or two signature motions used consistently; drop redundant or competing effects found along the way.
- Normalize easing/timing values so reveals feel snappy and deliberate, not decorative — fix any inconsistent per-component delays/durations found during the audit.
- Consistency pass (not new effects): unified `focus-visible` ring treatment, unified card elevation ladder (rest → hover, using the existing `--shadow-card`/`--shadow-soft`/`--shadow-rich` tokens), unified corner radii across cards/buttons/inputs.

## 4. Institutional trust

- Add a compact leadership teaser to the homepage: pulls from the existing real leadership content (`src/content/team.ts`, `LeadershipCard.tsx`) already used on `/about` — a short excerpt (name, title, photo, one line) with a link through to the full About leadership section. Not a new page, not new content — a homepage placement of what already exists.
- Re-weight `StatsBand` numbers to match the new type scale so credentials (years in FX, currencies, cities) read with more authority.
- No other new content sections. Everything else in scope is a polish/consistency pass on existing sections, not new material.

## 5. Scope

Applied consistently, in one pass, across:
- Home
- Services (`/services` + `/services/[slug]` detail)
- Rates
- About
- Contact
- Legal (`/privacy`, `/disclaimer`, etc.)

## 6. Constraints (must not break)

- **Static export**: `next.config.ts` has `output: "export"` — no server runtime, route handlers, or dynamic APIs. Check `node_modules/next/dist/docs/` before any framework-level change, per existing project convention.
- Preserve: routing + `generateStaticParams`, all `metadata`/`pageMetadata`/`JsonLd`/sitemap/robots, `ContactForm` submit logic (endpoint + mailto fallback), `MarketTicker` live fetch + fallback, all `src/content/*` data.
- Keep `src/content/content.test.ts` passing.
- Palette: no new colors, no dark/black sections anywhere on the site — stay within the existing `@theme` tokens in `src/app/globals.css`.
- Accessibility: semantic headings, keyboard nav, visible focus, WCAG-AA contrast, reduced-motion support maintained throughout.

## 7. Verification

- `npm run build`, `npm run test` clean.
- Manual responsive check at 390 / 768 / 1440.
- Reduced-motion check.
- Visual pass in browser across all in-scope pages before calling this done.
