# Finwave Forex Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an original, light-minimal, multi-page marketing website for Finwave Forex Pvt. Ltd. (Next.js App Router, static-first) with a Resend-backed contact form.

**Architecture:** Statically generated Next.js App Router app. All copy/data lives in typed objects under `src/content/`; components are pure presentation. Framer Motion provides all animation via four reusable primitives. One API route (`/api/contact`) handles form delivery via Resend, env-gated with a graceful fallback.

**Tech Stack:** Next.js 15 (App Router, TypeScript, `src/` dir), Tailwind CSS v4, shadcn/ui, framer-motion, lucide-react, react-hook-form + zod, Resend, Vitest.

## Global Constraints

- Working branch: `feature/finwave-website` in the FinwaveForex repo (already checked out).
- Only verified business facts appear as facts (see spec §Content facts). Anything unverified is a visible `TODO:` in `src/content/` — never invented.
- Excluded template junk from the old site: `+1 810-991-3842`, `zoner@example.com`, US property listings.
- All motion honors `prefers-reduced-motion` (via `useReducedMotion` or `motion-reduce:` utilities).
- No inline styles; no GSAP/Lenis; no third-party scripts.
- Zero lint errors/warnings, zero TS errors at every commit.
- Commit messages end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Design tokens (exact): base `#FAFAF7`, ink `#0B0B0E`, ink-soft `#52525E`, accent `#0E6E5C`, accent-deep `#0A5748`, accent-tint `#E4F0EB`, sand `#F1EEE6`, hairline `#E4E2DB`. Font: Inter (next/font). Radius: 0.75rem default.
- Verified contact facts: Finwave Forex Pvt. Ltd., Ground Floor, Raja Complex, Vijay Cross Road, Ahmedabad — 380009 · +91 79 4891 6100 · info@finwaveforex.com. RBI-approved money changer, 10 years' experience. Cities: Ahmedabad, Bangalore, Chennai, Cochin, Kolkata, Mumbai. 15 currencies: USD GBP EUR AUD SGD THB SAR AED CAD NZD HKD CNY OMR KWD CHF.

---

### Task 1: Scaffold project, design tokens, fonts

**Files:**
- Create: entire Next.js scaffold at repo root (`package.json`, `src/app/*`, configs) via create-next-app
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `.env.example`

**Interfaces:**
- Produces: Tailwind token utilities (`bg-base`, `text-ink`, `text-ink-soft`, `bg-accent`, `bg-accent-deep`, `bg-accent-tint`, `bg-sand`, `border-hairline`), `--font-sans` = Inter, shadcn `ui/` components (button, input, textarea, label, accordion, sheet), `cn()` from `src/lib/utils.ts`.

- [ ] **Step 1: Scaffold into the existing repo**

The repo root contains only `.git/` and `docs/`. create-next-app refuses non-empty dirs, so scaffold in a temp dir and move:

```bash
cd /Users/kunal/Downloads/Agentic/Websites/Test
npx -y create-next-app@latest /tmp/finwave-scaffold --ts --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm --yes
rsync -a --exclude='.git' /tmp/finwave-scaffold/ ./
rm -rf /tmp/finwave-scaffold
```

- [ ] **Step 2: Install dependencies**

```bash
npm i framer-motion lucide-react react-hook-form zod @hookform/resolvers resend
npm i -D vitest
```

- [ ] **Step 3: Init shadcn/ui and add primitives**

```bash
npx -y shadcn@latest init -y -b neutral
npx -y shadcn@latest add -y button input textarea label accordion sheet
```

If `init` prompts anyway, accept defaults (neutral base, CSS variables).

- [ ] **Step 4: Replace `src/app/globals.css` theme block**

Keep the shadcn-generated `:root`/`.dark` variable blocks and `@import "tailwindcss"` line; add our tokens and base styles. Final file must contain (in addition to shadcn's output):

```css
@theme {
  --color-base: #fafaf7;
  --color-ink: #0b0b0e;
  --color-ink-soft: #52525e;
  --color-accent: #0e6e5c;
  --color-accent-deep: #0a5748;
  --color-accent-tint: #e4f0eb;
  --color-sand: #f1eee6;
  --color-hairline: #e4e2db;
}

:root {
  --radius: 0.75rem;
  --primary: #0e6e5c;
  --primary-foreground: #fafaf7;
  --ring: #0e6e5c;
}

body {
  @apply bg-base text-ink antialiased;
}

::selection {
  @apply bg-accent-tint text-accent-deep;
}
```

(The `--primary`/`--ring` overrides restyle shadcn buttons/inputs to the accent. If shadcn emitted oklch values, plain hex still works — leave the rest of its block untouched.)

- [ ] **Step 5: Wire Inter in `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Finwave Forex",
  description: "RBI-approved money changers in Ahmedabad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

Delete the default `src/app/page.tsx` content and replace with a minimal placeholder (`export default function Home() { return <main /> }`) — real page comes in Task 6.

- [ ] **Step 6: Create `.env.example`**

```bash
# Resend API key for the contact form. Without it, submissions are logged
# server-side and the UI shows a "not configured" notice.
RESEND_API_KEY=
# Recipient for contact submissions.
CONTACT_TO_EMAIL=info@finwaveforex.com
```

- [ ] **Step 7: Verify**

```bash
npm run lint && npx tsc --noEmit && npm run build
```
Expected: all clean, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js app with design tokens and UI primitives"
```

---

### Task 2: Typed content layer + Vitest content-integrity tests

**Files:**
- Create: `src/content/site.ts`, `src/content/services.ts`, `src/content/rates.ts`, `src/content/legal.ts`
- Create: `vitest.config.ts`, `src/content/content.test.ts`
- Modify: `package.json` (add `"test": "vitest run"` script)

**Interfaces:**
- Produces: `siteConfig` (name, legalName, tagline, url, phone, email, address, cities, stats, nav, footerNav), `services: Service[]` with `Service = { slug, name, shortName, icon, blurb, description, features: string[], steps: {title, body}[], faqs: {q, a}[] }`, `currencies: Currency[]` with `Currency = { code, name, indicativeBuy: number | null, indicativeSell: number | null }`, `legalPages: LegalPage[]` with `LegalPage = { slug, title, updated, sections: {heading, body}[] }`.
- `icon` values are Lucide component names as string literals: `"Banknote" | "Send" | "CreditCard" | "Building2"`.

- [ ] **Step 1: Write `src/content/site.ts`**

```ts
export const siteConfig = {
  name: "Finwave Forex",
  legalName: "Finwave Forex Pvt. Ltd.",
  tagline: "RBI-approved money changers with a decade of foreign-exchange experience.",
  // TODO: confirm production domain (finwaveforex.com assumed).
  url: "https://finwaveforex.com",
  phone: "+91 79 4891 6100",
  phoneHref: "tel:+917948916100",
  email: "info@finwaveforex.com",
  address: {
    line1: "Ground Floor, Raja Complex",
    line2: "Vijay Cross Road",
    city: "Ahmedabad",
    postalCode: "380009",
    region: "Gujarat",
    country: "IN",
  },
  cities: ["Ahmedabad", "Bangalore", "Chennai", "Cochin", "Kolkata", "Mumbai"],
  fulfilment: ["Home delivery", "Branch pick-up"],
  stats: [
    { value: 10, suffix: "+", label: "Years in foreign exchange" },
    { value: 15, suffix: "+", label: "Currencies exchanged" },
    { value: 6, suffix: "", label: "Cities served across India" },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Rates", href: "/rates" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLegal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  // TODO: RBI licence number not published on the current site.
  rbiLicence: "TODO: RBI licence number",
  // TODO: business hours not published on the current site.
  hours: "TODO: business hours",
} as const;

export type SiteConfig = typeof siteConfig;
```

- [ ] **Step 2: Write `src/content/services.ts`**

Four services. Facts from the old site only; unknown specifics are TODO strings. Full content (blurbs/steps written as honest generic descriptions of the service, no invented claims):

```ts
export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: "Banknote" | "Send" | "CreditCard" | "Building2";
  blurb: string;
  description: string;
  features: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "currency-exchange",
    name: "Currency Exchange",
    shortName: "Exchange",
    icon: "Banknote",
    blurb: "Buy and sell foreign currency notes and traveller's cheques at competitive market rates.",
    description:
      "Exchange 15+ major currencies — from US dollars to Kuwaiti dinar — as an RBI-approved money changer. We buy and sell currency notes and traveller's cheques, with home delivery or branch pick-up in six cities.",
    features: [
      "15+ currencies bought and sold",
      "Traveller's cheques encashed and issued",
      "Home delivery or branch pick-up",
      "Competitive rates — ask us to better your quote",
    ],
    steps: [
      { title: "Tell us your requirement", body: "Choose the currency, amount, and whether you're buying or selling." },
      { title: "Get a live quote", body: "We confirm today's rate over phone or email — and try to better any rate you have." },
      { title: "Delivery or pick-up", body: "Receive your currency by home delivery or collect it from our Ahmedabad office." },
    ],
    faqs: [
      { q: "Which currencies do you exchange?", a: "USD, GBP, EUR, AUD, SGD, THB, SAR, AED, CAD, NZD, HKD, CNY, OMR, KWD and CHF." },
      { q: "What documents do I need?", a: "TODO: confirm KYC document list with Finwave Forex." },
    ],
  },
  {
    slug: "remittance",
    name: "Wire Transfers & Remittance",
    shortName: "Remittance",
    icon: "Send",
    blurb: "Outward wire transfers (TT/DD) for education, family maintenance, and travel.",
    description:
      "Send money abroad through wire transfer (TT) or demand draft (DD) with an RBI-approved money changer handling the paperwork and compliance.",
    features: [
      "Telegraphic transfers (TT) and demand drafts (DD)",
      "RBI-compliant documentation handled for you",
      "Competitive exchange rates on transfers",
      "TODO: confirm supported remittance purposes and limits",
    ],
    steps: [
      { title: "Share transfer details", body: "Beneficiary, destination, currency, and purpose of the remittance." },
      { title: "Complete documentation", body: "We guide you through the KYC and LRS paperwork required by RBI." },
      { title: "Funds dispatched", body: "Your transfer is sent by TT or DD and we confirm once it's on its way." },
    ],
    faqs: [
      { q: "How long does a wire transfer take?", a: "TODO: confirm typical TT/DD timelines with Finwave Forex." },
      { q: "What are the transfer limits?", a: "TODO: confirm limits under the RBI Liberalised Remittance Scheme." },
    ],
  },
  {
    slug: "travel-cards",
    name: "Travel Currency Cards",
    shortName: "Travel Cards",
    icon: "CreditCard",
    blurb: "Prepaid multi-currency cards — a safer way to carry money abroad.",
    description:
      "Load a traveller's currency card before you fly and spend abroad without carrying large amounts of cash. Reloadable and safer than notes.",
    features: [
      "Prepaid cards loadable in major currencies",
      "Safer than carrying cash",
      "TODO: confirm card partner banks and reload process",
      "TODO: confirm supported card currencies",
    ],
    steps: [
      { title: "Choose your currencies", body: "Pick the currency mix for your trip." },
      { title: "Complete KYC and load", body: "Submit documents and load the card at today's rate." },
      { title: "Spend abroad", body: "Use the card at ATMs and merchants worldwide; reload if you need more." },
    ],
    faqs: [
      { q: "Can I reload the card while abroad?", a: "TODO: confirm reload process with Finwave Forex." },
    ],
  },
  {
    slug: "corporate-fx",
    name: "Corporate & Business FX",
    shortName: "Corporate FX",
    icon: "Building2",
    blurb: "Foreign-exchange support for businesses — bulk exchange, transfers, and employee travel.",
    description:
      "Dedicated foreign-exchange support for companies: bulk currency for business travel, outward transfers, and traveller's cards for teams. TODO: confirm the corporate service scope with Finwave Forex.",
    features: [
      "Bulk currency exchange for business travel",
      "Business wire transfers (TT/DD)",
      "Travel cards for employees",
      "TODO: confirm corporate onboarding and credit terms",
    ],
    steps: [
      { title: "Talk to us", body: "Tell us your company's FX requirement." },
      { title: "Agree rates and paperwork", body: "We set up documentation and quote competitive rates." },
      { title: "Ongoing support", body: "A single point of contact for repeat requirements." },
    ],
    faqs: [
      { q: "Do you offer corporate accounts?", a: "TODO: confirm corporate account offering with Finwave Forex." },
    ],
  },
];
```

- [ ] **Step 3: Write `src/content/rates.ts`**

```ts
export type Currency = {
  code: string;
  name: string;
  /** Illustrative only — TODO: replace with actual daily rates or a live feed. */
  indicativeBuy: number | null;
  indicativeSell: number | null;
};

// Order matches the currency list on finwaveforex.com.
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "GBP", name: "British Pound", indicativeBuy: null, indicativeSell: null },
  { code: "EUR", name: "Euro", indicativeBuy: null, indicativeSell: null },
  { code: "AUD", name: "Australian Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "SGD", name: "Singapore Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "THB", name: "Thai Baht", indicativeBuy: null, indicativeSell: null },
  { code: "SAR", name: "Saudi Riyal", indicativeBuy: null, indicativeSell: null },
  { code: "AED", name: "UAE Dirham", indicativeBuy: null, indicativeSell: null },
  { code: "CAD", name: "Canadian Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "NZD", name: "New Zealand Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "HKD", name: "Hong Kong Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "CNY", name: "Chinese Yuan", indicativeBuy: null, indicativeSell: null },
  { code: "OMR", name: "Omani Rial", indicativeBuy: null, indicativeSell: null },
  { code: "KWD", name: "Kuwaiti Dinar", indicativeBuy: null, indicativeSell: null },
  { code: "CHF", name: "Swiss Franc", indicativeBuy: null, indicativeSell: null },
];

export const tickerPairs = currencies.slice(0, 8).map((c) => `${c.code}/INR`);
```

Rates are `null` (rendered as "Ask us") rather than invented numbers — the UI shows a "call for today's rate" treatment.

- [ ] **Step 4: Write `src/content/legal.ts`**

```ts
export type LegalPage = {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

const TODO_LEGAL =
  "TODO: This section requires review and final wording from Finwave Forex Pvt. Ltd. and its legal counsel. Placeholder only — not legal text.";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "TODO: set effective date",
    sections: [
      { heading: "Information we collect", body: TODO_LEGAL },
      { heading: "How we use your information", body: TODO_LEGAL },
      { heading: "KYC and regulatory obligations", body: TODO_LEGAL },
      { heading: "Data retention", body: TODO_LEGAL },
      { heading: "Contact", body: "Questions about this policy: info@finwaveforex.com." },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "TODO: set effective date",
    sections: [
      { heading: "Services", body: TODO_LEGAL },
      { heading: "Rates and quotations", body: TODO_LEGAL },
      { heading: "KYC requirements", body: TODO_LEGAL },
      { heading: "Limitation of liability", body: TODO_LEGAL },
      { heading: "Governing law", body: TODO_LEGAL },
    ],
  },
];
```

- [ ] **Step 5: Vitest config + failing content tests**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { include: ["src/**/*.test.ts"] },
});
```

Add to `package.json` scripts: `"test": "vitest run"`.

`src/content/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { currencies } from "@/content/rates";

describe("content integrity", () => {
  it("has the 15 currencies from finwaveforex.com", () => {
    expect(currencies).toHaveLength(15);
    expect(currencies.map((c) => c.code)).toContain("KWD");
    expect(new Set(currencies.map((c) => c.code)).size).toBe(15);
  });

  it("has four services with complete cards and unique slugs", () => {
    expect(services).toHaveLength(4);
    for (const s of services) {
      expect(s.slug).toMatch(/^[a-z-]+$/);
      expect(s.blurb.length).toBeGreaterThan(20);
      expect(s.features.length).toBeGreaterThan(2);
      expect(s.steps.length).toBe(3);
    }
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
  });

  it("contains no leftover template junk from the old site", () => {
    const all = JSON.stringify({ siteConfig, services, currencies });
    expect(all).not.toContain("zoner@example.com");
    expect(all).not.toContain("810-991");
  });

  it("has verified contact details", () => {
    expect(siteConfig.email).toBe("info@finwaveforex.com");
    expect(siteConfig.phone).toBe("+91 79 4891 6100");
    expect(siteConfig.cities).toHaveLength(6);
  });
});
```

- [ ] **Step 6: Run tests — expect pass (content written in Steps 1–4)**

```bash
npm test
```
Expected: 4 passing.

- [ ] **Step 7: Verify types and commit**

```bash
npx tsc --noEmit && git add -A && git commit -m "feat: typed content layer with verified Finwave Forex facts"
```

---

### Task 3: Motion primitives

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `src/components/motion/MaskText.tsx`, `src/components/motion/CountUp.tsx`, `src/components/motion/Ticker.tsx`
- Modify: `src/app/globals.css` (marquee keyframes)

**Interfaces:**
- Produces:
  - `<Reveal delay? className? once?>` — fade + 24px rise on scroll into view.
  - `<MaskText lines: string[] as? className? delay?>` — per-line mask reveal (overflow-hidden line wrappers, y 110%→0, 80ms stagger).
  - `<CountUp value: number suffix? className?>` — spring count-up when in view.
  - `<Ticker items: string[] speed?>` — CSS marquee, duplicated content `aria-hidden`, pauses for reduced motion.

- [ ] **Step 1: `Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({ children, delay = 0, className, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: `MaskText.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type MaskTextProps = {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

export function MaskText({ lines, className, delay = 0, as: Tag = "h2" }: MaskTextProps) {
  const reduce = useReducedMotion();
  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 3: `CountUp.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type CountUpProps = { value: number; suffix?: string; className?: string };

export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    mv.set(value);
  }, [inView, reduce, mv, value, suffix]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      }),
    [spring, suffix],
  );

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
```

- [ ] **Step 4: `Ticker.tsx` + keyframes**

```tsx
import { cn } from "@/lib/utils";

type TickerProps = { items: string[]; className?: string; durationSec?: number };

export function Ticker({ items, className, durationSec = 28 }: TickerProps) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm tracking-wide text-ink-soft">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("overflow-hidden border-y border-hairline bg-sand/60", className)}>
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={undefined /* duration set via CSS var utility below */}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
```

Note: set duration with a CSS var — add `[--marquee-duration:28s]` on the wrapper div's className instead of `style` (no inline styles rule). Final wrapper className: `` cn("flex w-max animate-marquee motion-reduce:animate-none") `` with the parent adding `[--marquee-duration:28s]`. In `globals.css` add:

```css
@theme {
  --animate-marquee: marquee var(--marquee-duration, 28s) linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

(Drop the unused `durationSec` prop if not wired — no dead code.)

- [ ] **Step 5: Verify + commit**

```bash
npm run lint && npx tsc --noEmit
git add -A && git commit -m "feat: reusable motion primitives (Reveal, MaskText, CountUp, Ticker)"
```

---

### Task 4: Layout shell — Header, MobileNav, Footer, root layout with SEO base

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/JsonLd.tsx`, `src/lib/seo.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig` from Task 2.
- Produces: `pageMetadata({ title, description, path }): Metadata` from `src/lib/seo.ts`; layout renders `<Header />`, `{children}`, `<Footer />`, JSON-LD script.

- [ ] **Step 1: `src/lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
```

- [ ] **Step 2: `Header.tsx`** — sticky client component; transparent at top, `backdrop-blur + bg-base/80 + border-b border-hairline` after 8px scroll (framer-motion `useScroll` + `useMotionValueEvent`). Contains typographic wordmark ("Finwave **Forex**" — bold accent on second word), nav from `siteConfig.nav`, CTA button → `/contact`, and `<MobileNav />` behind `md:hidden`.

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-hairline bg-base/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Finwave <span className="text-accent">Forex</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Get a quote</Link>
          </Button>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
```

- [ ] **Step 3: `MobileNav.tsx`** — shadcn `Sheet` (side="top", full height) with hamburger trigger (`Menu`/`X` from lucide), links from `siteConfig.nav` + contact CTA, staggered entrance via framer-motion `variants` on the list. Close on link click (controlled `open` state).

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/content/site";

const list = { visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-dvh bg-base">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <motion.ul initial="hidden" animate="visible" variants={list} className="mt-16 space-y-2 px-2">
          {[...siteConfig.nav, { label: "Get a quote", href: "/contact" }].map((link) => (
            <motion.li key={link.href + link.label} variants={item}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-3xl font-semibold tracking-tight"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 4: `Footer.tsx`** — server component, `bg-sand/60 border-t border-hairline`. Four columns on desktop (brand + tagline, nav, contact details with `tel:`/`mailto:` links + address, legal links), bottom row with `© {year} Finwave Forex Pvt. Ltd.` and RBI-approved note. All data from `siteConfig`.

- [ ] **Step 5: `JsonLd.tsx`** — renders `Organization` + `LocalBusiness` JSON-LD `<script type="application/ld+json">` from `siteConfig` (name, legalName, url, phone, email, address, areaServed cities).

- [ ] **Step 6: Update `src/app/layout.tsx`** — add `metadataBase: new URL(siteConfig.url)`, title template `{ default: "Finwave Forex — RBI-Approved Money Changers", template: "%s — Finwave Forex" }`, description from tagline, render `<JsonLd />`, `<Header />`, `<main>{children}</main>`, `<Footer />`. Add a skip-link (`<a href="#content" className="sr-only focus:not-sr-only ...">Skip to content</a>`) and `id="content"` on main.

- [ ] **Step 7: Verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "feat: layout shell with header, mobile nav, footer, and SEO base"
```

---

### Task 5: Home hero + ticker + quote card

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/QuoteCard.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `MaskText`, `Reveal`, `Ticker`, `tickerPairs`, `siteConfig`, `Button`.
- Produces: `<Hero />` self-contained section used by `src/app/page.tsx`.

- [ ] **Step 1: `QuoteCard.tsx`** — client component; a floating illustrative exchange-quote card: sand-tinted card (`rounded-2xl border border-hairline bg-white shadow-[0_24px_60px_-24px_rgb(11_11_14_/0.18)]`) showing "You send USD → You receive INR", an "Ask us for today's rate" pill, and "RBI-approved" badge. Gentle float: `animate={{ y: [-6, 6] }} transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}`, disabled via `useReducedMotion`. Labeled "Illustrative" — no invented numbers.

- [ ] **Step 2: `Hero.tsx`** — section `pt-32 pb-20 lg:pt-44`, max-w-6xl grid `lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center`.
  - Eyebrow (Reveal): `RBI-approved money changers · Since 2015` in small caps accent. (10 years' experience + 2015 copyright on old site; keep "Since 2015" — verified by the old site's copyright line. If uncertain, use "10+ years of foreign exchange".) **Use: "RBI-approved · 10+ years in foreign exchange"** — fully verified.
  - `MaskText as="h1"` lines: `["The clearer way to", "exchange currency."]`, `text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter`.
  - Sub copy (Reveal, delay 0.2): "Buy and sell 15+ currencies, send money abroad, and load travel cards — at rates we'll work to better. Home delivery in six cities across India."
  - CTAs (Reveal, delay 0.3): primary Button → `/contact` "Get a quote", ghost Button → `/rates` "See rates →" (arrow = lucide `ArrowRight`, slides 2px on hover via `group-hover:translate-x-0.5 transition-transform`).
  - Right column: `<QuoteCard />`.
  - Below grid: `<Ticker items={tickerPairs} />` full-bleed.

- [ ] **Step 3: Assemble minimal `src/app/page.tsx`** with just `<Hero />` for now; export `metadata = pageMetadata({ title: ..., description: ..., path: "/" })`. Home title overrides template: use plain full title "Finwave Forex — RBI-Approved Money Changers in Ahmedabad" via `title: { absolute: ... }`.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```
Open http://localhost:3000 — verify mask reveal plays, ticker scrolls, card floats, responsive at 375px.

- [ ] **Step 5: Verify + commit**

```bash
npm run lint && npx tsc --noEmit
git add -A && git commit -m "feat: home hero with mask-reveal headline, quote card, and rate ticker"
```

---

### Task 6: Remaining home sections + full home page

**Files:**
- Create: `src/components/sections/ServicesGrid.tsx`, `src/components/sections/ServiceCard.tsx`, `src/components/sections/RatesTeaser.tsx`, `src/components/sections/StatsBand.tsx`, `src/components/sections/CitiesSection.tsx`, `src/components/sections/CtaBand.tsx`, `src/components/sections/SectionHeading.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services`, `currencies`, `siteConfig`, motion primitives, `Button`.
- Produces: composable sections; `SectionHeading({ eyebrow, lines, sub? })` reused by all pages; `ServiceCard({ service, index })` reused by `/services`.

- [ ] **Step 1: `SectionHeading.tsx`** — server-compatible wrapper: eyebrow (small-caps accent, Reveal), `MaskText as="h2"` `text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight`, optional sub-paragraph (Reveal delay 0.15, `text-ink-soft max-w-2xl`).

- [ ] **Step 2: `ServiceCard.tsx`** — client component. `motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}`, card `rounded-2xl border border-hairline bg-white p-8`, icon in `size-11 rounded-xl bg-accent-tint text-accent` box (lucide icon resolved from a `{ Banknote, Send, CreditCard, Building2 }` map — keyed by `service.icon`), name, blurb, `Link` "Learn more" with sliding `ArrowRight` (group hover). Entire card wrapped in `Reveal delay={index * 0.08}`.

- [ ] **Step 3: `ServicesGrid.tsx`** — `SectionHeading eyebrow="Services" lines={["Everything foreign exchange,", "under one roof."]}`, grid `sm:grid-cols-2 lg:grid-cols-4 gap-5` of `ServiceCard`s.

- [ ] **Step 4: `RatesTeaser.tsx`** — `bg-sand/60 border-y border-hairline` band. Left: SectionHeading (eyebrow "Rates", lines ["Rates we'll work", "to better."], sub: "This is an approximate guide — we can surely better the rate for you. Call for today's live quote."). Right: compact list of first 5 currencies (`code`, `name`, "Ask us" chip), Button → `/rates`.

- [ ] **Step 5: `StatsBand.tsx`** — three columns from `siteConfig.stats`, each `CountUp value suffix` at `text-5xl lg:text-6xl font-semibold tracking-tight`, label in `text-ink-soft text-sm`, each wrapped in Reveal stagger.

- [ ] **Step 6: `CitiesSection.tsx`** — SectionHeading (eyebrow "Coverage", lines ["Six cities.", "Doorstep delivery."]), city chips (`rounded-full border border-hairline bg-white px-5 py-2.5`, Reveal staggered), note row with lucide `Truck`/`MapPin`: "Home delivery" / "Branch pick-up" from `siteConfig.fulfilment`.

- [ ] **Step 7: `CtaBand.tsx`** — the one dark section: `bg-ink text-base rounded-3xl mx-4 sm:mx-6` (inset card look) with radial accent gradient sweep (`bg-[radial-gradient(80%_120%_at_80%_0%,rgb(14_110_92/0.35),transparent)]` overlay div), MaskText h2 ["Get a better rate", "in one phone call."], phone number as large `tel:` link, Button (light) → `/contact`.

- [ ] **Step 8: Assemble `src/app/page.tsx`** in order: Hero, ServicesGrid, RatesTeaser, StatsBand, CitiesSection, CtaBand. Section vertical rhythm: `py-24 lg:py-32` per section.

- [ ] **Step 9: Visual check at 375/768/1280/1920, then verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "feat: complete home page sections"
```

---

### Task 7: Services hub + four service detail pages

**Files:**
- Create: `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/components/sections/ServiceDetail.tsx`

**Interfaces:**
- Consumes: `services`, `ServiceCard`, `SectionHeading`, `Reveal`, `Accordion` (shadcn), `CtaBand`.
- Produces: routes `/services` and `/services/{currency-exchange,remittance,travel-cards,corporate-fx}`.

- [ ] **Step 1: `src/app/services/page.tsx`** — hub: page hero (`pt-32`) with SectionHeading h1-styled (pass `as="h1"` through MaskText via a prop on SectionHeading), 2×2 grid of ServiceCards, CtaBand. `metadata = pageMetadata({ title: "Services", description: "Currency exchange, wire transfers, travel cards and corporate FX from RBI-approved money changers.", path: "/services" })`.

- [ ] **Step 2: `ServiceDetail.tsx`** — presentation for one `Service`: hero (eyebrow "Services / {shortName}", h1 name, description), features as check-list (`Check` lucide in accent-tint circles, Reveal staggered), "How it works" 3-step row (numbered `01/02/03` in accent, Reveal staggered), FAQ via shadcn Accordion, CtaBand. TODO-content strings render as-is (visible placeholders are intentional).

- [ ] **Step 3: `src/app/services/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({ title: service.name, description: service.blurb, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
```

- [ ] **Step 4: Visual check all 5 routes, verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "feat: services hub and detail pages"
```

---

### Task 8: Rates page

**Files:**
- Create: `src/app/rates/page.tsx`, `src/components/sections/RatesTable.tsx`

**Interfaces:**
- Consumes: `currencies`, `SectionHeading`, `Reveal`, `CtaBand`.
- Produces: `/rates` route.

- [ ] **Step 1: `RatesTable.tsx`** — semantic `<table>` in an `overflow-x-auto` wrapper: columns Currency / Code / We buy / We sell. Buy/sell cells render the number when present, else an "Ask us" chip linking to `/contact`. Header row small-caps `text-ink-soft`; zebra hover `hover:bg-sand/50`. Above the table a notice card (lucide `Info`): "Rates shown are indicative only. We can surely better this rate for you — call +91 79 4891 6100 for today's live quote." (echoes the old site's own line). Below: TODO note is NOT rendered in UI; the `null` data + "Ask us" treatment covers it honestly.

- [ ] **Step 2: `src/app/rates/page.tsx`** — hero SectionHeading (h1: ["Today's rates,", "on request."]), RatesTable, CtaBand. Metadata: title "Exchange Rates", description "Indicative buy and sell rates for 15+ currencies. Call Finwave Forex for today's live quote.", path "/rates".

- [ ] **Step 3: Visual check (table scrolls horizontally at 375px), verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "feat: rates page with indicative rate table"
```

---

### Task 9: Contact schema, API route (TDD), contact page

**Files:**
- Create: `src/lib/contact-schema.ts`, `src/app/api/contact/route.ts`, `src/app/api/contact/route.test.ts`, `src/components/sections/ContactForm.tsx`, `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `siteConfig`, shadcn `Input/Textarea/Label/Button`, `react-hook-form`, `zod`.
- Produces: `contactSchema`, `ContactInput`; `POST /api/contact` returning `{ ok: true, delivered: boolean }` or `{ ok: false, error: string }` (400/502); `/contact` route.

- [ ] **Step 1: `src/lib/contact-schema.ts`**

```ts
import { z } from "zod";

export const contactSubjects = [
  "general",
  "currency-exchange",
  "remittance",
  "travel-cards",
  "corporate-fx",
  "rate-enquiry",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  subject: z.enum(contactSubjects),
  message: z.string().min(10, "Tell us a little more").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Write failing route tests** `src/app/api/contact/route.test.ts`

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("rejects an invalid payload with 400", async () => {
    const { POST } = await import("./route");
    const res = await POST(new Request("http://test/api/contact", { method: "POST", body: JSON.stringify({ name: "x" }) }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("accepts a valid payload without RESEND_API_KEY and reports delivered: false", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await import("./route");
    const body = {
      name: "Test Person",
      email: "test@example.com",
      phone: "",
      subject: "general",
      message: "I would like a quote for USD, please.",
    };
    const res = await POST(new Request("http://test/api/contact", { method: "POST", body: JSON.stringify(body) }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true, delivered: false });
  });

  it("rejects non-JSON bodies with 400", async () => {
    const { POST } = await import("./route");
    const res = await POST(new Request("http://test/api/contact", { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL — cannot resolve `./route`.

- [ ] **Step 4: Implement `src/app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/content/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — submission logged, not delivered.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const { name, email, phone, subject, message } = parsed.data;
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Finwave Forex Website <onboarding@resend.dev>", // TODO: switch to a verified finwaveforex.com sender domain
    to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
    replyTo: email,
    subject: `[Website] ${subject} enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send. Please call us instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```
Expected: all pass (content tests + 3 route tests).

- [ ] **Step 6: `ContactForm.tsx`** — client component. react-hook-form + `zodResolver(contactSchema)`. Fields: name, email, phone (optional), subject (native `<select>` styled to match Input, options from `contactSubjects` with readable labels), message (Textarea). Inline field errors (`text-sm text-red-600`, `aria-describedby`). Submit states: idle → submitting (spinner via lucide `Loader2 animate-spin`) → success panel (check icon + "Thanks — we'll get back to you shortly." — if `delivered: false`, append "Email delivery isn't configured yet; please also call us on +91 79 4891 6100.") → error notice on failure with phone fallback. Accepts `defaultSubject?: ContactInput["subject"]` prop.

- [ ] **Step 7: `src/app/contact/page.tsx`** — two-column: left = SectionHeading (h1 ["Talk to a real", "forex desk."]) + contact facts list (phone `tel:`, email `mailto:`, full address, cities, `siteConfig.hours` TODO rendered as "Hours: on request" — do NOT render raw TODO strings on this page; use "Call for current hours"), right = ContactForm in a white card. Map embed: skip (no third-party scripts) — static address card instead. Metadata path "/contact".

- [ ] **Step 8: Manual e2e check** — `npm run dev`, submit invalid (see inline errors), submit valid (see success + not-configured notice; server log shows warning).

- [ ] **Step 9: Verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
git add -A && git commit -m "feat: contact page with validated Resend-backed form"
```

---

### Task 10: About + legal pages

**Files:**
- Create: `src/app/about/page.tsx`, `src/app/(legal)/privacy/page.tsx`, `src/app/(legal)/terms/page.tsx`, `src/components/sections/LegalArticle.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `legalPages`, `SectionHeading`, `Reveal`, `StatsBand`, `CtaBand`.
- Produces: `/about`, `/privacy`, `/terms` routes.

- [ ] **Step 1: `src/app/about/page.tsx`** — hero (h1 ["A decade of", "honest exchange."], sub = verified about text: "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, serving customers at the most competitive rates in the market."); values grid (3 cards: Transparency — "Rates quoted up front, and we'll try to better any quote you bring us."; Compliance — "RBI-approved and fully KYC-compliant on every transaction."; Convenience — "Home delivery and branch pick-up across six cities."); StatsBand; team section placeholder — a bordered card: "Leadership — TODO: team details to be provided by Finwave Forex."; CtaBand. Metadata path "/about".

- [ ] **Step 2: `LegalArticle.tsx`** — renders a `LegalPage`: h1, "Last updated: {updated}" (renders the TODO string verbatim — intentional visibility), sections as `h2` + paragraph, `prose-like` styling with max-w-3xl.

- [ ] **Step 3: Legal routes** — each page finds its entry in `legalPages` by slug, renders `LegalArticle`, exports `pageMetadata`. Route group `(legal)` keeps them organized without affecting URLs.

- [ ] **Step 4: Verify + commit**

```bash
npm run lint && npx tsc --noEmit && npm run build
git add -A && git commit -m "feat: about page and legal page stubs"
```

---

### Task 11: SEO artifacts — sitemap, robots, OG image

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `services`.
- Produces: `/sitemap.xml`, `/robots.txt`, default OG image for all pages.

- [ ] **Step 1: `sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/rates", "/about", "/contact", "/privacy", "/terms"];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/rates" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: `robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: `opengraph-image.tsx`** — `next/og` ImageResponse, 1200×630: base background, wordmark large, tagline, accent bar. (Inline style props are required by `ImageResponse` — the no-inline-styles rule applies to the site's React DOM components, not OG image generation; note this in the PR.)

- [ ] **Step 4: Verify + commit**

```bash
npm run build
curl -s http://localhost:3000/sitemap.xml | head   # via `npm start` after build, or check .next output
git add -A && git commit -m "feat: sitemap, robots, and Open Graph image"
```

---

### Task 12: Final verification, polish, README, push + PR

**Files:**
- Modify: `README.md`; any files flagged by verification.

- [ ] **Step 1: Full gate**

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
```
Expected: zero errors, zero warnings; all routes `○ (Static)` except `ƒ /api/contact`.

- [ ] **Step 2: Lighthouse against production build**

```bash
npm run build && (npm start &) && sleep 4
npx -y lighthouse http://localhost:3000 --preset=desktop --quiet --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse-home.json
node -e "const r=require('./lighthouse-home.json').categories; console.log(Object.entries(r).map(([k,v])=>k+': '+Math.round(v.score*100)).join('\n'))"
kill %1
```
Expected: all four ≥95. Fix regressions (unsized images, contrast, missing labels) and re-run. Do not commit the JSON (`rm lighthouse-home.json`, add to `.gitignore` if needed).

- [ ] **Step 3: Responsive + reduced-motion pass** — every route at 375/768/1280/1920; toggle `prefers-reduced-motion` (macOS: System Settings → Accessibility → Display → Reduce motion, or DevTools rendering emulation); confirm no horizontal body scroll anywhere.

- [ ] **Step 4: README.md** — project intro, `npm run dev` / `npm run build && npm start` / `npm test`, env setup (`cp .env.example .env.local`), folder structure block, deploy note (Vercel-ready), and the compiled **TODO list** of missing business content (grep `TODO:` across `src/content` and list each).

- [ ] **Step 5: Commit, push, PR**

```bash
git add -A && git commit -m "docs: README with setup, structure, and content TODOs"
git push -u origin feature/finwave-website
gh pr create --title "feat: Finwave Forex marketing website" --body "..."   # body: summary, verification results, Lighthouse scores, TODO list; end with the Claude Code attribution line
```

Note: `main` has no commits, so if PR creation complains about a missing base, push an empty init commit to main first (`git checkout main && git commit --allow-empty -m "chore: init" && git push -u origin main && git checkout feature/finwave-website`), then create the PR.

- [ ] **Step 6: Report deliverables to user** — branch/PR URLs, commands, folder structure, Lighthouse numbers, TODO list.
