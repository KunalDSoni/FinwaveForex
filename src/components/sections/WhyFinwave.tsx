import type { ReactNode } from "react";
import { BadgeCheck, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

function TrustVisual() {
  return (
    <Card className="items-center gap-4 p-10 text-center">
      <RevealScale variant="icon">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-tint">
          <ShieldCheck className="size-8 text-brand" aria-hidden />
        </span>
      </RevealScale>
      <p className="text-lg font-semibold tracking-tight">RBI-approved money changer</p>
      <p className="flex items-center gap-1.5 text-sm text-ink-soft">
        <BadgeCheck className="size-4 text-brand" aria-hidden />
        Full KYC on every transaction
      </p>
    </Card>
  );
}

function DeliveryVisual() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint">
          <Truck className="size-5 text-brand" aria-hidden />
        </span>
        <p className="font-semibold tracking-tight">Home delivery &amp; branch pick-up</p>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {siteConfig.cities.map((city) => (
          <li
            key={city}
            className="flex items-center gap-1.5 rounded-full bg-sand/70 px-3.5 py-1.5 text-xs font-medium"
          >
            <MapPin className="size-3 text-brand" aria-hidden />
            {city}
          </li>
        ))}
      </ul>
    </Card>
  );
}

type Row = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  visual: ReactNode;
};

const rows: Row[] = [
  {
    eyebrow: "Trust",
    title: (
      <>
        Approved. Compliant. <Em>Accountable.</Em>
      </>
    ),
    body: "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with 10 years' experience in foreign exchange.",
    visual: <TrustVisual />,
  },
  {
    eyebrow: "Convenience",
    title: (
      <>
        Currency, <Em>delivered.</Em>
      </>
    ),
    body: "Home delivery and branch pick-up across six cities in India, so collecting your currency never becomes the errand.",
    visual: <DeliveryVisual />,
  },
];

export function WhyFinwave() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="Why Finwave"
        lines={[
          <span key="line">
            Built on a decade of <Em>better rates.</Em>
          </span>,
        ]}
      />
      <div className="mt-16 space-y-20 lg:space-y-28">
        {rows.map((row, index) => (
          <div key={row.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
              <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
                {row.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-[2rem] leading-[1.1] font-normal tracking-tight text-balance sm:text-4xl">
                {row.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-8 text-ink-soft">{row.body}</p>
            </Reveal>
            <Reveal delay={0.15} className={cn(index % 2 === 1 && "lg:order-1")}>
              <Parallax range={20}>{row.visual}</Parallax>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
