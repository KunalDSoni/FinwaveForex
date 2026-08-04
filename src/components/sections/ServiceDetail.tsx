import Link from "next/link";
import { ArrowRight, Check, PhoneCall } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/button";
import { BrandVisual } from "@/components/ui/brand-visual";
import { Section } from "@/components/ui/section";
import { services, type Service } from "@/content/services";
import { siteConfig } from "@/content/site";
import { answeredFaqs, stripTrailingPlaceholder, withoutPlaceholders } from "@/lib/content";

export function ServiceDetail({ service }: { service: Service }) {
  // Unconfirmed copy stays in content but never reaches the page.
  const description = stripTrailingPlaceholder(service.description);
  const features = withoutPlaceholders(service.features);
  const faqs = answeredFaqs(service.faqs);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Breadcrumb
          trail={[
            { label: "Products & Services", href: "/services" },
            { label: service.shortName },
          ]}
        />

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <MaskText
              as="h1"
              lines={[service.name]}
              delay={0.1}
              className="display-lg text-balance"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">{description}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get a quote
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-ink/20 bg-white/70">
                  <a href={siteConfig.phoneHref}>
                    <PhoneCall className="size-4" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="group shadow-card overflow-hidden rounded-2xl border border-hairline">
              <div className="aspect-[16/9] w-full">
                <BrandVisual seed={service.slug} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {features.length ? (
        <Section>
          <Reveal>
            <h2 className="display-md">
              What&apos;s included
            </h2>
          </Reveal>
          <ul className="hairline-grid mt-8 sm:grid-cols-2">
            {features.map((feature, index) => (
              <li key={feature}>
                <Reveal delay={index * 0.06} className="hairline-cell flex h-full items-start gap-3 p-6">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-tint ring-1 ring-brand/20">
                    <Check className="size-3.5 text-brand-deep" aria-hidden />
                  </span>
                  <span className="text-sm">{feature}</span>
                </Reveal>
              </li>
            ))}
            {/* An odd count would otherwise leave the grid's hairline backing
                showing through as a solid block. */}
            {features.length % 2 === 1 ? (
              <li className="hairline-cell hidden sm:block" aria-hidden />
            ) : null}
          </ul>
        </Section>
      ) : null}

      <Section variant="sand" bordered>
        <Reveal>
          <h2 className="display-md">
            How it works
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
          {service.steps.map((step, index) => (
            <li key={step.title} className="bg-canvas">
              <Reveal delay={index * 0.1} className="h-full p-8">
                <div className="flex items-center gap-3">
                  <span className="tnum flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-ink">
                    {index + 1}
                  </span>
                  <span
                    className="h-px flex-1 bg-[linear-gradient(to_right,var(--color-hairline),transparent)]"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-6 font-semibold tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Left-aligned, not a centred column. This block used to centre itself
          in the page while every other section on the route started at the
          gutter, so its heading sat 272px right of the one above it. The
          accordion caps its own width instead. */}
      {faqs.length ? (
        <Section>
          <Reveal>
            <h2 className="display-md">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  {/* `measure` to match the FAQ page, where the same component
                      caps its answers. Without it these ran ~120 characters. */}
                  <AccordionContent className="measure text-sm leading-7 text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Section>
      ) : null}

      {/* Cross-navigation: never leave a detail page as a dead end. */}
      <Section space="flushTop">
        <Reveal>
          <h2 className="label-micro text-ink-soft">
            Other services
          </h2>
        </Reveal>
        <div className="hairline-grid mt-6 sm:grid-cols-3">
          {others.map((other, index) => (
            <Reveal key={other.slug} delay={index * 0.06} className="hairline-cell">
              <Link
                href={`/services/${other.slug}`}
                className="group/next flex h-full flex-col justify-between gap-6 p-8 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
              >
                <span>
                  <span className="block font-semibold tracking-[-0.01em] text-balance">
                    {other.name}
                  </span>
                  <span className="mt-2 block text-sm text-ink-soft">{other.blurb}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover/next:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
