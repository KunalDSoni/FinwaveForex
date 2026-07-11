"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealScaleProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Scale origin — "icon" gives a rotation, "tag" gives a simpler pop. */
  variant?: "icon" | "tag";
};

export function RevealScale({
  children,
  delay = 0,
  className,
  variant = "tag",
}: RevealScaleProps) {
  const reduce = useReducedMotion();

  const initial =
    variant === "icon"
      ? { opacity: 0, scale: 0.2, rotate: -360 }
      : { opacity: 0, scale: 0.85 };

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : initial}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, rotate: 0 }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: variant === "icon" ? 0.7 : 0.5,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
