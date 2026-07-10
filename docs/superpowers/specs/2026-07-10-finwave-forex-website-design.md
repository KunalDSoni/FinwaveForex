# Finwave Forex — Marketing Website Design

**Date:** 2026-07-10
**Status:** Approved by user
**Repo:** github.com/KunalDSoni/FinwaveForex, branch `feature/finwave-website`

## Goal

An original, premium, light-minimal marketing website for Finwave Forex Pvt. Ltd. — an RBI-approved money changer in Ahmedabad, India with 10 years' experience. Genre references: Stripe, Mercury, Linear (clean, fast, corporate-modern). This is an original design, not a reproduction of any existing template.

## Decisions (user-confirmed)

1. **Scope:** Multi-page site.
2. **Theme:** Light minimal — off-white base, near-black ink, one accent.
3. **Functionality:** Working contact form via Resend (env-gated with graceful fallback); rates are static/indicative with TODO for a live source.
4. **Git:** Work in the cloned FinwaveForex repo on `feature/finwave-website`; PR to `main` at the end.
5. **Architecture:** Static-first Next.js App Router + typed content layer; Framer Motion only (no GSAP/Lenis).

## Site map

| Route | Purpose |
|---|---|
| `/` | Hero, trust strip, services overview, rates teaser, why-Finwave stats, cities served, CTA band |
| `/services` | Services hub |
| `/services/currency-exchange` | Currency notes + traveller's cheques |
| `/services/remittance` | Wire transfer (TT/DD) / outward remittance |
| `/services/travel-cards` | Traveller's currency cards |
| `/services/corporate-fx` | Business/corporate FX (thin real content — TODO-heavy) |
| `/rates` | Indicative rate table (15 currencies) + buy/sell enquiry form |
| `/about` | RBI credentials, 10-years story, values; TODOs for team/history |
| `/contact` | Working form, address, phone, email, cities, delivery/pickup note |
| `/privacy`, `/terms` | Structured legal stubs, all unverifiable clauses marked TODO |

## Design system

- **Type:** Inter via `next/font` (self-hosted), weights 400–700. Fluid clamp-based scale, ~14px body-small to ~64px hero display. Tight tracking at display sizes.
- **Color:** warm off-white base (`#FAFAF8` family), near-black ink (`#0A0A0F` family), deep teal-green accent, muted sand neutral for section tinting. All text/background pairs meet WCAG AA.
- **Surfaces:** 1px hairline borders, soft ambient shadows, 12–16px radii, 96–160px desktop section spacing.
- **Components:** shadcn/ui primitives (button, input, select, accordion, sheet) restyled via tokens; Lucide icons. No inline styles.

## Motion design

All via Framer Motion; every effect honors `prefers-reduced-motion`.

- Hero: staggered per-line mask-reveal headline; animated currency-pair ticker strip; floating exchange-quote card composition.
- Header: sticky, translucent → blur + hairline on scroll. Mobile nav: full-screen sheet, staggered links.
- Reusable motion primitives: `<Reveal>` (fade + 24px rise, spring, stagger support), `<MaskText>` (line mask-reveal), `<CountUp>` (in-view number count), `<Ticker>` (marquee).
- Cards: spring hover lift, icon micro-rotation, link-arrow slide.
- CTA band: dark ink section with gradient sweep — the one dark moment.

## Architecture

```
src/
  app/                    # routes, root layout, sitemap.ts, robots.ts
    api/contact/route.ts  # Resend-backed contact endpoint
  components/
    layout/               # Header, Footer, MobileNav
    sections/             # Hero, ServicesGrid, RatesTeaser, StatsBand, CtaBand, ...
    motion/               # Reveal, MaskText, CountUp, Ticker
    ui/                   # shadcn primitives
  content/                # site.ts, services.ts, rates.ts, legal.ts (typed objects)
  lib/                    # utils, zod schemas, seo helper
```

- **Content layer rule:** all copy, nav, contact details, services, currencies, rates live in `content/` as typed objects. Components are pure presentation.
- **Contact flow:** react-hook-form + zod → POST `/api/contact` → Resend → `info@finwaveforex.com`. Without `RESEND_API_KEY`, route logs the submission and returns a distinguishable "not configured" response; the UI shows an honest notice. `.env.example` documents the key.
- **Rates:** `content/rates.ts` static indicative data, labeled "indicative — contact us for today's rate". TODO: live rate API.

## SEO / accessibility / performance

- Per-page `generateMetadata` via a shared helper: titles, descriptions, OpenGraph, Twitter cards, canonicals.
- JSON-LD: `Organization` + `LocalBusiness` with the real Ahmedabad address.
- `sitemap.ts` + `robots.ts` generated routes.
- Semantic landmarks, focus-visible, labeled forms, aria where needed.
- Static generation everywhere, self-hosted font, `next/image`, zero third-party scripts.
- Targets: Lighthouse ≥95 in Performance, Accessibility, SEO, Best Practices; 60fps animations.

## Content facts (verified from finwaveforex.com)

- Finwave Forex Pvt. Ltd. — RBI-approved money changer, 10 years' experience in foreign exchange, "best competitive rate" positioning.
- Address: Ground Floor, Raja Complex, Vijay Cross Road, Ahmedabad — 380009.
- Phone: +91 79 4891 6100. Email: info@finwaveforex.com.
- Products: currency exchange, traveller's cheque, traveller's currency card, wire transfer (TT/DD).
- Currencies (15): USD, GBP, EUR, AUD, SGD, THB, SAR, AED, CAD, NZD, HKD, CNY, OMR, KWD, CHF.
- Cities: Ahmedabad, Bangalore, Chennai, Cochin, Kolkata, Mumbai. Home delivery and pick-up offered.
- **Excluded as template junk from the old site:** +1 810-991-3842, zoner@example.com, US property listings.
- **Not available (ship as TODO placeholders):** team, testimonials, corporate FX detail, blog, FAQ answers beyond the obvious, legal text, RBI license number, business hours, social links, logo asset (use a typographic wordmark).

## Verification plan

1. `next lint` and `tsc --noEmit` clean, zero warnings.
2. Production build succeeds; all routes statically generated (except the API route).
3. Lighthouse against production build — all four categories ≥95.
4. Manual responsive pass: 375px, 768px, 1280px, 1920px on every page.
5. Contact form exercised with and without `RESEND_API_KEY`.
6. Reduced-motion verified.

## Deliverables

Branch URL + PR, run/build commands, folder structure, Lighthouse numbers, and the compiled TODO list of missing business content.
