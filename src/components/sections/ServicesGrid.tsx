import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHeading
        eyebrow="Services"
        lines={[
          <>Everything foreign exchange,</>,
          <>
            under <Em>one roof.</Em>
          </>,
        ]}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
