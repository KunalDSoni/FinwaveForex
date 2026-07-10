import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function CtaBand() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center sm:px-12 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_0%,rgb(14_110_92_/_0.4),transparent)]"
          aria-hidden
        />
        <div className="relative">
          <MaskText
            as="h2"
            lines={["Get a better rate", "in one phone call."]}
            className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
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
