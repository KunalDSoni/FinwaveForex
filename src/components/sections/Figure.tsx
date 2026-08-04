import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type FigureProps = {
  quote: string;
  attribution: string;
  tone?: "light" | "dark";
  /** `band` spans the viewport with rules; `panel` is a rounded ink block. */
  as?: "band" | "panel";
  /** Portraits shown in place of the quote glyph. */
  media?: ReactNode;
  /** A link or button under the attribution. */
  action?: ReactNode;
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
  media,
  action,
  className,
}: FigureProps) {
  const dark = tone === "dark";

  const inner = (
    <figure className="grid items-start gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      {media ?? (
        // Drawn rather than typed: the display face renders " as two slashes.
        <svg
          aria-hidden
          viewBox="0 0 44 32"
          className="h-8 w-auto shrink-0 text-brand lg:h-10"
          fill="currentColor"
        >
          <path d="M0 32V18.4C0 8.6 5.4 2.1 16.2 0l1.8 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.9V32H0Zm25.9 0V18.4C25.9 8.6 31.3 2.1 42.1 0l1.9 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.8V32H25.9Z" />
        </svg>
      )}
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
            "mt-7 label-micro",
            dark ? "text-brand" : "text-ink-soft",
          )}
        >
          {attribution}
        </figcaption>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </figure>
  );

  if (as === "panel") {
    // Light by default. The reference site earns its calm by having almost no
    // dark slabs — a page carrying both a dark quote panel and a dark closing
    // band reads heavy no matter how warm the brown is. `tone="dark"` is still
    // available where a page genuinely needs the weight.
    return (
      <Reveal className={className}>
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl px-8 py-12 sm:px-12 lg:py-16",
            dark ? "bg-ink-surface" : "shadow-card border border-hairline bg-canvas",
          )}
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0",
              dark
                ? "animate-gradient-shift bg-[radial-gradient(70%_120%_at_85%_0%,rgb(234_163_0_/_0.32),transparent)]"
                : "bg-[radial-gradient(70%_120%_at_88%_0%,rgb(234_163_0_/_0.14),transparent)]",
            )}
          />
          <div className="relative">{inner}</div>
        </div>
      </Reveal>
    );
  }

  return (
    <section className={cn("border-y border-hairline bg-sand/50", className)}>
      <div className="mx-auto max-w-page gutter py-16 lg:py-20">
        <Reveal>{inner}</Reveal>
      </div>
    </section>
  );
}
