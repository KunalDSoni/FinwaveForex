import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Currency exchange, wire transfers, travel cards and corporate FX from RBI-approved money changers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:pt-32">
        <SectionHeading
          as="h1"
          layout="split"
          eyebrow="Services"
          lines={["Every foreign-exchange need,", "handled properly."]}
          sub="Four services, one desk: exchange currency, send money abroad, load a travel card, or set up FX for your business."
        />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 pb-24 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
