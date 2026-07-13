"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  freq: number;
  amp: number;
};

/**
 * Ambient warm particle field for the hero. Canvas 2D with a pre-rendered soft
 * dot sprite (fast, GPU-composited): particles drift organically around their
 * home, are repelled by the cursor and spring back with damping, and are denser
 * toward the edges so the centre stays clear for the headline. Touch adds a
 * ripple. Respects reduced-motion (static field) and pauses when the tab hides.
 */
export function ParticleField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let disposed = false;

    const pointer = { x: -9999, y: -9999, active: false, last: 0 };
    const ripples: { x: number; y: number; start: number }[] = [];

    // Pre-rendered soft warm dot — drawn once, blitted per particle.
    const S = 24;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = S;
    const sc = sprite.getContext("2d");
    if (sc) {
      const g = sc.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, "rgba(255,235,225,0.26)");
      g.addColorStop(0.45, "rgba(255,235,225,0.1)");
      g.addColorStop(1, "rgba(255,235,225,0)");
      sc.fillStyle = g;
      sc.fillRect(0, 0, S, S);
    }

    function build() {
      const target = w < 640 ? 600 : w < 1024 ? 1200 : 2000;
      const cx = w / 2;
      const cy = h / 2;
      const maxD = Math.hypot(cx, cy) || 1;
      const arr: Particle[] = [];
      let guard = 0;
      while (arr.length < target && guard < target * 12) {
        guard++;
        const x = Math.random() * w;
        const y = Math.random() * h;
        const d = Math.hypot(x - cx, y - cy) / maxD; // 0 centre → 1 corner
        // Thin the centre, thicken the edges.
        if (Math.random() < 0.14 + 0.86 * Math.pow(d, 1.35)) {
          arr.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            size: 0.8 + Math.random() * 1.7,
            phase: Math.random() * Math.PI * 2,
            freq: 0.15 + Math.random() * 0.4,
            amp: 3 + Math.random() * 8,
          });
        }
      }
      particles = arr;
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      build();
      draw(performance.now());
    }

    function draw(now: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      const t = now / 1000;
      const REPEL = 120;
      const animate = !reduce;

      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].start > 1100) ripples.splice(i, 1);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (animate) {
          const hx = p.ox + Math.sin(t * p.freq + p.phase) * p.amp;
          const hy = p.oy + Math.cos(t * p.freq * 0.85 + p.phase) * p.amp;
          let ax = (hx - p.x) * 0.018;
          let ay = (hy - p.y) * 0.018;

          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < REPEL * REPEL) {
              const d = Math.sqrt(d2) || 0.001;
              const f = 1 - d / REPEL;
              const push = f * f * 3.4;
              ax += (dx / d) * push;
              ay += (dy / d) * push;
            }
          }

          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const age = (now - rip.start) / 1100;
            const radius = age * Math.max(w, h) * 0.5;
            const dx = p.x - rip.x;
            const dy = p.y - rip.y;
            const d = Math.hypot(dx, dy) || 0.001;
            const band = Math.abs(d - radius);
            if (band < 60) {
              const push = (1 - band / 60) * (1 - age) * 2.6;
              ax += (dx / d) * push;
              ay += (dy / d) * push;
            }
          }

          p.vx = (p.vx + ax) * 0.86;
          p.vy = (p.vy + ay) * 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }

        const s = p.size * 3.6;
        ctx!.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
      }

      if (pointer.active) {
        const a = Math.max(0, 1 - (now - pointer.last) / 700);
        if (a > 0.01) {
          const R = 170;
          const g = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R);
          g.addColorStop(0, `rgba(255,235,225,${0.12 * a})`);
          g.addColorStop(1, "rgba(255,235,225,0)");
          ctx!.fillStyle = g;
          ctx!.fillRect(pointer.x - R, pointer.y - R, R * 2, R * 2);
        }
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    function loop(now: number) {
      if (disposed) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= -80 && x <= w + 80 && y >= -80 && y <= h + 80) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
        pointer.last = performance.now();
      } else {
        pointer.active = false;
      }
    }

    function onLeave() {
      pointer.active = false;
    }

    function onTouch(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas!.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        ripples.push({ x, y, start: performance.now() });
        if (ripples.length > 6) ripples.shift();
      }
    }

    resize();

    if (reduce) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseout", onLeave, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce && !disposed) {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
