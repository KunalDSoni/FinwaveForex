import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Card } from "@/components/ui/card";
import type { Service } from "@/content/services";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-4 sm:px-6 lg:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-brand uppercase">
            Services / {service.shortName}
          </p>
        </Reveal>
        <MaskText
          as="h1"
          lines={[service.name]}
          delay={0.1}
          className="mt-4 font-serif text-4xl font-normal tracking-tight text-balance sm:text-5xl lg:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">{service.description}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.features.map((feature, index) => (
            <li key={feature}>
              <Reveal delay={index * 0.06} className="h-full">
                <Card className="h-full flex-row items-start gap-3 p-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                    <Check className="size-3.5 text-brand-deep" aria-hidden />
                  </span>
                  <span className="text-sm leading-6">{feature}</span>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-hairline bg-sand/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">How it works</h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {service.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.1}>
                  <span className="text-sm font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-8">
            {service.faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-ink-soft">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
