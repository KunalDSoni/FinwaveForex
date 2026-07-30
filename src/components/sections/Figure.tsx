import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type FigureProps = {
  quote: string;
  attribution: string;
  tone?: "light" | "dark";
  /** `band` spans the viewport with rules; `panel` is a rounded ink block. */
  as?: "band" | "panel";
  className?: string;
};

/**
 * The single quotation component. Replaces the near-identical pull quote and
 * leadership-message blocks that previously lived in two files.
 */
export function Figure({
  quote,
  attribution,
  tone = "light",
  as = "band",
  className,
}: FigureProps) {
  const dark = tone === "dark";

  const inner = (
    <figure className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      {/* Drawn rather than typed: the display face renders " as two slashes. */}
      <svg
        aria-hidden
        viewBox="0 0 44 32"
        className="h-8 w-auto shrink-0 text-brand lg:h-10"
        fill="currentColor"
      >
        <path d="M0 32V18.4C0 8.6 5.4 2.1 16.2 0l1.8 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.9V32H0Zm25.9 0V18.4C25.9 8.6 31.3 2.1 42.1 0l1.9 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.8V32H25.9Z" />
      </svg>
      <div>
        <blockquote
          className={cn(
            "display-md max-w-3xl text-balance italic",
            dark ? "text-white/90" : "text-ink",
          )}
        >
          {quote}
        </blockquote>
        <figcaption
          className={cn(
            "mt-7 text-xs font-semibold tracking-[0.16em] uppercase",
            dark ? "text-brand" : "text-ink-soft",
          )}
        >
          {attribution}
        </figcaption>
      </div>
    </figure>
  );

  if (as === "panel") {
    return (
      <Reveal className={className}>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-12 sm:px-12 lg:py-16">
          <div
            aria-hidden
            className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_85%_0%,rgb(234_163_0_/_0.32),transparent)]"
          />
          <div className="relative">{inner}</div>
        </div>
      </Reveal>
    );
  }

  return (
    <section className={cn("border-y border-hairline bg-sand/50", className)}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>{inner}</Reveal>
      </div>
    </section>
  );
}
