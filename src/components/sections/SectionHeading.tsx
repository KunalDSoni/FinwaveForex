import type { ReactNode } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  lines: ReactNode[];
  sub?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  lines,
  sub,
  as = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl", className)}>
      <RevealScale variant="tag">
        <span className="inline-block rounded-full bg-sand px-3.5 py-1.5 text-[13px] font-semibold text-ink">
          {eyebrow}
        </span>
      </RevealScale>
      <MaskText
        as={as}
        lines={lines}
        delay={0.1}
        className={cn(
          "mt-5 font-serif font-normal tracking-tight text-balance",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl",
        )}
      />
      {sub ? (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-5 text-lg leading-8 text-ink-soft",
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
