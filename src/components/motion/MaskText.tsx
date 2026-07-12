"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type MaskTextProps = {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

export function MaskText({ lines, className, delay = 0, as: Tag = "h2" }: MaskTextProps) {
  const reduce = useReducedMotion();
  // Observe the (un-translated) heading itself. The animated inner spans start
  // translated 110% down and are clipped by their overflow:hidden parent, so
  // observing them directly makes the IntersectionObserver report them as
  // off-screen and the reveal never fires. Watching the container instead
  // keeps the mask reveal reliable for both above- and below-the-fold headings.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  // Loosely-typed alias so the shared ref can sit on any of h1/h2/p.
  const Container = Tag as ElementType;

  if (reduce) {
    return (
      <Tag className={cn(className)}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Container ref={ref} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Container>
  );
}
