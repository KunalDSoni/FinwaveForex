import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function PullQuote() {
  return (
    <section className="border-y border-hairline bg-sand/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <blockquote className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            {/* Drawn rather than typed: the accent face renders " as two slashes. */}
            <svg
              aria-hidden
              viewBox="0 0 44 32"
              className="h-8 w-auto shrink-0 text-brand lg:h-10"
              fill="currentColor"
            >
              <path d="M0 32V18.4C0 8.6 5.4 2.1 16.2 0l1.8 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.9V32H0Zm25.9 0V18.4C25.9 8.6 31.3 2.1 42.1 0l1.9 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.8V32H25.9Z" />
            </svg>
            <div>
              <p className="font-accent max-w-3xl text-2xl leading-snug tracking-[-0.02em] text-balance italic sm:text-3xl lg:text-[2.5rem]">
                We can surely better this rate for&nbsp;you.
              </p>
              <footer className="mt-7 text-xs font-semibold tracking-[0.16em] text-ink-soft uppercase">
                Our promise · {siteConfig.legalName}
              </footer>
            </div>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
