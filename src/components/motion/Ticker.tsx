import { cn } from "@/lib/utils";

type TickerProps = { items: string[]; className?: string };

function TickerRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 font-mono text-[13px] tracking-wide text-ink-soft">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Ticker({ items, className }: TickerProps) {
  return (
    <div className={cn("group overflow-hidden border-y border-hairline bg-sand/60 py-3", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TickerRow items={items} />
        <TickerRow items={items} hidden />
      </div>
    </div>
  );
}
