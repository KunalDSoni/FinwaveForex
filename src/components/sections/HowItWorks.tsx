import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

/** The counter process, taken from the currency-exchange service definition. */
const steps = services[0].steps;

export function HowItWorks() {
  return (
    <Section variant="sand" bordered>
      <SectionHeading
        align="center"
        eyebrow="How it works"
        lines={[
          <Fragment key="l1">From quote to cash,</Fragment>,
          <Fragment key="l2">
            in <Em>three steps.</Em>
          </Fragment>,
        ]}
        sub="No account to open and no app to download. Tell us what you need and we handle the rest."
      />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-canvas">
            <Reveal delay={index * 0.1} className="h-full p-8 lg:p-9">
              <div className="flex items-center gap-3">
                <span className="tnum flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-ink">
                  {index + 1}
                </span>
                <span
                  className="h-px flex-1 bg-[linear-gradient(to_right,var(--color-hairline),transparent)]"
                  aria-hidden
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-balance">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-ink-soft">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">
              Start a quote
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-ink/20 bg-white/70">
            <a href={siteConfig.phoneHref}>
              <PhoneCall className="size-4" aria-hidden />
              {siteConfig.phone}
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
