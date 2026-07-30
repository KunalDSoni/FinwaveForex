# Grand Polish Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make finwaveforex.com feel grander and more confident — closer to jpmorganchase.com's scale, restraint, and institutional weight — entirely within Finwave's existing light cream/gold/ink palette, with no dark or black sections.

**Architecture:** This is a styling/composition pass over an existing Next.js 16 (App Router, static export) site. No new dependencies, no new routes, no server logic. Changes are: (a) token/utility edits in `globals.css` and `section.tsx` that cascade to every page automatically, (b) a motion-easing consolidation (DRY fix), (c) targeted component edits (numbering, stats sizing, one new homepage section), (d) reuse of an existing but under-used component (`StatsBand`) to remove a duplicate.

**Tech Stack:** Next.js 16 (static export), React 19, Tailwind CSS 4 (`@theme`/`@layer utilities` in `globals.css`), Framer Motion, Vitest.

## Global Constraints

- Static export (`next.config.ts` → `output: "export"`): no server runtime, route handlers, or dynamic APIs. Check `node_modules/next/dist/docs/` before any framework-level change.
- No new colors, no dark/black sections anywhere — every change must stay within the existing `@theme` tokens in `src/app/globals.css` (`--color-paper`, `--color-ink`, `--color-brand`, `--color-canvas`, etc.). Do not introduce `bg-ink`/`variant="dark"` sections.
- Preserve: routing + `generateStaticParams`, all `metadata`/`pageMetadata`/`JsonLd`/sitemap/robots, `ContactForm` submit logic, `MarketTicker` live fetch + fallback, all `src/content/*` data as factual source (no invented figures).
- Keep `src/content/content.test.ts` passing throughout — run `npm run test` after every task.
- Accessibility: keep all `focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none` patterns, keep `prefers-reduced-motion` branches in every motion component untouched in behavior.
- This codebase has no component-level test framework (only `vitest` over `src/content/*` pure data). Verification for styling/composition tasks is: `npm run build` (typecheck + static export succeeds), `npm run lint`, `npm run test` (content data only), and a manual visual check via the dev server/browser — not new unit tests, since there is no logic to unit-test in these changes.

---

### Task 1: Consolidate the duplicated motion easing constant

**Files:**
- Create: `src/lib/motion.ts`
- Modify: `src/components/motion/Reveal.tsx:1-6`
- Modify: `src/components/motion/Stagger.tsx:1-7`
- Modify: `src/components/motion/RevealScale.tsx:1-6`
- Modify: `src/components/motion/MaskText.tsx:1-6`

**Interfaces:**
- Produces: `export const EASE: readonly [number, number, number, number]` from `src/lib/motion.ts`, used as a Framer Motion `transition.ease` value.

The same `const EASE = [0.21, 0.47, 0.32, 0.98] as const;` is currently copy-pasted in four motion primitive files. This is the concrete "audit motion primitives, standardize timing" step from the spec (§3) — one source of truth means a future timing change updates every reveal/stagger/mask animation at once instead of drifting.

- [ ] **Step 1: Create the shared constant**

```typescript
// src/lib/motion.ts
/** Shared ease curve for every scroll-reveal/mask/stagger animation on the site. */
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;
```

- [ ] **Step 2: Update `Reveal.tsx` to import it**

Replace the local `const EASE = [0.21, 0.47, 0.32, 0.98] as const;` line with:

```typescript
import { EASE } from "@/lib/motion";
```

Remove the now-unused local declaration.

- [ ] **Step 3: Update `Stagger.tsx`, `RevealScale.tsx`, `MaskText.tsx` the same way**

Same substitution: import `EASE` from `@/lib/motion`, delete each file's local `const EASE = …` line. Leave every other line (including each file's use of `EASE` inside `transition={{ ... ease: EASE }}`) unchanged.

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors; no unused-import or unused-const warnings.

- [ ] **Step 5: Commit**

```bash
git add src/lib/motion.ts src/components/motion/Reveal.tsx src/components/motion/Stagger.tsx src/components/motion/RevealScale.tsx src/components/motion/MaskText.tsx
git commit -m "refactor: consolidate motion easing into a shared constant"
```

---

### Task 2: Push the display type scale and section rhythm up a notch

**Files:**
- Modify: `src/app/globals.css:254-292` (`.display-xl` through `.lead`)
- Modify: `src/components/ui/section.tsx:38`

**Interfaces:**
- Produces: same class names (`.display-xl`, `.display-lg`, `.display-md`, `.display-sm`), only their `font-size`/`line-height` values change — every consumer (`Hero`, `SectionHeading`, `WhyFinwave`, etc.) picks up the new scale automatically with no code change.

- [ ] **Step 1: Increase display scale sizes and tighten leading**

In `src/app/globals.css`, replace the four display rules:

```css
  .display-xl {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(3rem, 6vw, 5.25rem);
    line-height: 1.08;
    letter-spacing: -0.02em;
  }
  .display-lg {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.5rem, 4.6vw, 4rem);
    line-height: 1.1;
    letter-spacing: -0.018em;
  }
  .display-md {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(1.875rem, 2.9vw, 2.75rem);
    line-height: 1.16;
    letter-spacing: -0.015em;
  }
  .display-sm {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: clamp(1.3rem, 1.8vw, 1.625rem);
    line-height: 1.28;
    letter-spacing: -0.01em;
  }
```

- [ ] **Step 2: Bump section vertical rhythm at `lg`**

In `src/components/ui/section.tsx`, find:

```typescript
          "mx-auto px-5 py-24 sm:px-6 lg:px-8 lg:py-36",
```

Replace with:

```typescript
          "mx-auto px-5 py-24 sm:px-6 lg:px-8 lg:py-40",
```

(144px → 160px on desktop only; mobile/tablet `py-24` untouched so nothing feels sparse below `lg`.)

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `/` in a browser at 1440px width. Confirm the hero headline, section titles, and inter-section spacing look larger/roomier without wrapping awkwardly or overflowing their containers. Check `/services`, `/about`, `/rates` too, since `display-md`/`display-sm` are used in their `SectionHeading`s.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no overflow/layout errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/ui/section.tsx
git commit -m "design: push display type scale and section rhythm up a notch"
```

---

### Task 3: Give the hero quote card more elevation and breathing room

**Files:**
- Modify: `src/components/sections/QuoteCard.tsx:201-202`
- Modify: `src/components/sections/Hero.tsx:36-44` (headline block spacing)

**Interfaces:**
- No prop/type changes — purely class-level.

- [ ] **Step 1: Increase the quote card's outer padding and rounding to read as more elevated**

In `src/components/sections/QuoteCard.tsx`, find:

```typescript
    <div className="shadow-quote mx-auto w-full max-w-md rounded-[26px] bg-white p-2.5">
      <div className="rounded-[19px] border border-hairline-soft bg-canvas">
```

Replace with:

```typescript
    <div className="shadow-quote mx-auto w-full max-w-lg rounded-[28px] bg-white p-3">
      <div className="rounded-[21px] border border-hairline-soft bg-canvas">
```

(`max-w-md` → `max-w-lg` gives the card more presence next to the now-larger headline; padding and radii scale up proportionally with it.)

- [ ] **Step 2: Give the hero headline block more vertical separation from the badge above it**

In `src/components/sections/Hero.tsx`, find:

```typescript
          <MaskText
            as="h1"
            lines={[
              <Fragment key="l1">The clearer way</Fragment>,
              <Fragment key="l2">
                to exchange <Em>currency.</Em>
              </Fragment>,
            ]}
            delay={0.1}
            className="display-xl mt-7 text-balance"
          />
```

Replace `className="display-xl mt-7 text-balance"` with `className="display-xl mt-9 text-balance"`.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, view `/` at 1440px and 768px. Confirm the quote card doesn't overflow its grid column on tablet, and the extra spacing above the headline doesn't push the trust-points row (`ul` at the bottom of the hero) below the fold awkwardly.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/QuoteCard.tsx src/components/sections/Hero.tsx
git commit -m "design: give the hero quote card more scale and breathing room"
```

---

### Task 4: Extend the numbered-cell pattern to WhyFinwave pillars and CitiesSection

**Files:**
- Modify: `src/components/sections/WhyFinwave.tsx:70-73`
- Modify: `src/components/sections/CitiesSection.tsx:28-38`

**Interfaces:**
- No new props — reuses the existing `tnum` utility class and absolute-positioned index-number pattern already established in `ServiceCard.tsx` (`variant="cell"`) and `HowItWorks.tsx`.

This is the "numbered editorial section heads" technique from the spec's §2a JPM-translation table, extended to two more grids that don't yet have it.

- [ ] **Step 1: Add index numbers to the WhyFinwave pillar cards**

In `src/components/sections/WhyFinwave.tsx`, find:

```typescript
          <Reveal key={pillar.eyebrow} delay={index * 0.12} className="h-full">
            <Card hover glow className="h-full gap-0 p-8 lg:p-10">
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                <pillar.icon className="size-6" aria-hidden />
              </span>
```

Replace with:

```typescript
          <Reveal key={pillar.eyebrow} delay={index * 0.12} className="h-full">
            <Card hover glow className="relative h-full gap-0 p-8 lg:p-10">
              <span className="tnum absolute top-8 right-8 text-xs font-medium text-ink-soft/45 lg:top-10 lg:right-10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                <pillar.icon className="size-6" aria-hidden />
              </span>
```

- [ ] **Step 2: Add index numbers to the CitiesSection hairline cells**

In `src/components/sections/CitiesSection.tsx`, find:

```typescript
            <Reveal
              key={city}
              delay={index * 0.06}
              className="hairline-cell flex items-center gap-3 px-6 py-6"
            >
              <MapPin className="size-4 shrink-0 text-brand-deep" aria-hidden />
              <span className="font-medium tracking-tight">{city}</span>
```

Replace with:

```typescript
            <Reveal
              key={city}
              delay={index * 0.06}
              className="hairline-cell relative flex items-center gap-3 px-6 py-6"
            >
              <span className="tnum absolute top-4 right-5 text-[11px] font-medium text-ink-soft/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <MapPin className="size-4 shrink-0 text-brand-deep" aria-hidden />
              <span className="font-medium tracking-tight">{city}</span>
```

- [ ] **Step 3: Visual check**

Run: `npm run dev`, view `/` (WhyFinwave section) and the Cities section on `/`. Confirm the numbers don't overlap the "Head office" badge in CitiesSection (badge is `ml-auto` on the right, number is `top-4 right-5` — check they don't collide at narrow widths; if they do, move the number to `top-4 left-5` instead of right).

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/WhyFinwave.tsx src/components/sections/CitiesSection.tsx
git commit -m "design: extend numbered-cell pattern to WhyFinwave and CitiesSection"
```

---

### Task 5: De-duplicate the stats grid and re-weight it for more authority

**Files:**
- Modify: `src/components/sections/StatsBand.tsx:15`
- Modify: `src/components/sections/WhyFinwave.tsx:1-11,89-104`
- Modify: `src/app/page.tsx` (no import changes needed — `WhyFinwave` already imported)

**Interfaces:**
- `StatsBand` keeps its existing signature: `StatsBand({ innerClassName }: { innerClassName?: string })`.
- Consumes: `siteConfig.stats` (unchanged).

`WhyFinwave.tsx` currently duplicates `StatsBand`'s stats grid inline instead of using the component (found during the codebase audit). This is the concrete "re-weight StatsBand" requirement from spec §4 — but re-weighting only the standalone `StatsBand` (used on `/about`) would leave the homepage's inline duplicate on the old, smaller scale. Fixing both means removing the duplicate and reusing the component.

- [ ] **Step 1: Bump `StatsBand`'s number size**

In `src/components/sections/StatsBand.tsx`, find:

```typescript
            <p className="tnum text-5xl font-semibold tracking-[-0.04em] lg:text-6xl">
```

Replace with:

```typescript
            <p className="tnum text-6xl font-semibold tracking-[-0.045em] lg:text-7xl">
```

- [ ] **Step 2: Remove the duplicate inline stats grid from `WhyFinwave.tsx` and render `StatsBand` instead**

In `src/components/sections/WhyFinwave.tsx`, remove this block entirely (it currently sits after the pillars `<div>` and before the closing `</Section>`):

```typescript
      {/* Proof numbers close the same argument, so they live here rather than in
          a separate band two scrolls away. */}
      <div className="hairline-grid mt-5 sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.1}
            className="hairline-cell px-7 py-10 sm:px-8"
          >
            <p className="tnum text-4xl font-semibold tracking-[-0.03em] lg:text-5xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-ink-soft">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

Replace the closing with:

```typescript
    </Section>
  );
}
```

Then, in `src/app/page.tsx`, add a `StatsBand` import and render it directly after `<WhyFinwave />`:

```typescript
import { StatsBand } from "@/components/sections/StatsBand";
```

```typescript
      <WhyFinwave />
      <StatsBand />
      <RatesTeaser />
```

- [ ] **Step 3: Clean up now-unused imports in `WhyFinwave.tsx`**

Remove the `CountUp` import (`import { CountUp } from "@/components/motion/CountUp";`) and the `siteConfig` import if `siteConfig.stats` is no longer referenced anywhere else in the file — check with `grep -n "siteConfig" src/components/sections/WhyFinwave.tsx` first, since `WhyFinwave` may still need it for nothing else (it doesn't, per current content — safe to remove both imports).

- [ ] **Step 4: Visual check**

Run: `npm run dev`, view `/`. Confirm the stats now render once (not duplicated), directly after the WhyFinwave pillars, at the new larger size, with `Section`'s default padding (no `innerClassName` override needed on the homepage — that override is specific to `/about`'s tighter placement).

- [ ] **Step 5: Run tests and build**

Run: `npm run test && npm run build`
Expected: `content.test.ts` passes (untouched — it only tests `src/content/*` data, not this component); build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/StatsBand.tsx src/components/sections/WhyFinwave.tsx src/app/page.tsx
git commit -m "design: de-duplicate stats grid onto StatsBand, re-weighted larger"
```

---

### Task 6: Homepage leadership teaser

**Files:**
- Create: `src/components/sections/LeadershipTeaser.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `export function LeadershipTeaser()` — a server component, no props, self-contained (reads `leadership[0]` and `leadershipMessage` from `@/content/team` directly, same pattern as other homepage sections).
- Consumes: `Leader` type and `leadership`, `leadershipMessage` from `@/content/team` (existing, unchanged); `Section` from `@/components/ui/section`; `Reveal` from `@/components/motion/Reveal`; `Eyebrow` from `@/components/ui/eyebrow`; `asset` from `@/lib/base-path`; `Image` from `next/image`.

This surfaces the existing real leadership content (name, role, photo already used on `/about` via `LeadershipCard`) on the homepage, per spec §4 — a placement of existing content, not new material. It reuses the founder's profile plus the company-voice quote already defined in `team.ts`, kept short (per the spec's "compact teaser" requirement) rather than reusing the full `LeadershipCard`.

- [ ] **Step 1: Create the teaser component**

```typescript
// src/components/sections/LeadershipTeaser.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { leadership, leadershipMessage } from "@/content/team";
import { asset } from "@/lib/base-path";

/**
 * Compact homepage placement of the About page's leadership content: the
 * founder's portrait plus the company-voice quote, both already published on
 * /about via LeadershipCard. Kept short — full bios stay on /about.
 */
export function LeadershipTeaser() {
  const founder = leadership[0];

  return (
    <Section bordered>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
        <Reveal>
          <Image
            src={asset(founder.photo)}
            alt={`${founder.name}, ${founder.role} at Finwave Forex`}
            width={420}
            height={420}
            className="size-24 rounded-full object-cover ring-2 ring-white shadow-soft lg:size-32"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Leadership</Eyebrow>
          <blockquote className="display-sm mt-4 max-w-2xl text-balance">
            &ldquo;{leadershipMessage.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{founder.name}</span>
            {" · "}
            {founder.role}
          </p>
          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            Meet the full team
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Insert it into the homepage between `WhyFinwave`/`StatsBand` and `RatesTeaser`**

In `src/app/page.tsx`, add the import:

```typescript
import { LeadershipTeaser } from "@/components/sections/LeadershipTeaser";
```

And insert it after `<StatsBand />` (added in Task 5) and before `<RatesTeaser />`:

```typescript
      <WhyFinwave />
      <StatsBand />
      <LeadershipTeaser />
      <RatesTeaser />
```

- [ ] **Step 3: Visual check**

Run: `npm run dev`, view `/`. Confirm the founder's photo loads (path `/team/bhrugesh-vyas.jpg`, mirrors the existing `/about` usage), the quote reads well at `display-sm` size, and the section doesn't feel redundant sitting between the stats band and rates teaser. Check mobile (390px): photo/text should stack via the `lg:grid-cols-[auto_1fr]` breakpoint.

- [ ] **Step 4: Run tests and build**

Run: `npm run test && npm run build`
Expected: both succeed. `content.test.ts` is unaffected since no `src/content/*` file changed.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/LeadershipTeaser.tsx src/app/page.tsx
git commit -m "feat: homepage leadership teaser using existing About content"
```

---

### Task 7: Final verification pass

**Files:** None (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: static export succeeds with no errors or warnings about overflow/unused code.

- [ ] **Step 2: Full test suite**

Run: `npm run test`
Expected: all tests in `content.test.ts` pass.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Responsive visual check**

Run: `npm run dev`, then check `/`, `/services`, `/services/currency-exchange` (or any valid slug), `/rates`, `/about`, `/contact`, `/privacy` at three widths: 390px, 768px, 1440px. Confirm:
- No horizontal overflow at any width.
- The new display scale doesn't cause headline text to wrap awkwardly or collide with adjacent elements.
- The leadership teaser, restacked stats, and numbered cells all render correctly at each width.
- No dark/black sections were introduced anywhere.

- [ ] **Step 5: Reduced-motion check**

In the browser, enable "reduce motion" (OS-level or via devtools emulation of `prefers-reduced-motion: reduce`), reload `/`. Confirm all `Reveal`/`Stagger`/`MaskText`/`RevealScale` instances render their content immediately (no animation), since each component's `useReducedMotion()` branch was left untouched by every prior task.

- [ ] **Step 6: Deploy check**

The site auto-deploys via `.github/workflows/deploy.yml` on push to `main`. After merging this work, confirm the GitHub Actions run succeeds and https://kunaldsoni.github.io/FinwaveForex/ reflects the changes.
