import { Fragment } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { faqCategories, femaFramework, travelGuidelines } from "@/content/faqs";
import { asset } from "@/lib/base-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ's",
  description:
    "Answers on currency exchange, sending money abroad, travel cards, documents, cancellation and delivery from RBI-approved money changers Finwave Forex.",
  path: "/faq",
});

export default function FaqPage() {
  const total = faqCategories.reduce((sum, category) => sum + category.faqs.length, 0);

  return (
    <>
      <section className="mx-auto max-w-[var(--container-doc)] gutter pt-28 lg:pt-36">
        <Breadcrumb trail={[{ label: "FAQ's" }]} />
        <SectionHeading
          as="h1"
          lines={[
            <Fragment key="l1">Questions we get</Fragment>,
            <Fragment key="l2">
              asked <Em>every day.</Em>
            </Fragment>,
          ]}
          sub={`${total} answers on currencies, sending money abroad, documents, cancellation and delivery. If yours isn't here, the desk will answer it in a minute on the phone.`}
        />
      </section>

      <Section width="document">
        <div className="grid gap-10 lg:grid-cols-[11rem_1fr] lg:gap-14">
          {/* Category index; sticks alongside the answers on large screens. */}
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-micro text-ink-soft">
              Topics
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-block rounded-lg border border-hairline px-3.5 py-2 text-sm font-medium transition-colors hover:border-brand/50 hover:text-brand-deep focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none lg:border-transparent lg:px-3 lg:hover:bg-white"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {faqCategories.map((category, index) => (
              <section
                key={category.id}
                id={category.id}
                className={index === 0 ? "scroll-mt-28" : "mt-14 scroll-mt-28"}
              >
                <Reveal>
                  <h2 className="display-md">
                    {category.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <Accordion type="single" collapsible className="mt-5">
                    {category.faqs.map((faq) => (
                      <AccordionItem key={faq.q} value={faq.q}>
                        <AccordionTrigger className="text-left text-base font-semibold">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="measure text-base leading-7 text-ink-soft">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Reveal>
              </section>
            ))}

            {/* Regulatory context Finwave publishes, kept verbatim. */}
            <section id="framework" className="mt-16 scroll-mt-28">
              <Reveal>
                <div className="rounded-2xl border border-hairline bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20">
                      <Scale className="size-5" aria-hidden />
                    </span>
                    <h2 className="text-lg font-semibold tracking-[-0.02em]">
                      The legal framework
                    </h2>
                  </div>
                  <p className="measure mt-6 text-base leading-7 text-ink-soft">{femaFramework}</p>
                  <a
                    href={asset(travelGuidelines.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/pdf mt-7 inline-flex items-center gap-3 rounded-xl border border-hairline px-5 py-3.5 text-sm font-semibold transition-[border-color,background-color] duration-300 hover:border-brand/50 hover:bg-brand-tint/40 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                  >
                    <FileText className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    {travelGuidelines.label}
                    <ArrowUpRight
                      className="size-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover/pdf:translate-x-0.5 group-hover/pdf:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </Reveal>
            </section>

            {/* Anything not covered goes to a human. */}
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-hairline bg-sand/50 px-8 py-7 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold tracking-tight">Still not answered?</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Call the desk, or send your question and we&apos;ll reply with today&apos;s
                    rate too.
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        lines={[
          <Fragment key="l1">Question not</Fragment>,
          <Fragment key="l2">
            answered <Em tone="dark">here?</Em>
          </Fragment>,
        ]}
        body="The desk answers most things in under a minute, and can confirm today's rate while you're on the line."
        width="document"
      />
    </>
  );
}
