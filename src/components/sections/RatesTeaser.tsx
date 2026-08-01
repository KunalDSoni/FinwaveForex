import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { Figure } from "@/components/sections/Figure";
import { LiveRate } from "@/components/sections/LiveRate";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";
import { currencies } from "@/content/rates";
import { siteConfig } from "@/content/site";

export function RatesTeaser() {
  return (
    <Section bordered>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Rates"
            lines={[
              <Fragment key="l1">Rates we&apos;ll work</Fragment>,
              <Fragment key="l2">
                to <Em>better.</Em>
              </Fragment>,
            ]}
            sub="Our rates are an approximate guide, we can surely better the rate for you. Call for today's live quote."
          />
          <Reveal delay={0.25}>
            <Button asChild size="lg" className="group mt-8">
              <Link href="/rates">
                See all rates
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="shadow-card overflow-hidden rounded-2xl border border-hairline bg-white">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-3.5">
              <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                Indicative
              </span>
              <span className="text-[11px] font-medium text-ink-soft">Rupees per unit</span>
            </div>
            <ul className="divide-y divide-hairline px-6">
              {currencies.slice(0, 5).map((currency) => (
                <li key={currency.code} className="flex items-center justify-between gap-3 py-4">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="text-lg leading-none" aria-hidden>
                      {currency.flag}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold tracking-tight">
                        {currency.code}
                      </span>
                      <span className="block truncate text-xs text-ink-soft">{currency.name}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <LiveRate code={currency.code} className="tnum text-sm font-medium" />
                    <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-deep">
                      Ask us
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* The rate promise belongs beside the rates, not in its own band. */}
      <Figure
        as="panel"
        quote="We can surely better this rate for you."
        attribution={`Our promise · ${siteConfig.legalName}`}
        className="mt-14"
      />
    </Section>
  );
}
