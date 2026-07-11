import { Mail, MapPin, Phone, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
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

  const details = [
    {
      icon: Phone,
      label: "Call the desk",
      value: (
        <a href={siteConfig.phoneHref} className="transition-colors hover:text-brand-deep">
          {siteConfig.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email us",
      value: (
        <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-brand-deep">
          {siteConfig.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: "Visit the branch",
      value: (
        <address className="not-italic">
          {siteConfig.legalName}
          <br />
          {address.line1}, {address.line2},
          <br />
          {address.city}, {address.postalCode}
        </address>
      ),
    },
    {
      icon: Truck,
      label: "Delivery & pick-up",
      value: (
        <span>
          {siteConfig.cities.slice(0, -1).join(", ")} and {siteConfig.cities.at(-1)}.
        </span>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:pt-40 lg:pb-32">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        lines={["Talk to a real", "forex desk."]}
        sub="Tell us the currency, the amount, and your city, we'll come back with a rate we'll work to better."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal delay={0.15}>
          <Card className="h-full justify-between gap-8">
            <ul className="divide-y divide-hairline">
              {details.map((item) => (
                <li key={item.label} className="flex items-start gap-4 py-5 first:pt-0">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-ink-soft uppercase">
                      {item.label}
                    </p>
                    <div className="mt-1 text-sm leading-6 font-medium">{item.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 border-t border-hairline pt-6">
              {["RBI-approved", "Full KYC", "6 cities", "Home delivery"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-sand/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
