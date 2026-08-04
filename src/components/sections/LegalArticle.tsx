import Link from "next/link";
import { Mail, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/content/site";
import type { LegalPage } from "@/content/legal";

/** Stable anchor id from a section heading. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function LegalArticle({ page }: { page: LegalPage }) {
  // A contents rail earns its place once a document has more than one part.
  const showContents = page.sections.length > 1;

  return (
    <>
      <section className="mx-auto max-w-[var(--container-doc)] gutter pt-28 lg:pt-36">
        <Reveal>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="display-lg mt-5 text-balance">
            {page.title}
          </h1>
          <p className="measure mt-6 text-lg leading-8 text-ink-soft">{page.intro}</p>
          {page.updated ? (
            <p className="mt-6 label-micro text-ink-soft">
              Last updated {page.updated}
            </p>
          ) : null}
        </Reveal>
      </section>

      <section className="mx-auto max-w-[var(--container-doc)] gutter pt-14 pb-16 lg:pt-16 lg:pb-20">
        {/* Without a contents rail the column has nothing to sit against, so it
            is capped near the measure rather than at max-w-3xl — otherwise the
            contact card ran ~200px wider than any line of text beside it. */}
        <div className={showContents ? "grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14" : "max-w-[40rem]"}>
          {showContents ? (
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="label-micro text-ink-soft">
                On this page
              </p>
              <ol className="mt-4 flex flex-col gap-1">
                {page.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="flex gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-white hover:text-brand-deep focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                    >
                      <span className="tnum shrink-0 text-xs text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="min-w-0">
            {page.sections.map((section, index) => (
              <section
                key={section.heading}
                id={slugify(section.heading)}
                className={index === 0 ? "scroll-mt-28" : "mt-12 scroll-mt-28"}
              >
                <Reveal>
                  <h2 className="display-sm flex gap-3">
                    {showContents ? (
                      <span className="tnum mt-1.5 shrink-0 text-sm text-brand-deep">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    ) : null}
                    {section.heading}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {section.blocks.map((block, blockIndex) =>
                      block.type === "paragraph" ? (
                        <p key={blockIndex} className="measure text-base leading-7 text-ink-soft">
                          {block.text}
                        </p>
                      ) : block.type === "clauses" ? (
                        // Verbatim contract clauses, numbered so they can be
                        // cited — the source publishes them as one long block.
                        <ol key={blockIndex} className="flex flex-col gap-5">
                          {block.items.map((clause, clauseIndex) => (
                            <li
                              key={clause.slice(0, 60)}
                              className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-hairline pt-5 first:border-t-0 first:pt-0"
                            >
                              <span className="tnum pt-0.5 text-xs font-semibold text-brand-deep">
                                {String(clauseIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="measure text-base leading-7 text-ink-soft">{clause}</span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <ul key={blockIndex} className="flex flex-col gap-3">
                          {block.items.map((item) => (
                            <li key={item} className="measure flex gap-3 text-base leading-7 text-ink-soft">
                              <span
                                className="mt-3.5 size-1.5 shrink-0 rounded-full bg-brand"
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </Reveal>
              </section>
            ))}

            {/* Where to take a question about this document. */}
            <Reveal delay={0.1}>
              <div className="mt-14 rounded-2xl border border-hairline bg-white p-8">
                <h2 className="text-base font-semibold tracking-[-0.01em]">
                  Questions about this policy?
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Write to us or call the desk and we&apos;ll put you through to the right person.
                </p>
                {/* min-h-11: these three were 20px, 20px and 16px tall, the
                    only controls on the site failing WCAG 2.5.8 (24px). */}
                <div className="mt-4 flex flex-wrap gap-x-6 text-sm">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex min-h-11 items-center gap-2 font-medium text-brand-deep transition-colors hover:text-ink"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    {siteConfig.email}
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex min-h-11 items-center gap-2 font-medium text-brand-deep transition-colors hover:text-ink"
                  >
                    <PhoneCall className="size-4 shrink-0" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </div>
                <p className="measure mt-5 border-t border-hairline pt-5 text-xs leading-6 text-ink-soft">
                  {siteConfig.legalName} · {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.city} {siteConfig.address.postalCode} ·{" "}
                  <Link
                    href="/contact"
                    className="inline-block py-2 underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Contact us
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
