"use client";

import Image from "next/image";
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
        scrolled ? "border-b border-hairline bg-paper/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Finwave Forex, home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Finwave Forex"
            width={1459}
            height={379}
            preload
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/[0.06] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2.5 md:flex">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-ink/25 bg-transparent hover:bg-ink hover:text-paper"
          >
            <a href={siteConfig.phoneHref}>Call us</a>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Get a quote</Link>
          </Button>
        </div>
        <MobileNav />
      </div>
    </motion.header>
  );
}
