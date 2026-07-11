import { Mail, MapPin, Phone, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, email, or message Finwave Forex for a live exchange-rate quote. Ground Floor, Raja Complex, Vijay Cross Road, Ahmedabad.",
  path: "/contact",
});

export default function ContactPage() {
  const { address } = siteConfig;
  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:pt-44 lg:pb-32">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            lines={["Talk to a real", "forex desk."]}
            sub="Tell us the currency, the amount, and your city, we'll come back with a rate we'll work to better."
          />
          <Reveal delay={0.25}>
            <ul className="mt-10 space-y-5 text-sm leading-6">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <a href={siteConfig.phoneHref} className="font-medium transition-colors hover:text-brand">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="font-medium transition-colors hover:text-brand">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <address className="not-italic">
                  {siteConfig.legalName}
                  <br />
                  {address.line1}, {address.line2},
                  <br />
                  {address.city}, {address.postalCode}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>
                  Home delivery and pick-up in {siteConfig.cities.slice(0, -1).join(", ")} and{" "}
                  {siteConfig.cities.at(-1)}.
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
