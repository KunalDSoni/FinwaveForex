import { Fragment } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
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
import { Eyebrow } from "@/components/ui/eyebrow";
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
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Breadcrumb trail={[{ label: "FAQ's" }]} />
        <SectionHeading
          as="h1"
          layout="split"
          lines={[
            <Fragment key="l1">Questions we get</Fragment>,
            <Fragment key="l2">
              asked <Em>every day.</Em>
            </Fragment>,
          ]}
          sub={`${total} answers on currencies, sending money abroad, documents, cancellation and delivery. If yours isn't here, the desk will answer it in a minute on the phone.`}
        />
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
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

          </div>
        </div>
      </Section>

      {/* Regulatory context Finwave publishes, kept verbatim.

          Was a white card inside the answers column: a filled, bordered slab
          sitting under a list of plain accordion rows, so the footnote outranked
          the answers. It is now a band — the same treatment as "How it works"
          and the editorial splits elsewhere on the site — which reads as the
          closing section of the page rather than an object dropped into it. */}
      <Section id="framework" variant="sand" bordered className="scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,42rem)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>The legal framework</Eyebrow>
            <h2 className="display-md mt-5 text-balance">
              The rules we <Em>operate under.</Em>
            </h2>
            <p className="measure mt-5 text-base leading-7 text-ink-soft">
              Reproduced verbatim from the guidance Finwave Forex publishes, alongside the RBI
              travel-forex guidelines in full.
            </p>
            <a
              href={asset(travelGuidelines.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/pdf mt-7 inline-flex items-center gap-3 rounded-xl border border-hairline bg-canvas px-5 py-3.5 text-sm font-semibold transition-[border-color,background-color] duration-300 hover:border-brand/50 hover:bg-brand-tint/40 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
            >
              <FileText className="size-4 shrink-0 text-brand-deep" aria-hidden />
              {travelGuidelines.label}
              <ArrowUpRight
                className="size-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover/pdf:translate-x-0.5 group-hover/pdf:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
          <Reveal delay={0.1}>
            <p className="measure text-base leading-7 text-ink-soft">{femaFramework}</p>
          </Reveal>
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
      />
    </>
  );
}
