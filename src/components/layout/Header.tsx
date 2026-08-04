"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/content/site";
import { asset } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));
  const legalActive = siteConfig.footerLegal.some((item) => pathname.startsWith(item.href));

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
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between gap-4 gutter">
        <Link href="/" aria-label="Finwave Forex, home" className="flex shrink-0 items-center">
          <Image
            src={asset("/logo.png")}
            alt="Finwave Forex"
            width={1459}
            height={379}
            preload
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  active
                    ? "font-semibold text-ink"
                    : "font-medium text-ink/75 hover:bg-ink/[0.06] hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand"
                  />
                ) : null}
              </Link>
            );
          })}

          {/* Legal pages live under one menu so they stay in the header without
              pushing it past its width. Opens on hover and on focus-within, so
              it works by keyboard without any JavaScript. */}
          <div className="group/legal relative">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                "relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors group-hover/legal:bg-ink/[0.06] group-hover/legal:text-ink group-focus-within/legal:bg-ink/[0.06] group-focus-within/legal:text-ink",
                legalActive ? "font-semibold text-ink" : "font-medium text-ink/75",
              )}
            >
              Legal
              {legalActive ? (
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand"
                />
              ) : null}
              <ChevronDown
                className="size-3.5 transition-transform duration-200 group-hover/legal:rotate-180 group-focus-within/legal:rotate-180"
                aria-hidden
              />
            </button>
            <div className="invisible absolute top-full left-0 z-10 pt-1 opacity-0 transition-opacity duration-150 group-hover/legal:visible group-hover/legal:opacity-100 group-focus-within/legal:visible group-focus-within/legal:opacity-100">
              <ul className="shadow-card min-w-[11rem] rounded-xl border border-hairline bg-white p-1.5">
                {siteConfig.footerLegal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-ink/75 transition-colors hover:bg-brand-tint/50 hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
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
