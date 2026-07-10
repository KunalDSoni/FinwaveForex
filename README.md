# Finwave Forex — Marketing Website

Original, light-minimal marketing site for **Finwave Forex Pvt. Ltd.**, an RBI-approved money changer in Ahmedabad, India. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, and Framer Motion. Fully statically generated except the contact API route.

## Commands

```bash
npm run dev              # local dev server (http://localhost:3000)
npm run build            # production build
npm start                # serve the production build
npm test                 # Vitest (content integrity + contact API)
npm run lint             # ESLint
```

## Environment

```bash
cp .env.example .env.local
```

- `RESEND_API_KEY` — Resend key for contact-form email delivery. Without it, submissions are validated and logged server-side, and the UI tells the visitor to also call.
- `CONTACT_TO_EMAIL` — recipient address (defaults to info@finwaveforex.com).

## Structure

```
src/
  app/                  # routes, sitemap.ts, robots.ts, opengraph-image.tsx
    api/contact/        # Resend-backed contact endpoint (+ tests)
    services/[slug]/    # SSG service detail pages
  components/
    layout/             # Header, MobileNav, Footer, JsonLd
    sections/           # page sections (Hero, ServicesGrid, RatesTable, ...)
    motion/             # Reveal, MaskText, CountUp, Ticker primitives
    ui/                 # shadcn/ui primitives
  content/              # ALL copy & data as typed objects (edit content here)
  lib/                  # seo helper, contact schema, utils
```

All copy, contact details, services, and rates live in `src/content/` — pages are pure presentation. Motion respects `prefers-reduced-motion` throughout.

## Quality gates (last verified)

- Lighthouse (desktop, production build): Performance 99–100, Accessibility 100, Best Practices 100, SEO 100 on every audited page.
- `npm run lint`, `tsc --noEmit`, `npm test`, `npm run build` all clean.

## Deployment

Vercel-ready — no special configuration. Set `RESEND_API_KEY` in the project env. Update `siteConfig.url` in `src/content/site.ts` if the production domain differs.

## Outstanding content TODOs

These need real information from Finwave Forex (searchable as `TODO:` in `src/content/`):

- Production domain confirmation (`src/content/site.ts`)
- RBI licence number and business hours (`src/content/site.ts`)
- Actual daily rates or a live rate feed (`src/content/rates.ts` — currently "Ask us")
- KYC document list for currency exchange (`src/content/services.ts`)
- Remittance purposes, limits, and TT/DD timelines (`src/content/services.ts`)
- Travel-card partner banks, supported currencies, reload process (`src/content/services.ts`)
- Corporate FX service scope, onboarding, credit terms (`src/content/services.ts`)
- Privacy Policy and Terms of Service final legal wording + effective dates (`src/content/legal.ts`)
- Leadership/team details for the About page
- Verified Resend sender domain for the contact form (`src/app/api/contact/route.ts`)
- Logo asset (currently a typographic wordmark), social links, brand photography
