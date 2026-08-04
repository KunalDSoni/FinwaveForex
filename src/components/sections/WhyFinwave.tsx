import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { BadgeCheck, Building, FileCheck2, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type Pillar = {
  icon: LucideIcon;
  eyebrow: string;
  title: ReactNode;
  body: string;
  points: { icon: LucideIcon; label: string }[];
};

const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    eyebrow: "Trust",
    title: (
      <>
        Approved. Compliant. <Em>Accountable.</Em>
      </>
    ),
    body: "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange.",
    points: [
      { icon: BadgeCheck, label: "RBI-approved money changer" },
      { icon: FileCheck2, label: "Full KYC on every transaction" },
    ],
  },
  {
    icon: Truck,
    eyebrow: "Convenience",
    title: (
      <>
        Currency, <Em>delivered.</Em>
      </>
    ),
    body: "Home delivery and branch pick-up across six cities in India, so collecting your currency never becomes the errand.",
    points: [
      { icon: Truck, label: "Home delivery to your door" },
      { icon: Building, label: "Branch pick-up in Ahmedabad" },
    ],
  },
];

export function WhyFinwave() {
  return (
    <Section>
      <SectionHeading
        layout="split"
        eyebrow="Why Finwave"
        lines={[
          <span key="line">
            Built on a decade of <Em>better rates.</Em>
          </span>,
        ]}
        sub="Approved, documented and delivered — the two things that decide whether a money changer is worth calling twice."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.eyebrow} delay={index * 0.12} className="h-full">
            <Card hover glow className="relative h-full gap-0 p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="tnum absolute top-8 right-8 text-xs font-medium text-ink-soft lg:top-10 lg:right-10"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                <pillar.icon className="size-6" aria-hidden />
              </span>
              <p className="relative mt-7 label-micro text-brand-deep">
                {pillar.eyebrow}
              </p>
              <h3 className="display-sm relative mt-3 text-balance">
                {pillar.title}
              </h3>
              <p className="relative mt-4 text-base leading-7 text-ink-soft">{pillar.body}</p>
              <ul className="relative mt-7 flex flex-col gap-2.5 border-t border-hairline pt-6">
                {pillar.points.map((point) => (
                  <li key={point.label} className="flex items-center gap-2.5 text-sm font-medium">
                    <point.icon className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    {point.label}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
