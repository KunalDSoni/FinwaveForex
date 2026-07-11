import type { ReactNode } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  lines: ReactNode[];
  sub?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  layout?: "stack" | "split";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  lines,
  sub,
  as = "h2",
  align = "left",
  layout = "stack",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const titleCls = cn(
    "mt-5 font-serif font-normal tracking-[-0.03em] text-balance",
    as === "h1"
      ? "text-4xl sm:text-5xl lg:text-[4rem] lg:leading-[1.02]"
      : "text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]",
  );

  if (layout === "split") {
    return (
      <div className={cn("grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16", className)}>
        <div>
          <RevealScale variant="tag">
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </RevealScale>
          <MaskText as={as} lines={lines} delay={0.1} className={titleCls} />
        </div>
        {sub ? (
          <Reveal delay={0.2}>
            <p
              className={cn(
                "text-lg leading-8 lg:pb-2",
                tone === "dark" ? "text-white/70" : "text-ink-soft",
              )}
            >
              {sub}
            </p>
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl", className)}>
      <RevealScale variant="tag">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </RevealScale>
      <MaskText as={as} lines={lines} delay={0.1} className={titleCls} />
      {sub ? (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-5 text-lg leading-8",
              tone === "dark" ? "text-white/70" : "text-ink-soft",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
