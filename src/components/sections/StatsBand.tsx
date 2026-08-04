import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

export function StatsBand({ space }: { space?: "default" | "tight" | "flushTop" | "flushBottom" }) {
  return (
    <Section space={space}>
      <div className="hairline-grid sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.1}
            className="hairline-cell p-8"
          >
            <p className="display-stat">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-4 max-w-[14rem] text-sm text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
