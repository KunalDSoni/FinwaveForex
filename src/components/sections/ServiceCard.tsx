"use client";

import Link from "next/link";
import { ArrowRight, Banknote, Building2, CreditCard, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";
import type { Service } from "@/content/services";

const icons = { Banknote, Send, CreditCard, Building2 };

type ServiceCardProps = { service: Service; index: number; variant?: "card" | "cell" };

export function ServiceCard({ service, index, variant = "card" }: ServiceCardProps) {
  const Icon = icons[service.icon];

  const inner = (
    <>
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
    </>
  );

  if (variant === "cell") {
    return (
      <div className="group hairline-cell relative flex flex-col p-7 lg:p-8">
        <span className="tnum absolute top-7 right-7 text-xs font-medium text-ink-soft/45">
          {String(index + 1).padStart(2, "0")}
        </span>
        {inner}
      </div>
    );
  }

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Card hover glow className="h-full">
        {inner}
      </Card>
    </Reveal>
  );
}
