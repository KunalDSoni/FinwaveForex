import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function PullQuote() {
  return (
    <section className="bg-sand/50">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <Reveal>
          <blockquote>
            <span
              aria-hidden
              className="font-accent block text-6xl leading-[0.5] text-brand select-none"
            >
              &ldquo;
            </span>
            <p className="font-accent mt-8 text-2xl leading-snug tracking-[-0.02em] text-balance italic sm:text-3xl lg:text-[2.5rem]">
              We can surely better this rate for&nbsp;you.
            </p>
            <footer className="mt-8 text-xs font-semibold tracking-[0.16em] text-ink-soft uppercase">
              Our promise · {siteConfig.legalName}
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
