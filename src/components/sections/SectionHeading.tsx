import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  lines: string[];
  sub?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, lines, sub, as = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className="text-xs font-semibold tracking-widest text-brand uppercase">{eyebrow}</p>
      </Reveal>
      <MaskText
        as={as}
        lines={lines}
        delay={0.1}
        className={cn(
          "mt-4 font-semibold tracking-tight text-balance",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
            : "text-3xl sm:text-4xl lg:text-5xl",
        )}
      />
      {sub ? (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
