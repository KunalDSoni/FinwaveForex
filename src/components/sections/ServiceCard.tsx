"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, Building2, CreditCard, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/content/services";

const icons = { Banknote, Send, CreditCard, Building2 };

type ServiceCardProps = { service: Service; index: number };

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = icons[service.icon];
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
          <Icon className="size-5 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
        </span>
        <h3 className="mt-6 text-lg font-semibold tracking-tight">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{service.blurb}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-deep"
        >
          Learn more<span className="sr-only"> about {service.name.toLowerCase()}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </motion.div>
    </Reveal>
  );
}
