import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { siteConfig } from "@/content/site";

export function CtaBand() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-16 sm:px-12 lg:py-20">
        <div
          className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_85%_0%,rgb(234_163_0_/_0.38),transparent)]"
          aria-hidden
        />
        {/* Statement left, actions right — reads as a band rather than a poster. */}
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <MaskText
              as="h2"
              lines={[
                <Fragment key="l1">Get a better rate</Fragment>,
                <Fragment key="l2">
                  in one <Em tone="dark">phone call.</Em>
                </Fragment>,
              ]}
              className="font-serif text-3xl leading-[1.08] font-normal tracking-[-0.03em] text-balance text-white sm:text-4xl lg:text-5xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-base leading-7 text-white/60">
                Tell us the currency and amount. We&apos;ll quote today&apos;s rate and try to
                better any quote you already have.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="group bg-brand text-ink hover:bg-[color-mix(in_oklch,var(--color-brand),white_18%)]"
                >
                  <Link href="/contact">
                    Get a quote
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={siteConfig.phoneHref}>
                    <PhoneCall className="size-4" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </Button>
              </div>
              <p className="flex items-center gap-2 text-xs text-white/45 lg:justify-end">
                <ShieldCheck className="size-3.5 shrink-0 text-brand" aria-hidden />
                RBI-approved · {siteConfig.legalName}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
