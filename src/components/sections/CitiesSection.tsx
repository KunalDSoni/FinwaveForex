import { Fragment } from "react";
import { MapPin, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

const fulfilmentIcons = [Truck, MapPin];

export function CitiesSection() {
  return (
    <Section>
      <SectionHeading
        layout="split"
        eyebrow="Coverage"
        lines={[
          <Fragment key="l1">Six cities.</Fragment>,
          <Fragment key="l2">
            <Em>Doorstep</Em> delivery.
          </Fragment>,
        ]}
        sub={`Order from anywhere we operate and collect at our ${siteConfig.address.city} branch or have it brought to you.`}
      />

      <div className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.cities.map((city, index) => {
          const isBase = city === siteConfig.address.city;
          return (
            <Reveal
              key={city}
              delay={index * 0.06}
              className="hairline-cell relative flex items-center gap-3 px-6 py-6"
            >
              <span className="tnum absolute top-4 left-5 text-[11px] font-medium text-ink-soft/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <MapPin className="size-4 shrink-0 text-brand-deep" aria-hidden />
              <span className="font-medium tracking-tight">{city}</span>
              {isBase ? (
                <span className="ml-auto rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-brand-deep">
                  Head office
                </span>
              ) : null}
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {siteConfig.fulfilment.map((option, index) => {
            const Icon = fulfilmentIcons[index] ?? MapPin;
            return (
              <span key={option} className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon className="size-4 text-brand-deep" aria-hidden />
                {option}
              </span>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
