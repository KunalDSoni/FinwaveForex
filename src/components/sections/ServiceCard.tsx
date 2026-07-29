// Deliberately a server component. Marking it "use client" would push the
// whole `service` object across the serialization boundary, embedding the
// unconfirmed TODO features and FAQ answers in the page's RSC payload where
// they are readable in view-source. Rendering on the server ships only the
// filtered output. It has no hooks or handlers, so nothing is lost.
import Link from "next/link";
import { ArrowRight, Banknote, Check, CreditCard, ScrollText, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BrandVisual } from "@/components/ui/brand-visual";
import { Card } from "@/components/ui/card";
import type { Service } from "@/content/services";
import { withoutPlaceholders } from "@/lib/content";

const icons = { Banknote, Send, CreditCard, ScrollText };

type ServiceCardProps = { service: Service; index: number; variant?: "card" | "cell" };

export function ServiceCard({ service, index, variant = "card" }: ServiceCardProps) {
  const Icon = icons[service.icon];

  if (variant === "cell") {
    return (
      <div className="group hairline-cell relative flex flex-col p-7 lg:p-8">
        <span className="tnum absolute top-7 right-7 text-xs font-medium text-ink-soft/45">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-[background-color,box-shadow] duration-300 group-hover:bg-brand group-hover:text-ink group-hover:ring-brand/40">
          <Icon
            className="size-[22px] transition-transform duration-300 group-hover:-rotate-6"
            aria-hidden
          />
        </span>
        <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.02em] text-balance">
          {service.name}
        </h3>
        <p className="relative mt-2.5 flex-1 text-sm leading-6 text-ink-soft">{service.blurb}</p>
        <Link
          href={`/services/${service.slug}`}
          className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
        >
          Learn more<span className="sr-only"> about {service.name.toLowerCase()}</span>
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    );
  }

  // Full card: seeded thumbnail, then the three strongest confirmed features.
  const highlights = withoutPlaceholders(service.features).slice(0, 3);

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Card hover className="h-full p-0">
        <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-hairline">
          <BrandVisual seed={service.slug} />
          <span className="shadow-soft absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-2xl bg-white/90 text-brand-deep ring-1 ring-hairline backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
            <Icon
              className="size-[22px] transition-transform duration-300 group-hover:-rotate-6"
              aria-hidden
            />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7 lg:p-8">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-balance">{service.name}</h3>
          <p className="mt-2.5 text-sm leading-6 text-ink-soft">{service.blurb}</p>
          {highlights.length ? (
            <ul className="mt-5 flex flex-col gap-2 border-t border-hairline pt-5">
              {highlights.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-6">
                  <Check className="mt-1 size-3.5 shrink-0 text-brand-deep" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href={`/services/${service.slug}`}
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            Learn more<span className="sr-only"> about {service.name.toLowerCase()}</span>
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </Card>
    </Reveal>
  );
}
