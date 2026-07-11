import type { ReactNode } from "react";
import { BadgeCheck, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

function StepsVisual() {
  const steps = services[0].steps;
  return (
    <ol className="space-y-3 rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-32px_rgb(11_11_14_/_0.16)]">
      {steps.map((step, index) => (
        <li key={step.title} className="flex items-start gap-4 rounded-xl bg-sand/50 p-4">
          <span className="text-sm font-semibold text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">{step.title}</p>
            <p className="mt-1 text-xs leading-5 text-ink-soft">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TrustVisual() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-white p-10 text-center shadow-[0_24px_60px_-32px_rgb(11_11_14_/_0.16)]">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-tint">
        <ShieldCheck className="size-8 text-brand" aria-hidden />
      </span>
      <p className="text-lg font-semibold tracking-tight">RBI-approved money changer</p>
      <p className="flex items-center gap-1.5 text-sm text-ink-soft">
        <BadgeCheck className="size-4 text-brand" aria-hidden />
        Full KYC on every transaction
      </p>
    </div>
  );
}

function DeliveryVisual() {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-8 shadow-[0_24px_60px_-32px_rgb(11_11_14_/_0.16)]">
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
    </div>
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
    eyebrow: "Simple process",
    title: (
      <>
        From quote to cash, in <Em>three steps.</Em>
      </>
    ),
    body: "Tell us what you need, confirm a live rate over phone or email, and receive your currency at home or at our Ahmedabad office.",
    visual: <StepsVisual />,
  },
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
    body: "Home delivery and branch pick-up across six cities in India — so collecting your currency never becomes the errand.",
    visual: <DeliveryVisual />,
  },
];

export function WhyFinwave() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHeading
        eyebrow="Why Finwave"
        lines={[
          <span key="line">
            Built on a decade of <Em>better rates.</Em>
          </span>,
        ]}
      />
      <div className="mt-16 space-y-20 lg:space-y-28">
        {rows.map((row, index) => (
          <div
            key={row.eyebrow}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                {row.eyebrow}
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
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
    </section>
  );
}
