"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
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
  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
