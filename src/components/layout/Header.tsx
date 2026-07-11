"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.header
      initial={{ y: reduce ? 0 : -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-hairline bg-paper/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Finwave <span className="text-brand">Forex</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm text-ink-soft transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Get a quote</Link>
          </Button>
        </nav>
        <MobileNav />
      </div>
    </motion.header>
  );
}
