import { Handshake, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, serving six cities across India.",
  path: "/about",
});

const values = [
  {
    icon: Handshake,
    title: "Transparency",
    body: "Rates quoted up front, and we'll try to better any quote you bring us.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    body: "RBI-approved and fully KYC-compliant on every transaction.",
  },
  {
    icon: Truck,
    title: "Convenience",
    body: "Home delivery and branch pick-up across six cities in India.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 lg:pt-44">
        <SectionHeading
          as="h1"
          eyebrow="About us"
          lines={["A decade of", "honest exchange."]}
          sub="Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange, providing services at the most competitive rates in the market."
        />
      </section>

      <Section>
        <div className="hairline-grid sm:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className="hairline-cell group relative p-8"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                <value.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{value.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <StatsBand />

      {/* Leadership block intentionally omitted until Finwave provides real team details. */}

      <CtaBand />
    </>
  );
}
