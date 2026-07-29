import { Fragment } from "react";
import {
  BadgeCheck,
  Building2,
  Eye,
  Globe2,
  Handshake,
  ShieldCheck,
  TrendingDown,
  Truck,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { LeadershipCard } from "@/components/sections/LeadershipCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { Section } from "@/components/ui/section";
import { leadership, leadershipMessage, principles } from "@/content/team";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Finwave Forex is an RBI-authorized foreign exchange company providing transparent, secure and reliable currency exchange for individuals, students, travellers and businesses.",
  path: "/about",
});

const principleIcons = {
  Users,
  Eye,
  ShieldCheck,
  TrendingDown,
  Handshake,
  Truck,
} as const;

/** Verifiable facts only, drawn from site content. */
const credentials = [
  { icon: Building2, label: "Registered entity", value: siteConfig.legalName },
  { icon: ShieldCheck, label: "Regulatory status", value: "RBI-approved money changer" },
  { icon: Globe2, label: "Currencies handled", value: "30 major currencies" },
  {
    icon: BadgeCheck,
    label: "Head office",
    value: `${siteConfig.address.line2}, ${siteConfig.address.city}`,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-orb absolute -top-40 -right-32 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.2),transparent_66%)]" />
          <div className="animate-orb-reverse absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.09),transparent_68%)]" />
          {/* Faint ledger grid, so the space reads as financial rather than empty. */}
          <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--color-hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-hairline)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:pt-36 lg:pb-20">
          <SectionHeading
            as="h1"
            layout="split"
            eyebrow="About us"
            lines={[
              <Fragment key="l1">Built on Trust.</Fragment>,
              <Fragment key="l2">
                Driven by <Em>Experience.</Em>
              </Fragment>,
            ]}
            sub="Finwave Forex is an RBI-authorized foreign exchange company committed to providing transparent, secure, and reliable currency exchange solutions for individuals, students, travellers, and businesses."
          />

          <dl className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((row, index) => (
              <Reveal key={row.label} delay={index * 0.07} className="hairline-cell px-6 py-6">
                <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
                  <row.icon className="size-4 shrink-0 text-brand-deep" aria-hidden />
                  {row.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold tracking-tight">{row.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <StatsBand innerClassName="pt-0 pb-20 lg:pt-0 lg:pb-24" />

      {/* Company story */}
      <Section variant="sand" bordered>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              lines={[
                <Fragment key="l1">A decade of</Fragment>,
                <Fragment key="l2">
                  honest <Em>exchange.</Em>
                </Fragment>,
              ]}
            />
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-5 text-lg leading-8 text-ink-soft">
                <p>
                  Finwave Forex Pvt. Ltd. has spent ten years doing one thing properly: moving
                  money across borders for people who need it to arrive correctly, at a rate they
                  can verify.
                </p>
                <p>
                  Foreign exchange rewards the patient and punishes the careless. We built the
                  desk around that reality — real people quoting real rates, paperwork completed
                  before it becomes a problem, and a phone number that reaches someone who knows
                  your file.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principleIcons[principle.icon];
              return (
                <Reveal
                  key={principle.title}
                  delay={index * 0.06}
                  className="group bg-canvas p-7 transition-colors duration-300 hover:bg-white"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-semibold tracking-[-0.01em]">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{principle.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section>
        <SectionHeading
          layout="split"
          eyebrow="Leadership"
          lines={[
            <Fragment key="l1">Meet the people</Fragment>,
            <Fragment key="l2">
              behind the <Em>desk.</Em>
            </Fragment>,
          ]}
          sub="Two directors, one desk. Between them they set the standards the company is measured by — regulatory, commercial and operational."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {leadership.map((leader, index) => (
            <LeadershipCard key={leader.slug} leader={leader} index={index} />
          ))}
        </div>

        {/* Leadership message */}
        <Reveal delay={0.2}>
          <figure className="relative mt-5 overflow-hidden rounded-2xl bg-ink px-8 py-12 sm:px-12 lg:py-16">
            <div
              aria-hidden
              className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_85%_0%,rgb(234_163_0_/_0.32),transparent)]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
              <svg
                aria-hidden
                viewBox="0 0 44 32"
                className="h-8 w-auto shrink-0 text-brand lg:h-10"
                fill="currentColor"
              >
                <path d="M0 32V18.4C0 8.6 5.4 2.1 16.2 0l1.8 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.9V32H0Zm25.9 0V18.4C25.9 8.6 31.3 2.1 42.1 0l1.9 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.8V32H25.9Z" />
              </svg>
              <div>
                <blockquote className="max-w-3xl text-xl leading-9 text-balance text-white/90 sm:text-2xl sm:leading-10">
                  {leadershipMessage.quote}
                </blockquote>
                <figcaption className="mt-7 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                  {leadershipMessage.attribution} · {siteConfig.legalName}
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
