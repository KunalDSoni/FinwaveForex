import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { QuoteCard } from "@/components/sections/QuoteCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-0 lg:pt-16">
      <div
        aria-hidden
        className="animate-orb pointer-events-none absolute -top-24 right-[4%] -z-10 size-[26rem] rounded-full bg-brand/25 blur-[90px]"
      />
      <div
        aria-hidden
        className="animate-orb-reverse pointer-events-none absolute bottom-8 left-[6%] -z-10 size-[20rem] rounded-full bg-accent-blue/15 blur-[90px]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-sand px-3.5 py-1.5 text-[13px] font-semibold text-ink">
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
            className="mt-6 font-serif text-6xl font-normal tracking-[-0.03em] text-balance sm:text-7xl lg:text-[5.75rem] lg:leading-[0.95] xl:text-[6.5rem]"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
              Buy and sell 15+ currencies, send money abroad, and load travel cards, at rates
              we&apos;ll work to better. Home delivery in six cities across India.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Get a quote</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="group">
                <Link href="/rates">
                  See rates
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <Parallax range={28}>
            <QuoteCard />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
