import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, Check, Send } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/button";
import { BrandVisual } from "@/components/ui/brand-visual";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products & Services",
  description:
    "Currency exchange in 30 major currencies, American Express travellers' cheques, travel currency cards, and outbound remittance by TT or DD.",
  path: "/services",
});

/** Mirrors the live site: three products, then outbound services. */
const products = services.filter((s) => s.slug !== "remittance");
const outbound = services.find((s) => s.slug === "remittance")!;

const chooser = [
  { need: "Travelling abroad", pick: "Currency Exchange", slug: "currency-exchange" },
  { need: "Carrying secured funds", pick: "Travellers' Cheques", slug: "travellers-cheques" },
  { need: "Spending on a card abroad", pick: "Travel Cards", slug: "travel-cards" },
  { need: "Paying fees or family overseas", pick: "Outbound Transfers", slug: "remittance" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Breadcrumb trail={[{ label: "Products & Services" }]} />
        <SectionHeading
          as="h1"
          layout="split"
          lines={[
            <Fragment key="l1">Every foreign-exchange</Fragment>,
            <Fragment key="l2">
              need, <Em>handled properly.</Em>
            </Fragment>,
          ]}
          sub="Three products and one outbound desk: exchange currency, buy or encash travellers' cheques, load a travel card, or send money abroad by TT or DD."
        />

        {/* "Which one do I need?" — answered before the cards, not after. */}
        <div className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {chooser.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06} className="hairline-cell">
              <Link
                href={`/services/${item.slug}`}
                className="group/pick flex h-full flex-col justify-between gap-4 px-6 py-6 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                <span className="label-micro text-ink-soft">
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

      {/* Products */}
      <Section>
        <Reveal>
          <h2 className="display-md">
            Products
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {products.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Section>

      {/* Outbound services — the live site treats this as its own category. */}
      <Section variant="sand" bordered>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Outbound services"
              lines={[
                <Fragment key="l1">Send money abroad,</Fragment>,
                <Fragment key="l2">
                  by <Em>TT or DD.</Em>
                </Fragment>,
              ]}
              sub={outbound.description}
            />
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/services/${outbound.slug}`}>
                    Outbound services in detail
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="group shadow-card overflow-hidden rounded-2xl border border-hairline bg-white">
              <div className="relative aspect-[16/6] w-full border-b border-hairline">
                <BrandVisual seed="remittance" />
                <span className="shadow-soft absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-2xl bg-white/90 text-brand-deep ring-1 ring-hairline backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  <Send className="size-[22px]" aria-hidden />
                </span>
              </div>
              <div className="p-8">
                <p className="label-micro text-ink-soft">
                  Can be used for
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {outbound.features.map((purpose) => (
                    <li key={purpose} className="flex items-start gap-3 text-sm">
                      <Check className="mt-1 size-3.5 shrink-0 text-brand-deep" aria-hidden />
                      {purpose}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        lines={[
          <Fragment key="l1">One desk for</Fragment>,
          <Fragment key="l2">
            every <Em tone="dark">requirement.</Em>
          </Fragment>,
        ]}
        body="Notes, cheques, cards or transfers — tell us what you need and we'll handle the route and the paperwork."
      />
    </>
  );
}
