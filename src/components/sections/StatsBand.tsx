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
            className="hairline-cell px-6 py-12 text-center sm:px-8"
          >
            <p className="tnum text-5xl font-semibold tracking-[-0.04em] lg:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mx-auto mt-4 max-w-[14rem] text-sm leading-6 text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
