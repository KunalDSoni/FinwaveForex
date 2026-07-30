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
import { Figure } from "@/components/sections/Figure";
import { LeadershipCard } from "@/components/sections/LeadershipCard";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
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

      {/* Company story — photography opposite the narrative. */}
      <EditorialSplit
        eyebrow="Our story"
        title={
          <>
            A decade of honest <Em>exchange.</Em>
          </>
        }
        body={
          <>
            <p>
              Finwave Forex Pvt. Ltd. has spent ten years doing one thing properly: moving money
              across borders for people who need it to arrive correctly, at a rate they can verify.
            </p>
            <p>
              Foreign exchange rewards the patient and punishes the careless. We built the desk
              around that reality — real people quoting real rates, paperwork completed before it
              becomes a problem, and a phone number that reaches someone who knows your file.
            </p>
          </>
        }
        photo={{
          src: "/photography/currency-notes.webp",
          alt: "Assorted foreign currency notes handled by Finwave Forex",
          width: 1280,
          height: 520,
        }}
        media="start"
        variant="sand"
        bordered
      />

      {/* What we stand for */}
      <Section>
        <SectionHeading
          layout="split"
          eyebrow="What we stand for"
          lines={[
            <Fragment key="l1">Six commitments we</Fragment>,
            <Fragment key="l2">
              refuse to <Em>compromise on.</Em>
            </Fragment>,
          ]}
          sub="They are unremarkable individually. Held together, over a decade, they are the whole business."
        />
        <div className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principleIcons[principle.icon];
            return (
              <Reveal
                key={principle.title}
                delay={index * 0.06}
                className="hairline-cell group p-8"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-semibold tracking-[-0.01em]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{principle.body}</p>
              </Reveal>
            );
          })}
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
        <Figure
          as="panel"
          tone="dark"
          quote={leadershipMessage.quote}
          attribution={`${leadershipMessage.attribution} · ${siteConfig.legalName}`}
          className="mt-5"
        />
      </Section>

      <CtaBand
        lines={[
          <Fragment key="l1">Talk to the people</Fragment>,
          <Fragment key="l2">
            who&apos;ll <Em tone="dark">handle it.</Em>
          </Fragment>,
        ]}
        body="No call centre and no ticket queue — the desk that quotes your rate is the desk that completes it."
      />
    </>
  );
}
