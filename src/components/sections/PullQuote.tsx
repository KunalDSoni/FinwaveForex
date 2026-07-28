import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function PullQuote() {
  return (
    <section className="bg-sand/50">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <Reveal>
          <blockquote>
            {/* Drawn rather than typed: the accent face renders " as two slashes. */}
            <svg
              aria-hidden
              viewBox="0 0 44 32"
              className="mx-auto h-6 w-auto text-brand"
              fill="currentColor"
            >
              <path d="M0 32V18.4C0 8.6 5.4 2.1 16.2 0l1.8 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.9V32H0Zm25.9 0V18.4C25.9 8.6 31.3 2.1 42.1 0l1.9 4.9c-6.2 1.8-9.3 5.3-9.3 10.4h9.8V32H25.9Z" />
            </svg>
            <p className="font-accent mt-7 text-2xl leading-snug tracking-[-0.02em] text-balance italic sm:text-3xl lg:text-[2.5rem]">
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
