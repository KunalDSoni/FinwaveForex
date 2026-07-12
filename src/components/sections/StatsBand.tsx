import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

export function StatsBand({ innerClassName }: { innerClassName?: string }) {
  return (
    <Section innerClassName={innerClassName}>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline text-center sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1} className="bg-paper px-6 py-12">
            <p className="font-mono text-5xl tracking-tight tabular-nums lg:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-ink-soft">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
