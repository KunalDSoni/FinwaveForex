import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Section>
      <SectionHeading
        layout="split"
        eyebrow="Services"
        lines={[
          <Fragment key="l1">Everything foreign exchange,</Fragment>,
          <Fragment key="l2">
            under <Em>one roof.</Em>
          </Fragment>,
        ]}
        sub="Currency notes, travellers' cheques, travel cards and outbound transfers, handled by one desk that knows your file."
      />
      <div className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} variant="cell" />
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition-colors hover:text-ink"
          >
            Compare all services
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
