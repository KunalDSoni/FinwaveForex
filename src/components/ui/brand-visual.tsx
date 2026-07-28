import { cn } from "@/lib/utils";

// Wide viewBox drawn to fill (`preserveAspectRatio="none"`) so the whole
// composition survives at every aspect this is used at — a 21:6 page banner,
// a 16:9 card thumbnail — instead of being cropped by `slice`.
const W = 400;
const H = 160;

/** Per-band hover drift, front bands travelling further than back ones. */
const DRIFT = [
  "group-hover:translate-y-[6px]",
  "group-hover:translate-y-[4px]",
  "group-hover:translate-y-[2px]",
  "group-hover:translate-y-[1px]",
] as const;

/** Cheap deterministic hash so a string seed yields a stable composition. */
function hash(seed: string | number) {
  const str = String(seed);
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Deterministic sine band. Sampled rather than curved so the same `seed`
 * always renders identically on the server and the client.
 */
function band(baseY: number, amp: number, phase: number, freq: number) {
  const points: string[] = [];
  for (let x = 0; x <= W; x += 8) {
    const y = baseY + Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp;
    points.push(`${x},${y.toFixed(2)}`);
  }
  return `M${points.join(" L")} L${W},${H} L0,${H} Z`;
}

/**
 * Seeded rate trend across the upper band — the detail that makes the artwork
 * read as foreign exchange rather than decorative landscape.
 */
function trend(seed: string | number) {
  const steps = 11;
  return Array.from({ length: steps }, (_, i) => {
    const jitter = (hash(`${seed}-t${i}`) % 100) / 100;
    return {
      x: (i / (steps - 1)) * W,
      // Drifts upward left-to-right with seeded jitter.
      y: 74 - (i / (steps - 1)) * 34 + jitter * 16 - 8,
    };
  });
}

type BrandVisualProps = {
  /** Any stable string (slug, title) — same seed, same artwork. */
  seed?: string | number;
  tone?: "paper" | "ink";
  className?: string;
};

/**
 * Generative "Finwave" artwork: a seeded rate trend over layered gold bands,
 * used wherever a page needs a thumbnail. Built rather than photographed so
 * the site ships no stock imagery; swap for real photography later by
 * replacing this component's internals, not the layouts that use it.
 *
 * Sits inside a `group` — the layers parallax apart on hover.
 */
export function BrandVisual({ seed = "finwave", tone = "paper", className }: BrandVisualProps) {
  const h = hash(seed);
  const id = `bv${h.toString(36)}`;
  const dark = tone === "ink";
  const line = trend(seed);

  const bands = [0, 1, 2, 3].map((i) => {
    const r = hash(`${seed}-${i}`);
    return {
      d: band(78 + i * 20 + (r % 8), 7 + ((h >> (i * 3)) % 9), ((r % 100) / 100) * Math.PI * 2, 1 + ((r >> 5) % 3) * 0.5),
      opacity: dark ? 0.14 + i * 0.13 : 0.16 + i * 0.15,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dark ? "#241f18" : "#fdfbf6"} />
          <stop offset="100%" stopColor={dark ? "#14120e" : "#f0e7d5"} />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eaa300" />
          <stop offset="55%" stopColor="#d59200" />
          <stop offset="100%" stopColor="#b07b00" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="78%" cy="16%" r="62%">
          <stop offset="0%" stopColor="#eaa300" stopOpacity={dark ? "0.35" : "0.24"} />
          <stop offset="100%" stopColor="#eaa300" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />

      {/* Chart grid */}
      <g
        stroke={dark ? "#ffffff" : "#1c1a15"}
        strokeOpacity={dark ? "0.07" : "0.05"}
        vectorEffect="non-scaling-stroke"
      >
        {[50, 100, 150, 200, 250, 300, 350].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2={H} />
        ))}
        {[30, 60, 90].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2={W} y2={y} />
        ))}
      </g>

      {bands.map((b, i) => (
        <path
          key={i}
          d={b.d}
          fill={`url(#${id}-gold)`}
          opacity={b.opacity}
          className={cn(
            "transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
            DRIFT[i],
          )}
        />
      ))}

      {/* Rate trend, drawn last so it stays legible over the bands. */}
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <polyline
          points={line.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          fill="none"
          stroke={dark ? "#eaa300" : "#8a6000"}
          strokeOpacity={dark ? "0.9" : "0.75"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {line.map((p, i) =>
          i % 3 === 0 ? (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2.5"
              fill={dark ? "#eaa300" : "#8a6000"}
              fillOpacity={dark ? "0.95" : "0.8"}
              vectorEffect="non-scaling-stroke"
            />
          ) : null,
        )}
      </g>
    </svg>
  );
}
