"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  size: number;
  sym: number;
  depth: number;
  alpha: number;
  amp: number;
  freq: number;
  phase: number;
};

/**
 * Calm, layered currency-symbol field for the hero. A sparse set of glyphs sits
 * toward the edges (kept out of the headline / card zones marked with
 * `data-particle-safe`), drifts very slowly, and is layered by depth via size
 * and opacity. The cursor is a soft spotlight that gently reveals and nudges
 * nearby glyphs — no repulsion, no chaos. Reduced-motion renders a still field.
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
    let safe: { x: number; y: number; w: number; h: number }[] = [];
    let raf = 0;
    let disposed = false;

    const pointer = { x: -9999, y: -9999, active: false, last: 0 };

    // Each currency glyph pre-rendered once (white, with a soft baked glow);
    // per-particle opacity is applied at draw time for depth layering.
    const SYMBOLS = ["$", "£", "€", "¥", "฿"];
    const S = 48;
    const sprites = SYMBOLS.map((sym) => {
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const g = c.getContext("2d");
      if (g) {
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.font = `500 ${Math.round(S * 0.58)}px "Hanken Grotesk", system-ui, sans-serif`;
        g.shadowColor = "rgba(255,235,225,0.5)";
        g.shadowBlur = S * 0.2;
        g.fillStyle = "rgba(255,235,225,0.92)";
        g.fillText(sym, S / 2, S / 2 + S * 0.04);
      }
      return c;
    });

    function computeSafe() {
      const cr = canvas!.getBoundingClientRect();
      safe = [];
      parent!.querySelectorAll<HTMLElement>("[data-particle-safe]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const pad = 28;
        safe.push({
          x: r.left - cr.left - pad,
          y: r.top - cr.top - pad,
          w: r.width + pad * 2,
          h: r.height + pad * 2,
        });
      });
    }

    function inSafe(x: number, y: number) {
      for (let i = 0; i < safe.length; i++) {
        const z = safe[i];
        if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) return true;
      }
      return false;
    }

    function build() {
      // 80% sparser than the dot field — a quiet, luxurious scatter.
      const target = w < 640 ? 90 : w < 1024 ? 180 : 300;
      const cx = w / 2;
      const cy = h / 2;
      const maxD = Math.hypot(cx, cy) || 1;
      const arr: Particle[] = [];
      let guard = 0;
      while (arr.length < target && guard < target * 40) {
        guard++;
        const x = Math.random() * w;
        const y = Math.random() * h;
        if (inSafe(x, y)) continue;
        const d = Math.hypot(x - cx, y - cy) / maxD; // 0 centre → 1 corner
        // Strongly concentrate toward the edges.
        if (Math.random() > 0.03 + 0.97 * Math.pow(d, 2.3)) continue;
        const depth = Math.random();
        arr.push({
          ox: x,
          oy: y,
          x,
          y,
          size: 10 + depth * 12,
          sym: (Math.random() * SYMBOLS.length) | 0,
          depth,
          alpha: 0.1 + depth * 0.3,
          amp: 2.5 + depth * 3.5, // 5–10px of travel at most
          freq: 0.03 + Math.random() * 0.05, // ~4× slower than before
          phase: Math.random() * Math.PI * 2,
        });
      }
      // Far (faint) first so nearer glyphs layer on top.
      arr.sort((a, b) => a.depth - b.depth);
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
      computeSafe();
      build();
      draw(performance.now());
    }

    function draw(now: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      const t = now / 1000;
      const R = 210; // spotlight radius
      const animate = !reduce;
      const glowFade = pointer.active ? Math.max(0, 1 - (now - pointer.last) / 900) : 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let tx = p.ox;
        let ty = p.oy;
        let boost = 0;

        if (animate) {
          tx += Math.sin(t * p.freq + p.phase) * p.amp;
          ty += Math.cos(t * p.freq * 0.9 + p.phase) * p.amp;

          if (pointer.active) {
            const dx = tx - pointer.x;
            const dy = ty - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < R) {
              const f = 1 - dist / R;
              boost = f * glowFade; // spotlight reveal
              const nudge = f * f * 8 * glowFade; // gentle drift, ≤ ~8px
              tx += (dx / (dist || 1)) * nudge;
              ty += (dy / (dist || 1)) * nudge;
            }
          }

          // ease toward target for smooth, unhurried motion
          p.x += (tx - p.x) * 0.06;
          p.y += (ty - p.y) * 0.06;
        } else {
          p.x = tx;
          p.y = ty;
        }

        ctx!.globalAlpha = Math.min(0.72, p.alpha + boost * 0.4);
        const s = p.size;
        ctx!.drawImage(sprites[p.sym], p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx!.globalAlpha = 1;

      // Soft warm spotlight following the cursor.
      if (glowFade > 0.01) {
        const g = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R);
        g.addColorStop(0, `rgba(255,235,225,${0.07 * glowFade})`);
        g.addColorStop(1, "rgba(255,235,225,0)");
        ctx!.globalCompositeOperation = "lighter";
        ctx!.fillStyle = g;
        ctx!.fillRect(pointer.x - R, pointer.y - R, R * 2, R * 2);
        ctx!.globalCompositeOperation = "source-over";
      }
    }

    function loop(now: number) {
      if (disposed) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function onMove(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= -40 && x <= w + 40 && y >= -40 && y <= h + 40) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
        pointer.last = performance.now();
      } else {
        pointer.active = false;
      }
    }
    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onLeave = () => {
      pointer.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    resize();

    if (reduce) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseout", onLeave, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
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
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
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
