import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";

export function PullQuote() {
  return (
    <section className="border-y border-hairline bg-sand/60">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <Reveal>
          <blockquote>
            <p className="font-accent text-2xl leading-snug tracking-[-0.01em] text-balance italic sm:text-3xl lg:text-4xl">
              &ldquo;We can surely better this rate for&nbsp;you.&rdquo;
            </p>
            <footer className="mt-8 text-xs font-semibold tracking-widest text-ink-soft uppercase">
              Our promise · {siteConfig.legalName}
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
