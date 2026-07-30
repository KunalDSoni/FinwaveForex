"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/content/site";

const list = { visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-dvh bg-paper">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <motion.ul initial="hidden" animate="visible" variants={list} className="mt-16 space-y-2 px-4">
          {[...siteConfig.nav, { label: "Get a quote", href: "/contact" }].map((link) => (
            <motion.li key={link.href + link.label} variants={item}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-sm block py-3"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
          {/* Legal pages were previously unreachable from the mobile menu. */}
          <motion.li variants={item} className="pt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6">
              {siteConfig.footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.li>
        </motion.ul>
      </SheetContent>
    </Sheet>
  );
}
