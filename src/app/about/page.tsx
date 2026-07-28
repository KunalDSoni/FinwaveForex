import { Fragment } from "react";
import { BadgeCheck, Building2, Globe2, Handshake, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CitiesSection } from "@/components/sections/CitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { PullQuote } from "@/components/sections/PullQuote";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { BrandVisual } from "@/components/ui/brand-visual";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { currencies } from "@/content/rates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, serving six cities across India.",
  path: "/about",
});

const values = [
  {
    icon: Handshake,
    title: "Transparency",
    body: "Rates quoted up front, and we'll try to better any quote you bring us.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    body: "RBI-approved and fully KYC-compliant on every transaction.",
  },
  {
    icon: Truck,
    title: "Convenience",
    body: "Home delivery and branch pick-up across six cities in India.",
  },
];

/** Verifiable facts only — every row is drawn from site content, not invented. */
const glance = [
  { icon: Building2, label: "Registered entity", value: siteConfig.legalName },
  { icon: ShieldCheck, label: "Regulatory status", value: "RBI-approved money changer" },
  { icon: Globe2, label: "Currencies handled", value: `${currencies.length} currencies` },
  {
    icon: BadgeCheck,
    label: "Head office",
    value: `${siteConfig.address.line2}, ${siteConfig.address.city}`,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Editorial hero: statement and lead share a full-width split. */}
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:pt-36">
        <SectionHeading
          as="h1"
          layout="split"
          eyebrow="About us"
          lines={[
            <Fragment key="l1">A decade of</Fragment>,
            <Fragment key="l2">
              <Em>honest</Em> exchange.
            </Fragment>,
          ]}
          sub={`${siteConfig.legalName} is an RBI-approved money changer with 10 years' experience in foreign exchange, providing services at the most competitive rates in the market.`}
        />

        {/* Brand banner + credentials, so the page proves itself before it explains itself. */}
        <Reveal delay={0.15}>
          <div className="group mt-14 overflow-hidden rounded-2xl border border-hairline">
            <div className="aspect-[21/6] w-full">
              <BrandVisual seed="about-finwave" />
            </div>
          </div>
        </Reveal>
        <dl className="hairline-grid mt-5 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map((row, index) => (
            <Reveal key={row.label} delay={index * 0.07} className="hairline-cell px-6 py-6">
              <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
                <row.icon className="size-4 shrink-0 text-brand-deep" aria-hidden />
                {row.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold tracking-tight">{row.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Values */}
      <Section innerClassName="pt-20 pb-10 lg:pt-24 lg:pb-12">
        <SectionHeading
          eyebrow="What we stand for"
          lines={[
            <Fragment key="l1">Three things we</Fragment>,
            <Fragment key="l2">
              refuse to <Em>compromise on.</Em>
            </Fragment>,
          ]}
        />
        <div className="hairline-grid mt-12 sm:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className="hairline-cell group relative p-8"
            >
              <span className="tnum absolute top-7 right-7 text-xs font-medium text-ink-soft/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-[background-color,box-shadow] duration-300 group-hover:bg-brand group-hover:text-ink group-hover:ring-brand/40">
                <value.icon
                  className="size-[22px] transition-transform duration-300 group-hover:-rotate-6"
                  aria-hidden
                />
              </span>
              <h2 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{value.title}</h2>
              <p className="mt-2.5 text-sm leading-6 text-ink-soft">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <StatsBand innerClassName="pt-6 pb-20 lg:pt-8 lg:pb-24" />

      <PullQuote />

      <CitiesSection />

      {/* Leadership block intentionally omitted until Finwave provides real team details. */}

      <CtaBand />
    </>
  );
}
