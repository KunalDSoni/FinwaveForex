"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
};

export function Card({ children, hover = false, glow = false, className }: CardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={hover && !reduce ? { y: -5 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group shadow-soft relative flex flex-col overflow-hidden rounded-[20px] border border-hairline bg-white p-8 transition-[border-color,box-shadow] duration-300",
        hover && "hover:border-brand/40 hover:shadow-rich-lg",
        className,
      )}
    >
      {glow ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.18),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      {children}
    </motion.div>
  );
}
