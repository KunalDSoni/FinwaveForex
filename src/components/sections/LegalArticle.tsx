import Link from "next/link";
import { ArrowRight, Mail, PhoneCall, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/content/site";
import { legalPages, type LegalPage } from "@/content/legal";

/** Stable anchor id from a section heading. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Three columns: contents, document, document meta.
 *
 * A legal page is one measure-wide column of prose, so on a wide page it
 * either strands ~900px of void beside it or shrinks into a ribbon that uses
 * half the screen. Neither is the answer — the third column is. It carries
 * what a reader of a legal document actually reaches for (who published it,
 * when, the companion document, and how to ask about it), which composes the
 * page across the full width with content rather than with margin.
 */
export function LegalArticle({ page }: { page: LegalPage }) {
  // A contents rail earns its place once a document has more than one part.
  const showContents = page.sections.length > 1;
  const companion = legalPages.find((doc) => doc.slug !== page.slug);

  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Legal</Eyebrow>
              <h1 className="display-lg mt-5 text-balance">{page.title}</h1>
            </div>
            {page.intro ? (
              <p className="measure text-lg leading-8 text-ink-soft lg:pt-3">{page.intro}</p>
            ) : null}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-page gutter pt-14 pb-16 lg:pt-16 lg:pb-20">
        <div
          className={
            showContents
              ? "grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)_19rem] lg:gap-x-14"
              : "grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-14"
          }
        >
          {showContents ? (
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="label-micro text-ink-soft">On this page</p>
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
                        // Capped to the measure plus the number column so the
                        // dividing rules stop where the text stops, instead of
                        // running 300px past it into empty column.
                        <ol
                          key={blockIndex}
                          className="flex max-w-[calc(57ch+2.75rem)] flex-col gap-5"
                        >
                          {block.items.map((clause, clauseIndex) => (
                            <li
                              key={clause.slice(0, 60)}
                              className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-hairline pt-5 first:border-t-0 first:pt-0"
                            >
                              <span className="tnum pt-0.5 text-xs font-semibold text-brand-deep">
                                {String(clauseIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="measure text-base leading-7 text-ink-soft">
                                {clause}
                              </span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <ul key={blockIndex} className="flex flex-col gap-3">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="measure flex gap-3 text-base leading-7 text-ink-soft"
                            >
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
          </div>

          {/* Document meta. Sticky, so it stays useful through a long scroll. */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-hairline bg-canvas p-6">
              <p className="label-micro text-ink-soft">This document</p>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Published by</dt>
                  <dd className="text-right font-medium">{siteConfig.legalName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-hairline pt-3">
                  <dt className="text-ink-soft">Last updated</dt>
                  <dd className="text-right font-medium">{page.updated ?? "Not stated"}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-hairline pt-3">
                  <dt className="text-ink-soft">Status</dt>
                  <dd className="flex items-center gap-1.5 text-right font-medium">
                    <ShieldCheck className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    RBI-approved
                  </dd>
                </div>
              </dl>

              {companion ? (
                <Link
                  href={`/${companion.slug}`}
                  className="group/doc mt-6 flex items-center justify-between gap-3 rounded-xl border border-hairline bg-paper px-4 py-3 text-sm font-semibold transition-colors hover:border-brand/50 hover:bg-brand-tint/40 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                >
                  {companion.title}
                  <ArrowRight
                    className="size-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover/doc:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              ) : null}

              <div className="mt-6 border-t border-hairline pt-5">
                <p className="text-sm font-semibold">Questions about this policy?</p>
                <div className="mt-1 flex flex-col">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex min-h-11 items-center gap-2 text-sm font-medium text-brand-deep transition-colors hover:text-ink"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    {siteConfig.email}
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex min-h-11 items-center gap-2 text-sm font-medium text-brand-deep transition-colors hover:text-ink"
                  >
                    <PhoneCall className="size-4 shrink-0" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink-soft">
                  {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city}{" "}
                  {siteConfig.address.postalCode}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
