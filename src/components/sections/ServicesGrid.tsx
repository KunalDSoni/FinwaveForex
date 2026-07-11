import { Fragment } from "react";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="Services"
        lines={[
          <Fragment key="l1">Everything foreign exchange,</Fragment>,
          <Fragment key="l2">
            under <Em>one roof.</Em>
          </Fragment>,
        ]}
      />
      <div className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} variant="cell" />
        ))}
      </div>
    </Section>
  );
}
