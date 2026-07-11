import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { currencies } from "@/content/rates";

export function RatesTeaser() {
  return (
    <section className="border-y border-hairline bg-sand/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="Rates"
            lines={[
              <Fragment key="l1">Rates we&apos;ll work</Fragment>,
              <Fragment key="l2">
                to <Em>better.</Em>
              </Fragment>,
            ]}
            sub="Our rates are an approximate guide — we can surely better the rate for you. Call for today's live quote."
          />
          <Reveal delay={0.25}>
            <Button asChild size="lg" className="group mt-8">
              <Link href="/rates">
                See all rates
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <ul className="divide-y divide-hairline rounded-2xl border border-hairline bg-white px-6">
            {currencies.slice(0, 5).map((currency) => (
              <li key={currency.code} className="flex items-center justify-between py-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold tracking-tight">{currency.code}</span>
                  <span className="text-sm text-ink-soft">{currency.name}</span>
                </div>
                <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-deep">
                  Ask us
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
