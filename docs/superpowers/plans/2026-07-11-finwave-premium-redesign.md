# Finwave Forex Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Finwave Forex site to world-class fintech polish using money2abroad's design language, keeping the gold-on-paper identity and every existing behavior.

**Architecture:** A shared design-system layer (tokens + `Section`/`Card`/`Eyebrow` primitives + motion helpers) that every page composes from, plus two signature surfaces (a live hero `QuoteCard` and a dark "Finwave desk" showcase) fed by one extracted FX module. Pages are re-skinned onto the primitives; no routing/SEO/form/data logic changes.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), React 19, Tailwind CSS v4 (`@theme` in `globals.css`), framer-motion 12, lucide-react, radix-ui, vitest.

## Global Constraints

- **Framework first:** before editing anything framework-level (fonts, `next/image`, `app/template.tsx`, `metadata`, export config), read the relevant guide under `node_modules/next/dist/docs/` — the project's `AGENTS.md` warns this Next.js has breaking changes vs. training data.
- **Static export** (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`): no server runtime, route handlers, server actions, or dynamic APIs. All new data stays client-fetched with a static fallback.
- **Do not break:** routing + `generateStaticParams`, all `metadata`/`pageMetadata`/`JsonLd`/`sitemap`/`robots`, `ContactForm` submit logic (endpoint + mailto fallback), `MarketTicker` fetch + illustrative fallback, all `src/content/*` data.
- **Color usage (WCAG-AA):** body text/labels use `text-ink`/`text-ink-soft`; small gold text uses `text-brand-deep` (#9c6b00); raw `text-brand` (#eaa300) only for icons/dots/accents/rings, never body text on light backgrounds.
- **Motion:** every animation must no-op (or reduce) under `prefers-reduced-motion` — follow the existing `useReducedMotion()` / `@media (prefers-reduced-motion: reduce)` patterns.
- **Verification per task:** `npx tsc --noEmit` clean AND `npm run test` green. Visual/page tasks additionally require `npm run build` to succeed (proves static export still works). Component behavior is verified in-browser during Phase 7; pure logic is unit-tested with vitest (`src/**/*.test.ts`).
- **Commits:** frequent, one per task, imperative subject, end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Work stays on the `dev` branch.
- **Fonts unchanged:** Geist (`--font-sans`), Instrument Serif (`--font-serif`), Fragment Mono (`--font-mono`).

---

## File Structure

**Create:**
- `src/lib/fx.ts` — shared FX fetch + formatting (extracted from `MarketTicker`).
- `src/lib/fx.test.ts` — unit tests for pure FX helpers.
- `src/components/ui/section.tsx` — `Section` layout primitive.
- `src/components/ui/card.tsx` — `Card` surface primitive.
- `src/components/ui/eyebrow.tsx` — `Eyebrow` (dot + label).
- `src/components/motion/Stagger.tsx` — staggered reveal container.
- `src/components/motion/ScrollProgress.tsx` — fixed gold scroll bar.
- `src/components/sections/DeskShowcase.tsx` — dark signature section.
- `src/app/template.tsx` — route transition wrapper (Phase 7, doc-gated).

**Modify:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/rates/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/components/sections/SectionHeading.tsx`, `src/components/sections/QuoteCard.tsx`, `src/components/sections/MarketTicker.tsx`, `src/components/sections/ServicesGrid.tsx`, `src/components/sections/ServiceCard.tsx`, `src/components/sections/WhyFinwave.tsx`, `src/components/sections/RatesTeaser.tsx`, `src/components/sections/RatesTable.tsx`, `src/components/sections/StatsBand.tsx`, `src/components/sections/ServiceDetail.tsx`, `src/components/sections/LegalArticle.tsx`, `src/components/sections/ContactForm.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`.

---

## Phase 1 — Design tokens & utilities

### Task 1: Extend theme tokens and utility classes

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces (CSS custom props): `--color-pos` (#15803d), `--color-neg` (#b91c1c), `--shadow-soft`.
- Produces (utility classes): `.shadow-soft`, `.hairline-grid`, `.hairline-cell`, `.text-pos`, `.text-neg`.

- [ ] **Step 1: Add color + shadow tokens.** In the `@theme { … }` block (after `--shadow-rich-lg` on line ~19) add:

```css
  --color-pos: #15803d;
  --color-neg: #b91c1c;
  --shadow-soft: 0 10px 30px -18px rgb(28 26 21 / 0.22);
```

- [ ] **Step 2: Add utilities.** In the `@layer utilities { … }` block (near `.shadow-rich`) add:

```css
  .shadow-soft {
    box-shadow: var(--shadow-soft);
  }
  .text-pos {
    color: var(--color-pos);
  }
  .text-neg {
    color: var(--color-neg);
  }
  /* Enterprise hairline grid: 1px lines between cells (money2abroad "built for"). */
  .hairline-grid {
    display: grid;
    gap: 1px;
    background-color: var(--color-hairline);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-2xl);
    overflow: hidden;
  }
  .hairline-cell {
    background-color: var(--color-paper);
    transition: background-color 0.25s ease;
  }
  .hairline-cell:hover {
    background-color: #fff;
  }
```

- [ ] **Step 3: Verify build.** Run: `npm run build`. Expected: succeeds (static export completes, no CSS errors).

- [ ] **Step 4: Commit.**

```bash
git add src/app/globals.css
git commit -m "design: add pos/neg + soft-shadow tokens and hairline-grid utilities

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 2 — Shared primitives

### Task 2: `Section` layout primitive

**Files:**
- Create: `src/components/ui/section.tsx`

**Interfaces:**
- Produces: `Section({ children, variant?: "paper" | "sand" | "dark", bordered?: boolean, width?: "default" | "narrow", className?, as?, id?, "aria-label"? })`. Renders a full-bleed `<section>` (bg per variant) containing a centered inner wrapper (`max-w-6xl`/`max-w-4xl`, `px-4 sm:px-6`, `py-24 lg:py-32`).

- [ ] **Step 1: Write the component.**

```tsx
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  variant?: "paper" | "sand" | "dark";
  bordered?: boolean;
  width?: "default" | "narrow";
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-label"?: string;
};

const variants = {
  paper: "",
  sand: "bg-sand/60",
  dark: "bg-ink text-white",
} as const;

export function Section({
  children,
  variant = "paper",
  bordered = false,
  width = "default",
  className,
  innerClassName,
  as: Tag = "section",
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(variants[variant], bordered && "border-y border-hairline", className)}
    >
      <div
        className={cn(
          "mx-auto px-4 py-24 sm:px-6 lg:py-32",
          width === "narrow" ? "max-w-4xl" : "max-w-6xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
```

- [ ] **Step 2: Verify types.** Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/ui/section.tsx
git commit -m "feat: add Section layout primitive

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 3: `Card` surface primitive

**Files:**
- Create: `src/components/ui/card.tsx`

**Interfaces:**
- Produces: `Card({ children, hover?: boolean, glow?: boolean, className? })` — white rounded surface (`rounded-[20px] border border-hairline bg-white`), `shadow-soft` at rest; when `hover`, lifts (`-translate-y-1`) to `shadow-rich-lg` and `border-brand/40`; when `glow`, renders the gold corner radial. This replaces the repeated white-card markup in `ServiceCard`, About values, `WhyFinwave` visuals, `ContactForm`, `RatesTeaser`.

- [ ] **Step 1: Write the component.**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
};

export function Card({ children, hover = false, glow = false, className }: CardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={hover && !reduce ? { y: -5 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group shadow-soft relative flex flex-col overflow-hidden rounded-[20px] border border-hairline bg-white p-8 transition-[border-color,box-shadow] duration-300",
        hover && "hover:border-brand/40 hover:shadow-rich-lg",
        className,
      )}
    >
      {glow ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.18),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types.** Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/ui/card.tsx
git commit -m "feat: add Card surface primitive

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 4: `Eyebrow` primitive

**Files:**
- Create: `src/components/ui/eyebrow.tsx`

**Interfaces:**
- Produces: `Eyebrow({ children, tone?: "light" | "dark", className? })` — gold dot + uppercase label. `light` (default) for paper/sand sections; `dark` for `Section variant="dark"`.

- [ ] **Step 1: Write the component.**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase",
        tone === "dark" ? "text-white/60" : "text-brand-deep",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brand" aria-hidden />
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Verify types.** Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/ui/eyebrow.tsx
git commit -m "feat: add Eyebrow primitive

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 5: `Stagger` motion container

**Files:**
- Create: `src/components/motion/Stagger.tsx`

**Interfaces:**
- Produces: `Stagger({ children, className?, gap?: number })` (parent) and `StaggerItem({ children, className? })` (child). Parent triggers `whileInView`; each `StaggerItem` fades/rises with `staggerChildren`. Reduced-motion → renders plain wrappers.

- [ ] **Step 1: Write the component.**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ visible: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types.** Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/motion/Stagger.tsx
git commit -m "feat: add Stagger reveal container

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 6: `SectionHeading` split (editorial) mode

**Files:**
- Modify: `src/components/sections/SectionHeading.tsx`

**Interfaces:**
- Consumes: `Eyebrow` (Task 4).
- Produces: `SectionHeading` gains `layout?: "stack" | "split"` (default `"stack"`, preserving current behavior). `split` renders a 2-col grid — title left, `sub` (deck) right, baseline-aligned; collapses to stacked below `lg`. The eyebrow pill is replaced by `<Eyebrow>` for a lighter, more editorial mark; `align`/`as`/`className` unchanged.

- [ ] **Step 1: Rewrite the component.** Replace the file with:

```tsx
import type { ReactNode } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  lines: ReactNode[];
  sub?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  layout?: "stack" | "split";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  lines,
  sub,
  as = "h2",
  align = "left",
  layout = "stack",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const titleCls = cn(
    "mt-5 font-serif font-normal tracking-[-0.03em] text-balance",
    as === "h1"
      ? "text-4xl sm:text-5xl lg:text-[4rem] lg:leading-[1.02]"
      : "text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]",
  );

  if (layout === "split") {
    return (
      <div className={cn("grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16", className)}>
        <div>
          <RevealScale variant="tag">
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </RevealScale>
          <MaskText as={as} lines={lines} delay={0.1} className={titleCls} />
        </div>
        {sub ? (
          <Reveal delay={0.2}>
            <p
              className={cn(
                "text-lg leading-8 lg:pb-2",
                tone === "dark" ? "text-white/70" : "text-ink-soft",
              )}
            >
              {sub}
            </p>
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl", className)}>
      <RevealScale variant="tag">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </RevealScale>
      <MaskText as={as} lines={lines} delay={0.1} className={titleCls} />
      {sub ? (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-5 text-lg leading-8",
              tone === "dark" ? "text-white/70" : "text-ink-soft",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors; every existing `SectionHeading` usage still compiles (props are additive).

- [ ] **Step 3: Commit.**

```bash
git add src/components/sections/SectionHeading.tsx
git commit -m "feat: SectionHeading editorial split layout + Eyebrow mark

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 3 — Shared FX module (TDD)

### Task 7: Extract `lib/fx.ts` with unit tests

**Files:**
- Create: `src/lib/fx.ts`
- Create: `src/lib/fx.test.ts`

**Interfaces:**
- Produces:
  - `type InrResponse = { date: string; inr: Record<string, number> }`
  - `formatPrice(price: number): string` — `>= 1` → 4 dp, else 6 dp (moved verbatim from `MarketTicker`).
  - `priceFromInr(inrPerUnit: number): number` — returns `1 / inrPerUnit` (INR per 1 foreign unit).
  - `changePct(todayInr: number, prevInr: number | undefined, fallback: number): number` — `prevInr && prevInr > 0 ? (prevInr / todayInr - 1) * 100 : fallback`.
  - `fetchInr(tag: string): Promise<InrResponse | null>` (moved verbatim, incl. jsDelivr + Cloudflare fallback URLs).
  - `async fetchInrWithPrev(): Promise<{ today: InrResponse; prev: InrResponse | null } | null>` — the "walk back up to 5 days" logic, returning `null` when today's fetch fails.

- [ ] **Step 1: Write failing tests.** Create `src/lib/fx.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { changePct, formatPrice, priceFromInr } from "@/lib/fx";

describe("formatPrice", () => {
  it("uses 4 decimals for values >= 1", () => {
    expect(formatPrice(88.9123456)).toBe("88.9123");
  });
  it("uses 6 decimals for values < 1", () => {
    expect(formatPrice(0.5904461)).toBe("0.590446");
  });
});

describe("priceFromInr", () => {
  it("inverts INR-per-unit to price", () => {
    expect(priceFromInr(0.0112)).toBeCloseTo(89.2857, 3);
  });
});

describe("changePct", () => {
  it("computes signed percent from prev/today INR", () => {
    // price rose ~1%: prevInr slightly higher than todayInr
    expect(changePct(0.0112, 0.011312, 0)).toBeCloseTo(1, 1);
  });
  it("falls back when prev is missing or zero", () => {
    expect(changePct(0.0112, undefined, 0.42)).toBe(0.42);
    expect(changePct(0.0112, 0, 0.42)).toBe(0.42);
  });
});
```

- [ ] **Step 2: Run to verify failure.** Run: `npm run test`. Expected: FAIL — cannot resolve `@/lib/fx`.

- [ ] **Step 3: Write `src/lib/fx.ts`.**

```ts
// Free, keyless, CORS-enabled FX data (community-run, ~daily updates).
// Primary: jsDelivr CDN. Fallback: the project's Cloudflare Pages mirror.
// Docs: https://github.com/fawazahmed0/exchange-api
export type InrResponse = { date: string; inr: Record<string, number> };

function datedUrls(tag: string): string[] {
  // tag is "latest" or a "YYYY-MM-DD" date.
  return [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${tag}/v1/currencies/inr.json`,
    `https://${tag}.currency-api.pages.dev/v1/currencies/inr.json`,
  ];
}

export async function fetchInr(tag: string): Promise<InrResponse | null> {
  for (const url of datedUrls(tag)) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = (await res.json()) as InrResponse;
      if (json?.inr) return json;
    } catch {
      // try next url
    }
  }
  return null;
}

export async function fetchInrWithPrev(): Promise<{
  today: InrResponse;
  prev: InrResponse | null;
} | null> {
  const today = await fetchInr("latest");
  if (!today) return null;
  // Walk back up to 5 days to find the previous published rate (skips
  // weekends/holidays) for a real 24h change.
  let prev: InrResponse | null = null;
  const base = new Date(`${today.date}T00:00:00Z`);
  for (let i = 1; i <= 5 && !prev; i += 1) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() - i);
    prev = await fetchInr(d.toISOString().slice(0, 10));
  }
  return { today, prev };
}

/** API gives INR→X; we want INR per 1 X. */
export function priceFromInr(inrPerUnit: number): number {
  return 1 / inrPerUnit;
}

/** Signed % change in price (INR per X). price = 1/inr, so prev/today - 1. */
export function changePct(
  todayInr: number,
  prevInr: number | undefined,
  fallback: number,
): number {
  return prevInr && prevInr > 0 ? (prevInr / todayInr - 1) * 100 : fallback;
}

export function formatPrice(price: number): string {
  // Small-value pairs (e.g. JPY/INR) need more precision to be meaningful.
  return price >= 1 ? price.toFixed(4) : price.toFixed(6);
}
```

- [ ] **Step 4: Run to verify pass.** Run: `npm run test`. Expected: PASS (all fx + existing content tests green).

- [ ] **Step 5: Commit.**

```bash
git add src/lib/fx.ts src/lib/fx.test.ts
git commit -m "feat: extract shared FX fetch/format module with tests

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 8: Refactor `MarketTicker` onto `lib/fx.ts`

**Files:**
- Modify: `src/components/sections/MarketTicker.tsx`

**Interfaces:**
- Consumes: `fetchInrWithPrev`, `priceFromInr`, `changePct`, `formatPrice`, `type InrResponse` from `@/lib/fx` (Task 7).
- Produces: unchanged public component `MarketTicker({ className? })` and identical DOM/behavior.

- [ ] **Step 1: Remove local FX helpers.** Delete from `MarketTicker.tsx` the local `InrResponse` type, `datedUrls`, `fetchInr`, and `formatPrice` (lines defining them). Keep `buildQuotes` but rewrite it to use the imports.

- [ ] **Step 2: Update imports + `buildQuotes` + effect.** Set the top imports to:

```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { tickerQuotes, type TickerQuote } from "@/content/ticker";
import {
  changePct,
  fetchInrWithPrev,
  formatPrice,
  priceFromInr,
  type InrResponse,
} from "@/lib/fx";
```

Rewrite `buildQuotes` to:

```tsx
function buildQuotes(today: InrResponse, prev: InrResponse | null): TickerQuote[] {
  return tickerQuotes.map((quote) => {
    const code = quote.pair.split("/")[0].toLowerCase();
    const todayInr = today.inr[code];
    if (!todayInr) return quote; // unknown code — keep illustrative fallback
    return {
      ...quote,
      price: priceFromInr(todayInr),
      changePct: changePct(todayInr, prev?.inr[code], quote.changePct),
    };
  });
}
```

Replace the effect body with:

```tsx
  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchInrWithPrev();
      if (res && active) setQuotes(buildQuotes(res.today, res.prev));
    })();
    return () => {
      active = false;
    };
  }, []);
```

Leave `Quote`, `TickerRow`, and the returned JSX untouched (they already call the now-imported `formatPrice`).

- [ ] **Step 3: Verify tests + build.** Run: `npm run test && npm run build`. Expected: green; ticker markup unchanged.

- [ ] **Step 4: Commit.**

```bash
git add src/components/sections/MarketTicker.tsx
git commit -m "refactor: MarketTicker uses shared lib/fx

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 4 — Signature surfaces

### Task 9: Live hero `QuoteCard`

**Files:**
- Modify: `src/components/sections/QuoteCard.tsx`

**Interfaces:**
- Consumes: `fetchInrWithPrev`, `priceFromInr`, `changePct`, `formatPrice` from `@/lib/fx`; `tickerQuotes` from `@/content/ticker` (for the illustrative fallback USD/INR value).
- Produces: unchanged export `QuoteCard()` (no props), same outer sizing so `Hero`'s `<Parallax>` wrapper still fits.

**Design:** live pulse dot, mono numerals, USD→INR with the current indicative rate, an animated swap control, a "rate refreshed" line, and the retained "Indicative · ask us" + RBI-approved compliance framing. First-paint uses the illustrative fallback; a shimmer marks the value as `Updating…` until the fetch resolves; if the fetch fails the illustrative value simply stays.

- [ ] **Step 1: Rewrite the component.** Replace the file with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BadgeCheck } from "lucide-react";
import { formatPrice, fetchInrWithPrev, changePct, priceFromInr } from "@/lib/fx";
import { tickerQuotes } from "@/content/ticker";
import { cn } from "@/lib/utils";

const FALLBACK = tickerQuotes.find((q) => q.pair === "USD/INR") ?? {
  pair: "USD/INR",
  price: 88.9,
  changePct: 0,
};

type Live = { price: number; changePct: number; live: boolean };

export function QuoteCard() {
  const reduce = useReducedMotion();
  const [quote, setQuote] = useState<Live>({ ...FALLBACK, live: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchInrWithPrev();
      if (!active) return;
      const inr = res?.today.inr["usd"];
      if (res && inr) {
        setQuote({
          price: priceFromInr(inr),
          changePct: changePct(inr, res.prev?.inr["usd"], FALLBACK.changePct),
          live: true,
        });
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const up = quote.changePct >= 0;

  return (
    <motion.div
      animate={reduce ? undefined : { y: [-6, 6] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="shadow-rich-lg mx-auto w-full max-w-sm rounded-2xl border border-hairline bg-white p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-ink-soft uppercase">
          Exchange quote
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-brand-deep">
          <span className="relative flex size-2">
            {!reduce && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
            )}
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {quote.live ? "Live indicative" : "Indicative"}
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You send</p>
        <p className="mt-1 text-2xl tracking-tight">
          <span className="font-mono">USD</span>{" "}
          <span className="text-ink-soft">· US Dollar</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto -my-3 flex size-8 items-center justify-center rounded-full border border-hairline bg-white">
        <ArrowDown className="size-4 text-brand" aria-hidden />
      </div>

      <div className="rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You receive</p>
        <p className="mt-1 text-2xl tracking-tight">
          <span className="font-mono">INR</span>{" "}
          <span className="text-ink-soft">· Indian Rupee</span>
        </p>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-xs text-ink-soft">1 USD ≈</span>
          <span className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-mono text-lg tabular-nums transition-opacity",
                loading && "animate-pulse opacity-60",
              )}
            >
              ₹{formatPrice(quote.price)}
            </span>
            <span className={cn("font-mono text-xs tabular-nums", up ? "text-pos" : "text-neg")}>
              {up ? "▲" : "▼"}
              {Math.abs(quote.changePct).toFixed(2)}%
            </span>
          </span>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-ink-soft">
        {quote.live ? "Rate refreshed today · indicative only" : "Illustrative · ask us for today's rate"}
      </p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-3">
        <p className="text-sm text-white/80">Ask us for today&apos;s rate</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-white">
          <BadgeCheck className="size-4 text-brand-tint" aria-hidden />
          RBI-approved
        </span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/sections/QuoteCard.tsx
git commit -m "feat: live indicative hero QuoteCard fed by lib/fx

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 10: `DeskShowcase` dark signature section

**Files:**
- Create: `src/components/sections/DeskShowcase.tsx`

**Interfaces:**
- Consumes: `Section` (Task 2), `SectionHeading` (Task 6, `layout="split"`, `tone="dark"`), `Reveal`, `Parallax`.
- Produces: default export-free named `DeskShowcase()` (no props). A dark section: split editorial head on top, then a mock "desk" panel (quote summary + short illustrative transaction list + inline SVG sparkline) with 1–2 floating annotation chips (hidden `< lg`). All content clearly illustrative. No chart lib — static inline SVG path.

- [ ] **Step 1: Write the component.**

```tsx
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";

const txns = [
  { who: "Education · GBP", sub: "Wire transfer", amt: "£12,500", st: "Settled" },
  { who: "Travel · USD notes", sub: "Home delivery", amt: "$3,200", st: "Delivered" },
  { who: "Corporate · EUR", sub: "Bulk exchange", amt: "€48,000", st: "In progress" },
];

export function DeskShowcase() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.14),transparent_60%)]"
      />
      <div className="relative">
        <SectionHeading
          layout="split"
          tone="dark"
          eyebrow="The Finwave desk"
          lines={["A real forex desk,", "not a black box."]}
          sub="Quote by phone, confirm a live rate, and receive currency at home or branch. Every transaction is RBI-compliant and fully documented."
        />

        <Reveal delay={0.15}>
          <div className="relative mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_60px_120px_-40px_rgb(0_0_0_/_0.6)] sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              {/* Transactions */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white/85">Recent desk activity</h3>
                  <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    Illustrative
                  </span>
                </div>
                <ul className="mt-4">
                  {txns.map((t) => (
                    <li
                      key={t.who}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-white/[0.06] py-3 first:border-t-0"
                    >
                      <div>
                        <p className="text-[13px] text-white/90">{t.who}</p>
                        <p className="font-mono text-[11px] text-white/45">{t.sub}</p>
                      </div>
                      <span className="font-mono text-[13px] text-white/85">{t.amt}</span>
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] text-white/70">
                        {t.st}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sparkline */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-medium text-white/85">USD / INR</h4>
                  <span className="font-mono text-xs text-brand">30-day</span>
                </div>
                <svg viewBox="0 0 200 80" className="mt-4 h-24 w-full" aria-hidden>
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(234 163 0 / 0.35)" />
                      <stop offset="100%" stopColor="rgb(234 163 0 / 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 60 L20 54 L40 58 L60 44 L80 48 L100 34 L120 40 L140 26 L160 30 L180 18 L200 22"
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 60 L20 54 L40 58 L60 44 L80 48 L100 34 L120 40 L140 26 L160 30 L180 18 L200 22 L200 80 L0 80 Z"
                    fill="url(#spark)"
                  />
                </svg>
                <p className="mt-3 font-mono text-[11px] text-white/45">
                  Indicative trend · call for a live quote
                </p>
              </div>
            </div>

            {/* Floating annotations */}
            <span className="absolute -top-3 right-8 hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-[0_8px_24px_rgb(234_163_0_/_0.3)] lg:flex">
              <ShieldCheck className="size-3.5" aria-hidden />
              RBI-approved
            </span>
            <span className="absolute -bottom-3 left-10 hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-[0_8px_24px_rgb(234_163_0_/_0.3)] lg:flex">
              <ArrowUpRight className="size-3.5" aria-hidden />
              Rate bettered
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors.

- [ ] **Step 3: Commit.**

```bash
git add src/components/sections/DeskShowcase.tsx
git commit -m "feat: dark Finwave desk showcase section

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 11: Hairline services grid

**Files:**
- Modify: `src/components/sections/ServicesGrid.tsx`
- Modify: `src/components/sections/ServiceCard.tsx`

**Interfaces:**
- Consumes: `Section` (Task 2), `.hairline-grid`/`.hairline-cell` (Task 1).
- Produces: `ServiceCard` gains `variant?: "card" | "cell"` (default `"card"`, preserving `/services` usage). `"cell"` renders a hairline-grid cell: numbered `NN` (mono), icon, name, blurb, "Learn more". `ServicesGrid` wraps the 4 cells in a `.hairline-grid` (4 cols `lg`, 2 `sm`, 1 mobile) inside a `Section`.

- [ ] **Step 1: Add the `cell` variant to `ServiceCard`.** Replace the file with:

```tsx
"use client";

import Link from "next/link";
import { ArrowRight, Banknote, Building2, CreditCard, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";
import type { Service } from "@/content/services";

const icons = { Banknote, Send, CreditCard, Building2 };

type ServiceCardProps = { service: Service; index: number; variant?: "card" | "cell" };

export function ServiceCard({ service, index, variant = "card" }: ServiceCardProps) {
  const Icon = icons[service.icon];

  const inner = (
    <>
      <span className="relative flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
        <Icon className="size-5 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
      </span>
      <h3 className="relative mt-6 text-xl font-semibold tracking-[-0.02em]">{service.name}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-6 text-ink-soft">{service.blurb}</p>
      <Link
        href={`/services/${service.slug}`}
        className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep transition-colors hover:text-brand"
      >
        Learn more<span className="sr-only"> about {service.name.toLowerCase()}</span>
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </>
  );

  if (variant === "cell") {
    return (
      <div className="group hairline-cell relative flex flex-col p-8">
        <span className="absolute top-6 right-7 font-mono text-xs text-ink-soft/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        {inner}
      </div>
    );
  }

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Card hover glow className="h-full">
        {inner}
      </Card>
    </Reveal>
  );
}
```

- [ ] **Step 2: Render the hairline grid in `ServicesGrid`.** Replace the file with:

```tsx
import { Fragment } from "react";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="Services"
        lines={[
          <Fragment key="l1">Everything foreign exchange,</Fragment>,
          <Fragment key="l2">
            under <Em>one roof.</Em>
          </Fragment>,
        ]}
      />
      <div className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} variant="cell" />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors; `/services` page (still using default `variant="card"`) unaffected.

- [ ] **Step 4: Commit.**

```bash
git add src/components/sections/ServicesGrid.tsx src/components/sections/ServiceCard.tsx
git commit -m "feat: hairline services grid + ServiceCard cell variant on Card primitive

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 5 — Page passes

### Task 12: Home page — section order + desk showcase

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `DeskShowcase` (Task 10).

- [ ] **Step 1: Insert `DeskShowcase` and reorder.** In `src/app/page.tsx`, add the import `import { DeskShowcase } from "@/components/sections/DeskShowcase";` and set the JSX body to:

```tsx
    <>
      <MarketTicker className="mt-[72px]" />
      <Hero />
      <ServicesGrid />
      <DeskShowcase />
      <WhyFinwave />
      <RatesTeaser />
      <StatsBand />
      <PullQuote />
      <CitiesSection />
      <CtaBand />
    </>
```

- [ ] **Step 2: Verify build.** Run: `npm run build`. Expected: succeeds.

- [ ] **Step 3: Commit.**

```bash
git add src/app/page.tsx
git commit -m "feat: add desk showcase to home page flow

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 13: `WhyFinwave` — editorial heads + Card/Section, drop the redundant steps visual

**Files:**
- Modify: `src/components/sections/WhyFinwave.tsx`

**Interfaces:**
- Consumes: `Section` (Task 2), `Card` (Task 3).

**Change:** The "steps" visual (`StepsVisual`) is now represented by `DeskShowcase`; remove `StepsVisual` and its row. Keep the **Trust** and **Convenience** rows. Migrate `TrustVisual`/`DeliveryVisual` white boxes to the `Card` primitive. Wrap the section in `<Section>`. Keep `SectionHeading` and the alternating layout.

- [ ] **Step 1: Edit the file.** Remove the `StepsVisual` function and the first entry of the `rows` array (the `"Simple process"` row). Replace the two remaining visuals' outer wrapper `div`/`ol` classes and the section shell as follows:
  - Change the `TrustVisual` root element from the `div` with `className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-white p-10 …"` to `<Card className="items-center gap-4 p-10 text-center">…</Card>` (import `Card` from `@/components/ui/card`).
  - Change the `DeliveryVisual` root `div` (`className="rounded-2xl border border-hairline bg-white p-8 …"`) to `<Card>…</Card>`.
  - Replace the outer `return (<section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">…</section>)` with `<Section>…</Section>` (import `Section` from `@/components/ui/section`), removing the now-duplicated `mx-auto max-w-6xl px-4 … py-…` wrapper but keeping the inner `SectionHeading` and the `.mt-16 space-y-20 …` rows container.

  Final structure of the return:

```tsx
export function WhyFinwave() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="Why Finwave"
        lines={[
          <span key="line">
            Built on a decade of <Em>better rates.</Em>
          </span>,
        ]}
      />
      <div className="mt-16 space-y-20 lg:space-y-28">
        {rows.map((row, index) => (
          <div key={row.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
              <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
                {row.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-[2rem] leading-[1.1] font-normal tracking-tight text-balance sm:text-4xl">
                {row.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-8 text-ink-soft">{row.body}</p>
            </Reveal>
            <Reveal delay={0.15} className={cn(index % 2 === 1 && "lg:order-1")}>
              <Parallax range={20}>{row.visual}</Parallax>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

  (Note: `text-brand` → `text-brand-deep` for the row eyebrow per the color-usage constraint.)

- [ ] **Step 2: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors; no unused-symbol errors (confirm `services` import is still used by `DeliveryVisual`/content — if `StepsVisual` was the only `services` consumer, drop that import).

- [ ] **Step 3: Commit.**

```bash
git add src/components/sections/WhyFinwave.tsx
git commit -m "refactor: WhyFinwave on Section/Card; steps handled by desk showcase

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 14: `StatsBand` — bordered rhythm + hairline dividers

**Files:**
- Modify: `src/components/sections/StatsBand.tsx`

**Interfaces:**
- Consumes: `Section` (Task 2).

- [ ] **Step 1: Rewrite.** Replace the file with:

```tsx
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

export function StatsBand() {
  return (
    <Section>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline text-center sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1} className="bg-paper px-6 py-12">
            <p className="font-mono text-5xl tracking-tight tabular-nums lg:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-ink-soft">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

Note: on `/about`, `StatsBand` is currently wrapped in `<div className="border-y border-hairline bg-sand/60"><StatsBand/></div>`. That wrapper adds its own `Section` padding twice; in Task 16 the About page uses `StatsBand` directly.

- [ ] **Step 2: Verify build.** Run: `npm run build`. Expected: succeeds.

- [ ] **Step 3: Commit.**

```bash
git add src/components/sections/StatsBand.tsx
git commit -m "feat: StatsBand hairline-bordered stat grid

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 15: `RatesTeaser` + `RatesTable` — live indicative values

**Files:**
- Modify: `src/components/sections/RatesTeaser.tsx`
- Modify: `src/components/sections/RatesTable.tsx`

**Interfaces:**
- Consumes: `Section` (Task 2). A new client sub-component reads `fetchInrWithPrev`/`priceFromInr`/`formatPrice` from `@/lib/fx`.

**Change:** Keep both components server-rendered by default with the existing "Ask us" fallback, but layer a small **client** live-value badge that shows `≈ ₹NN.NN` next to a currency when the feed has it. Compliance text ("indicative · call for live quote") stays.

- [ ] **Step 1: Create a shared client `LiveRate` helper inside `RatesTable.tsx`.** At the top of `RatesTable.tsx`, convert nothing server-side; instead add a new client component file is unnecessary — add an inline `"use client"` sibling by creating `src/components/sections/LiveRate.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { fetchInrWithPrev, formatPrice, priceFromInr } from "@/lib/fx";

/** Shows an indicative ₹ value for a currency code once the feed resolves. */
export function LiveRate({ code, className }: { code: string; className?: string }) {
  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchInrWithPrev();
      const inr = res?.today.inr[code.toLowerCase()];
      if (active && inr) setPrice(priceFromInr(inr));
    })();
    return () => {
      active = false;
    };
  }, [code]);

  if (price === null) return null;
  return <span className={className}>≈ ₹{formatPrice(price)}</span>;
}
```

- [ ] **Step 2: Use `LiveRate` in `RatesTeaser`.** In `RatesTeaser.tsx`: import `Section` and `LiveRate`; replace the outer `<section className="border-y border-hairline bg-sand/60"><div className="mx-auto grid max-w-6xl …">` shell with `<Section variant="sand" bordered><div className="grid items-center gap-12 lg:grid-cols-2">`. In each teaser `<li>`, replace the `<span className="rounded-full bg-brand-tint …">Ask us</span>` with:

```tsx
                <span className="flex items-center gap-3">
                  <LiveRate code={currency.code} className="font-mono text-sm tabular-nums text-ink-soft" />
                  <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-deep">
                    Ask us
                  </span>
                </span>
```

- [ ] **Step 3: Use `LiveRate` in `RatesTable`.** In `RatesTable.tsx`, import `LiveRate`. In `RateCell`, when `value === null`, render the "Ask us" link with an optional live value. Change the `RateCell` fallback branch to accept a `code` prop:

Change signature to `function RateCell({ value, code }: { value: number | null; code: string })` and the fallback `return` to:

```tsx
  return (
    <span className="flex items-center gap-2">
      <LiveRate code={code} className="font-mono text-sm tabular-nums text-ink-soft" />
      <Link
        href="/contact"
        className="inline-block rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-deep transition-colors hover:bg-brand hover:text-white"
      >
        Ask us
      </Link>
    </span>
  );
```

Then update the two `<RateCell value={…} />` call sites to `<RateCell value={currency.indicativeBuy} code={currency.code} />` and `<RateCell value={currency.indicativeSell} code={currency.code} />`. Also add a sticky header: change the `<thead>`'s `<tr>` to include `className="… "` and set the table container to allow it — add `className="sticky top-0 bg-white"` on the `<thead>`.

- [ ] **Step 4: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors.

- [ ] **Step 5: Commit.**

```bash
git add src/components/sections/LiveRate.tsx src/components/sections/RatesTeaser.tsx src/components/sections/RatesTable.tsx
git commit -m "feat: live indicative FX values on rates teaser + table

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 16: About page — story block, hairline values, remove Leadership TODO

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `.hairline-grid`/`.hairline-cell`, `StatsBand` (direct).

**Change:** Render the values as a `.hairline-grid`; add a compact "milestones" story strip; **remove** the `TODO: Leadership` block from render (leave a code comment noting it awaits real content); use `StatsBand` directly (no double-wrapping `Section`).

- [ ] **Step 1: Rewrite the page body.** Replace the file with:

```tsx
import { Handshake, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, serving six cities across India.",
  path: "/about",
});

const values = [
  { icon: Handshake, title: "Transparency", body: "Rates quoted up front, and we'll try to better any quote you bring us." },
  { icon: ShieldCheck, title: "Compliance", body: "RBI-approved and fully KYC-compliant on every transaction." },
  { icon: Truck, title: "Convenience", body: "Home delivery and branch pick-up across six cities in India." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 lg:pt-44">
        <SectionHeading
          as="h1"
          eyebrow="About us"
          lines={["A decade of", "honest exchange."]}
          sub="Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, providing services at the most competitive rates in the market."
        />
      </section>

      <Section>
        <div className="hairline-grid sm:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08} className="hairline-cell group relative p-8">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                <value.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{value.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <StatsBand />

      {/* Leadership block intentionally omitted until Finwave provides real team details. */}

      <CtaBand />
    </>
  );
}
```

Note: `siteConfig` import is retained only if referenced; if lint flags it as unused, remove the import. (This rewrite does not reference it — remove the `siteConfig` import line.)

- [ ] **Step 2: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors, no unused-import errors, no `TODO` string rendered.

- [ ] **Step 3: Commit.**

```bash
git add src/app/about/page.tsx
git commit -m "feat: About page hairline values + story; drop Leadership placeholder

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 17: Services & ServiceDetail — editorial split hero + Card grid

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/components/sections/ServiceDetail.tsx`

**Interfaces:**
- Consumes: `SectionHeading` `layout="split"`; `Section`; `Card`.

- [ ] **Step 1: Services index split hero.** In `src/app/services/page.tsx`, change the `SectionHeading` to `layout="split"` (keep `as="h1"`, eyebrow, lines, sub). Leave the `ServiceCard` grid (default `variant="card"`) as-is.

- [ ] **Step 2: ServiceDetail feature cards → `Card`.** In `ServiceDetail.tsx`, import `Card` from `@/components/ui/card`. Replace the feature `<span className="flex h-full items-start gap-3 rounded-2xl border border-hairline bg-white p-5">…</span>` with a `<Card className="flex-row items-start gap-3 p-5">…</Card>` wrapper (keep the inner check icon + text). Leave the "How it works" and FAQ sections unchanged.

- [ ] **Step 3: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors; all four `/services/[slug]` routes still statically generate.

- [ ] **Step 4: Commit.**

```bash
git add src/app/services/page.tsx src/components/sections/ServiceDetail.tsx
git commit -m "feat: editorial services hero + Card-based feature grid

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 18: Contact form + inputs polish

**Files:**
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/sections/ContactForm.tsx`
- Modify: `src/app/contact/page.tsx`

**Interfaces:** No API changes; visual only. Form submit logic untouched.

- [ ] **Step 1: Input/Textarea sizing + focus rhythm.** In `input.tsx`, change `h-9 … px-2.5 py-1 … rounded-md` to `h-11 … px-3.5 py-2 … rounded-xl` and the focus ring to `focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30` (replace the existing `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`). Apply the same `rounded-xl px-3.5 py-2` + focus-ring changes to `textarea.tsx` (keep `min-h-16`).

- [ ] **Step 2: Match the native `select` in `ContactForm`.** In `ContactForm.tsx`, change the `<select>`'s className from `h-9 … rounded-md … focus-visible:ring-2 focus-visible:ring-ring` to `h-11 w-full min-w-0 rounded-xl border border-input bg-transparent px-3.5 py-2 text-base shadow-xs transition-colors outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 sm:text-sm`. Wrap the form card via `Card` is optional; keep the existing `<form className="… rounded-2xl border border-hairline bg-white p-6 sm:p-8">`.

- [ ] **Step 3: Contact trust sidebar.** In `src/app/contact/page.tsx`, below the existing contact `<ul>`, add a small assurance list inside the left column:

```tsx
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap gap-2">
              {["RBI-approved", "Full KYC", "6 cities", "Home delivery"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
```

- [ ] **Step 4: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors.

- [ ] **Step 5: Commit.**

```bash
git add src/components/ui/input.tsx src/components/ui/textarea.tsx src/components/sections/ContactForm.tsx src/app/contact/page.tsx
git commit -m "feat: premium form inputs + contact trust chips

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 19: Rates & Legal page shells on `Section`

**Files:**
- Modify: `src/app/rates/page.tsx`
- Modify: `src/components/sections/LegalArticle.tsx`

- [ ] **Step 1: Rates page rhythm.** In `src/app/rates/page.tsx`, keep the `SectionHeading` hero. No structural change required beyond confirming spacing reads well after Task 15; leave as-is if the table already sits within comfortable padding. (No code change if spacing is acceptable — this step is a visual confirmation.)

- [ ] **Step 2: Legal prose polish.** In `LegalArticle.tsx`, change section body text to `leading-7 text-ink-soft` (already present) and add `max-w-none` prose rhythm: set the wrapper `<div className="mt-10 space-y-10">` to `space-y-8` and each `<h2>` to `text-lg font-semibold tracking-tight` (already close) — ensure `scroll-mt-24` on each `<section>` for anchored links. Add `id={slugify(section.heading)}` only if a slug helper already exists; otherwise skip IDs (no new helper — YAGNI).

- [ ] **Step 3: Verify build.** Run: `npm run build`. Expected: succeeds.

- [ ] **Step 4: Commit.**

```bash
git add src/app/rates/page.tsx src/components/sections/LegalArticle.tsx
git commit -m "polish: rates + legal spacing rhythm

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 6 — Motion polish

### Task 20: `ScrollProgress` bar

**Files:**
- Create: `src/components/motion/ScrollProgress.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `ScrollProgress()` — a fixed 2px gold bar at `top-0` scaling with `useScroll().scrollYProgress`; reduced-motion → not rendered. Mounted once in `layout.tsx` just after `<body>`'s skip-link.

- [ ] **Step 1: Write the component.**

```tsx
"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand"
    />
  );
}
```

- [ ] **Step 2: Mount in layout.** In `src/app/layout.tsx`, import `ScrollProgress` and render `<ScrollProgress />` immediately after the skip-link `<a>` and before `<JsonLd />`.

- [ ] **Step 3: Verify types + build.** Run: `npx tsc --noEmit && npm run build`. Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add src/components/motion/ScrollProgress.tsx src/app/layout.tsx
git commit -m "feat: gold scroll-progress bar

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 21: Route transitions (doc-gated)

**Files:**
- Create: `src/app/template.tsx`

**Interfaces:**
- Produces: default-export `Template({ children })` wrapping page content in a subtle fade/rise on route change; reduced-motion → plain passthrough.

- [ ] **Step 1: Read the docs first.** Read `node_modules/next/dist/docs/01-app/` for `template.js` / templates and layouts, and confirm `template.tsx` re-mounts on navigation and is compatible with `output: "export"`. If templates are unsupported/changed in this Next version, **skip this task** and note it in the plan checklist; the per-section `Reveal`s already cover entrance motion.

- [ ] **Step 2: Write the template (only if supported).**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify build + navigation.** Run: `npm run build`. Expected: succeeds. Confirm in Phase 7 that client-side nav between routes fades and that no layout/scroll regressions occur.

- [ ] **Step 4: Commit.**

```bash
git add src/app/template.tsx
git commit -m "feat: subtle route transition template

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 7 — Verification & polish

### Task 22: Full build, test, and in-browser verification

**Files:** none (verification), plus any fix-up commits discovered.

- [ ] **Step 1: Clean build + tests.** Run: `npm run build && npm run test`. Expected: export completes for all routes (`/`, `/services`, `/services/[slug]`×4, `/rates`, `/about`, `/contact`, `/privacy`, `/terms`); all tests green.

- [ ] **Step 2: Run the dev server and drive it.** Run: `npm run dev`, then use the `/verify` skill (or Claude-in-Chrome) to load each route at desktop (1440px), tablet (768px), and mobile (375px). Confirm: header/nav, hero live card value populates (or falls back cleanly), desk showcase renders dark with annotations `≥ lg` only, hairline grids show 1px lines, rates table live values appear, contact form still submits (mailto fallback opens), footer intact.

- [ ] **Step 3: Accessibility + reduced-motion pass.** Toggle OS "reduce motion" and reload: confirm orbs/marquee/scroll-bar/quote-float/route-transition all no-op. Keyboard-tab the header, service links, form fields, and table "Ask us" links — confirm visible `focus-visible` rings. Spot-check color contrast: no gold body text on light surfaces (constraint §Global).

- [ ] **Step 4: Fix and commit any regressions** found in Steps 2–3, one focused commit each, then re-run Step 1.

- [ ] **Step 5: Final verification commit (if fixes were made).**

```bash
git add -A
git commit -m "polish: responsive + a11y fixes from verification pass

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review (author checklist — completed)

**Spec coverage:** tokens/§3 → T1; primitives/§4 → T2–T6; fx/§5.1 data → T7–T8; live QuoteCard/§5.1 → T9; desk showcase/§5.2 → T10; hairline services/§5.3 → T11; home/§6 → T12–T13; stats → T14; rates/§6 → T15,T19; about/§6 → T16; services/§6 → T17; contact/§6 → T18; legal/§6 → T19; motion/§7 (scroll bar, route transitions, skeletons, focus) → T9 (skeleton), T20, T21, T18/T22 (focus); constraints/§8 → Global Constraints + per-task build/test gates; verification/§9 → T22.

**Placeholder scan:** no "TBD/implement later/handle edge cases" left; each code step carries real code. T19 Step 1 and T21 are conditional-by-design (visual confirm / doc-gated), with explicit skip criteria — not placeholders.

**Type consistency:** `fetchInrWithPrev` returns `{ today, prev }` and is consumed identically in T8/T9/T15; `formatPrice`/`priceFromInr`/`changePct` signatures match across T7–T9,T15; `ServiceCard` `variant` and `SectionHeading` `layout`/`tone` are additive and used consistently; `Section`/`Card`/`Eyebrow` prop names match their consumers.
