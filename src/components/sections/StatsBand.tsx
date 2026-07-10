import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function StatsBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-12 text-center sm:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <p className="text-5xl font-semibold tracking-tight lg:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-ink-soft">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
