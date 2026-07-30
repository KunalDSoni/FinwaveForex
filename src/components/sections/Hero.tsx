import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { QuoteCard } from "@/components/sections/QuoteCard";

/** Proof points that answer "can I trust this?" before the first scroll. */
const trustPoints = [
  { icon: ShieldCheck, label: "RBI-approved money changer" },
  { icon: Banknote, label: "30 currencies bought & sold" },
  { icon: Truck, label: "Home delivery in six cities" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Warm gold aurora behind the quote card, fading into the page cream. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-orb absolute -top-40 -right-24 size-[38rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.22),transparent_66%)]" />
        <div className="animate-orb-reverse absolute -bottom-32 -left-32 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.1),transparent_68%)]" />
      </div>
      <ParticleField tone="light" className="-z-10" />

      {/* On mobile the quote card follows the headline so the primary tool is
          reachable without scrolling past the trust list; on large screens it
          sits alongside, spanning both rows of the left column. */}
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-16 lg:gap-y-10 lg:pt-20 lg:pb-28">
        <div data-particle-safe className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 py-1.5 pr-4 pl-2 text-[13px] font-semibold backdrop-blur-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-tint">
                <ShieldCheck className="size-3.5 text-brand-deep" aria-hidden />
              </span>
              RBI-approved · 10+ years in foreign exchange
            </span>
          </Reveal>

          <MaskText
            as="h1"
            lines={[
              <Fragment key="l1">The clearer way</Fragment>,
              <Fragment key="l2">
                to exchange <Em>currency.</Em>
              </Fragment>,
            ]}
            delay={0.1}
            className="display-xl mt-7 text-balance"
          />

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-lg text-lg leading-8 text-ink-soft">
              Buy and sell foreign currency, send money abroad, and load travel cards, at rates
              we&apos;ll work to better. Delivered to your door in six cities across India.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get a quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-ink/20 bg-white/60 backdrop-blur-sm hover:bg-white"
              >
                <Link href="/rates">
                  See today&apos;s rates
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </Reveal>

        </div>

        <div data-particle-safe className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Reveal delay={0.3}>
            <QuoteCard />
          </Reveal>
        </div>

        <Reveal delay={0.45} className="lg:col-start-1 lg:row-start-2">
          <ul className="grid gap-3 border-t border-hairline pt-7 sm:grid-cols-3 sm:gap-x-5">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-sm leading-6 text-ink-soft">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
