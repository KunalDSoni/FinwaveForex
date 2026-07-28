import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { currencies } from "@/content/rates";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products & Services",
  description:
    "Currency exchange, wire transfers, travel cards and corporate FX from RBI-approved money changers.",
  path: "/services",
});

/** Quick orientation before the cards: what each service is actually for. */
const chooser = [
  { need: "Travelling abroad", pick: "Currency Exchange", slug: "currency-exchange" },
  { need: "Paying fees or family overseas", pick: "Wire Transfers", slug: "remittance" },
  { need: "Spending on a card abroad", pick: "Travel Cards", slug: "travel-cards" },
  { need: "Running company travel", pick: "Corporate FX", slug: "corporate-fx" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:pt-36">
        <SectionHeading
          as="h1"
          layout="split"
          eyebrow="Products & services"
          lines={[
            <Fragment key="l1">Every foreign-exchange</Fragment>,
            <Fragment key="l2">
              need, <Em>handled properly.</Em>
            </Fragment>,
          ]}
          sub={`Four services, one desk: exchange currency, send money abroad, load a travel card, or set up FX for your business. ${currencies.length} currencies, six cities.`}
        />

        {/* "Which one do I need?" — answered before the cards, not after. */}
        <div className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {chooser.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06} className="hairline-cell">
              <Link
                href={`/services/${item.slug}`}
                className="group/pick flex h-full flex-col justify-between gap-4 px-6 py-6 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                <span className="text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
                  {item.need}
                </span>
                <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                  {item.pick}
                  <ArrowRight
                    className="size-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover/pick:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Section innerClassName="pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        {/* Not-sure-which fallback: the desk answers it in one call. */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-col items-start justify-between gap-6 rounded-2xl border border-hairline bg-white px-8 py-8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold tracking-tight">Not sure which you need?</p>
                <p className="mt-1 text-sm leading-6 text-ink-soft">
                  Tell us where you&apos;re going and what it&apos;s for, and we&apos;ll point you
                  to the cheapest route.
                </p>
              </div>
            </div>
            <Button asChild size="lg" variant="outline" className="shrink-0 border-ink/20">
              <a href={siteConfig.phoneHref}>
                <PhoneCall className="size-4" aria-hidden />
                {siteConfig.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
