import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  /** Two display lines. Defaults to the house close. */
  lines?: ReactNode[];
  body?: string;
  /** `document` matches the narrower reading shell — see --container-doc. */
  width?: "page" | "document";
};

const DEFAULT_LINES = [
  <Fragment key="l1">Get a better rate</Fragment>,
  <Fragment key="l2">
    in one <Em tone="dark">phone call.</Em>
  </Fragment>,
];

const DEFAULT_BODY =
  "Tell us the currency and amount. We'll quote today's rate and try to better any quote you already have.";

/**
 * Closing band. Copy is overridable per page: the identical band on six pages
 * stopped being a call to action and became wallpaper.
 */
export function CtaBand({
  lines = DEFAULT_LINES,
  body = DEFAULT_BODY,
  width = "page",
}: CtaBandProps = {}) {
  return (
    // The width cap belongs on the padded wrapper, not the panel. With it on
    // the panel, the panel centred inside the full-bleed section and so sat
    // 32px outboard of every other content edge once the viewport exceeded the
    // container — invisible at 1440, visible at 1920.
    <section
      className={cn(
        "gutter mx-auto pb-16 lg:pb-20",
        width === "document" ? "max-w-[var(--container-doc)]" : "max-w-page",
      )}
    >
      <div className="relative overflow-hidden rounded-3xl bg-ink-surface px-6 py-16 sm:px-12 lg:py-20">
        <div
          className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_85%_0%,rgb(234_163_0_/_0.38),transparent)]"
          aria-hidden
        />
        {/* Statement left, actions right — reads as a band rather than a poster. */}
        <div
          className={cn(
            "relative grid items-center gap-10",
            width === "document" ? "lg:gap-12" : "lg:grid-cols-[1.15fr_0.85fr] lg:gap-16",
          )}
        >
          <div>
            <MaskText
              as="h2"
              lines={lines}
              className="display-lg text-balance text-white"
            />
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-base leading-7 text-white/60">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button asChild size="lg" variant="inverse" className="group">
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
              <p className="flex items-center gap-2 text-xs text-white/60 lg:justify-end">
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
