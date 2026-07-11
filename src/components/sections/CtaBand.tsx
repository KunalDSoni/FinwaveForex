import { Fragment } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { siteConfig } from "@/content/site";

export function CtaBand() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center sm:px-12 lg:py-28">
        <div
          className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_0%,rgb(97_171_119_/_0.38),transparent)]"
          aria-hidden
        />
        <div className="relative">
          <MaskText
            as="h2"
            lines={[
              <Fragment key="l1">Get a better rate</Fragment>,
              <Fragment key="l2">
                in one <Em>phone call.</Em>
              </Fragment>,
            ]}
            className="font-serif text-4xl leading-[1.05] font-normal tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.2}>
            <a
              href={siteConfig.phoneHref}
              className="mt-6 inline-block text-xl font-medium text-white/80 transition-colors hover:text-white sm:text-2xl"
            >
              {siteConfig.phone}
            </a>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get a quote</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
