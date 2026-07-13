import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Parallax } from "@/components/motion/Parallax";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { QuoteCard } from "@/components/sections/QuoteCard";

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden pt-12 pb-0 lg:pt-16"
      style={{
        backgroundColor: "#2A100D",
        backgroundImage:
          "radial-gradient(58% 60% at 80% 16%, #331613 0%, rgba(51,22,19,0) 62%)," +
          "radial-gradient(120% 95% at 50% 125%, #210B09 0%, rgba(33,11,9,0) 60%)",
      }}
    >
      <ParticleField />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-[#F5EAE6] ring-1 ring-white/15 backdrop-blur-sm">
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
            className="mt-6 font-serif text-4xl leading-[1.1] font-normal tracking-[-0.02em] text-balance text-[#F5EAE6] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem]"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#F5EAE6]/70">
              Buy and sell 15+ currencies, send money abroad, and load travel cards, at rates
              we&apos;ll work to better. Home delivery in six cities across India.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-[#F5EAE6] text-[#2A100D] hover:bg-white"
              >
                <Link href="/contact">Get a quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="group text-[#F5EAE6] hover:bg-white/10 hover:text-white"
              >
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
