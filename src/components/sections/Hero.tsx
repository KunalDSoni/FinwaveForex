import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Ticker } from "@/components/motion/Ticker";
import { QuoteCard } from "@/components/sections/QuoteCard";
import { tickerPairs } from "@/content/rates";

export function Hero() {
  return (
    <section className="pt-32 pb-0 lg:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              RBI-approved · 10+ years in foreign exchange
            </p>
          </Reveal>
          <MaskText
            as="h1"
            lines={["The clearer way to", "exchange currency."]}
            delay={0.1}
            className="mt-5 text-5xl font-semibold tracking-tighter text-balance sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
              Buy and sell 15+ currencies, send money abroad, and load travel cards — at rates
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
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <QuoteCard />
        </Reveal>
      </div>
      <div className="[--marquee-duration:28s]">
        <Ticker items={tickerPairs} />
      </div>
    </section>
  );
}
