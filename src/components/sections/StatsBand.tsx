import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

export function StatsBand({ innerClassName }: { innerClassName?: string }) {
  return (
    <Section innerClassName={innerClassName}>
      <div className="hairline-grid sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.1}
            className="hairline-cell px-7 py-10 sm:px-8 lg:py-12"
          >
            <p className="tnum text-6xl font-semibold tracking-[-0.045em] lg:text-7xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
