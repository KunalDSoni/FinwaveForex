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

The site is a fully static export (`output: "export"`) — no server runtime. Build-time env vars:

- `NEXT_PUBLIC_BASE_PATH` — subpath the site is served from on a project page (e.g. `/FinwaveForex` for GitHub Pages). Leave unset for a root domain or local dev.
- `NEXT_PUBLIC_FORM_ENDPOINT` — optional Formspree/Web3Forms endpoint for contact-form inbox delivery. Without it, the form opens the visitor's email client (`mailto:`) prefilled with their message.

## Structure

```
src/
  app/                  # routes, sitemap.ts, robots.ts, opengraph-image.tsx
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

Static export — deploys to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3).

**GitHub Pages** (automated): `.github/workflows/deploy.yml` builds and publishes on every push to `dev`. In the repo, set **Settings → Pages → Source: GitHub Actions**. The workflow sets `NEXT_PUBLIC_BASE_PATH=/FinwaveForex`; set a repo variable `NEXT_PUBLIC_FORM_ENDPOINT` for real contact-form delivery.

**Any static host**: `NEXT_PUBLIC_BASE_PATH=<subpath> npm run build`, then serve the generated `out/` directory. Update `siteConfig.url` in `src/content/site.ts` if the production domain differs.

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
- Contact-form delivery endpoint (`NEXT_PUBLIC_FORM_ENDPOINT`) — currently falls back to the visitor's email client
- Logo asset (currently a typographic wordmark), social links, brand photography
