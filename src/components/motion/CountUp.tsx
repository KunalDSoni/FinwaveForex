"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type CountUpProps = { value: number; suffix?: string; className?: string };

export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });

  // Reset to zero on mount so the animation still has somewhere to travel from.
  useEffect(() => {
    if (reduce) return;
    if (ref.current) ref.current.textContent = `0${suffix}`;
  }, [reduce, suffix]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    mv.set(value);
  }, [inView, reduce, mv, value, suffix]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      }),
    [spring, suffix],
  );

  // Renders the true figure, not 0. Previously the static HTML shipped
  // "0+ Years in foreign exchange" — what crawlers, no-JS visitors and anyone
  // reading before hydration saw on a page whose whole job is credibility.
  // The count-up now starts from zero only after JS takes over.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
