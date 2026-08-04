import { Fragment, Suspense } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { EnquirySummary } from "@/components/sections/EnquirySummary";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Call or visit Finwave Forex for a live exchange-rate quote. Ground Floor, Raja Complex, Vijay Cross Road, Ahmedabad 380009.",
  path: "/contact",
});

export default function ContactPage() {
  const { address } = siteConfig;

  const fullAddress = `${siteConfig.legalName}, ${address.line1}, ${address.line2}, ${address.city}, ${address.postalCode}`;
  const mapQuery = encodeURIComponent(fullAddress);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Breadcrumb trail={[{ label: "Contact Us" }]} />
        <SectionHeading
          as="h1"
          layout="split"
          lines={[
            <Fragment key="l1">Talk to a real</Fragment>,
            <Fragment key="l2">
              <Em>forex</Em> desk.
            </Fragment>,
          ]}
          sub="Tell us the currency, the amount, and your city, and we'll come back with a rate we'll work to better."
        />
      </section>

      <Section space="flushTop">
        {/* Present only when arriving from the hero quote card. */}
        <Suspense fallback={null}>
          <EnquirySummary />
        </Suspense>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Calling is the primary channel, so it gets the primary treatment. */}
          <Reveal className="h-full">
            <Card hover glow className="h-full ring-1 ring-brand/25">
              <div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-ink">
                  <Phone className="size-[22px]" aria-hidden />
                </span>
                <p className="mt-6 label-micro text-ink-soft">
                  Call the desk
                </p>
              </div>
              <a
                href={siteConfig.phoneHref}
                className="mt-3 block text-2xl font-semibold tracking-[-0.02em] transition-colors hover:text-brand-deep focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.mobileHref}
                className="mt-1.5 block text-lg font-semibold tracking-[-0.01em] transition-colors hover:text-brand-deep focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                {siteConfig.mobile}
              </a>
              <p className="mt-2 text-sm text-ink-soft">
                Fastest way to a live rate. We&apos;ll try to better any quote you have.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <Card hover glow className="h-full">
              <div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  <Mail className="size-[22px]" aria-hidden />
                </span>
                <p className="mt-6 label-micro text-ink-soft">
                  Email us
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block text-lg font-semibold tracking-[-0.01em] break-all transition-colors hover:text-brand-deep focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                {siteConfig.email}
              </a>
              <p className="mt-2 text-sm text-ink-soft">
                Send your requirement and we&apos;ll reply with today&apos;s rate.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <Card hover glow className="h-full">
              <div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  <MapPin className="size-[22px]" aria-hidden />
                </span>
                <p className="mt-6 label-micro text-ink-soft">
                  Visit the branch
                </p>
              </div>
              <address className="mt-3 text-sm font-medium not-italic">
                {siteConfig.legalName}
                <br />
                {address.line1}, {address.line2}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                Get directions
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Card>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="shadow-card mt-5 overflow-hidden rounded-2xl border border-hairline bg-white">
            <iframe
              title={`${siteConfig.legalName} on Google Maps`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 lg:h-[420px]"
            />
          </div>
        </Reveal>

        {/* Coverage + assurances */}
        <div className="hairline-grid mt-5 lg:grid-cols-2">
          <Reveal className="hairline-cell p-8">
            <p className="flex items-center gap-2 label-micro text-ink-soft">
              <Truck className="size-4 text-brand-deep" aria-hidden />
              Delivery &amp; pick-up
            </p>
            <p className="mt-3 text-sm">
              {siteConfig.cities.slice(0, -1).join(", ")} and {siteConfig.cities.at(-1)}.
            </p>
            <p className="mt-1.5 text-sm text-ink-soft">
              {siteConfig.fulfilment.join(" · ")}.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="hairline-cell p-8">
            <p className="flex items-center gap-2 label-micro text-ink-soft">
              <ShieldCheck className="size-4 text-brand-deep" aria-hidden />
              Before you visit
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["RBI-approved", "Full KYC on every transaction", "30 major currencies"].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium ring-1 ring-hairline"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">
              Carry a valid ID and your travel documents so we can complete KYC in one visit.
            </p>
          </Reveal>
        </div>
        {/* Business hours intentionally omitted — siteConfig.hours is still a TODO. */}
      </Section>
    </>
  );
}
