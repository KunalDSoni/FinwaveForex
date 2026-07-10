import { MapPin, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { siteConfig } from "@/content/site";

const fulfilmentIcons = [Truck, MapPin];

export function CitiesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <SectionHeading eyebrow="Coverage" lines={["Six cities.", "Doorstep delivery."]} />
      <ul className="mt-10 flex flex-wrap gap-3">
        {siteConfig.cities.map((city, index) => (
          <Reveal key={city} delay={index * 0.06}>
            <li className="rounded-full border border-hairline bg-white px-5 py-2.5 text-sm font-medium">
              {city}
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap gap-8">
          {siteConfig.fulfilment.map((option, index) => {
            const Icon = fulfilmentIcons[index] ?? MapPin;
            return (
              <span key={option} className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon className="size-4 text-brand" aria-hidden />
                {option}
              </span>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
