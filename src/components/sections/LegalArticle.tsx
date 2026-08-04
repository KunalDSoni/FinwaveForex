import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Mail, PhoneCall, ShieldCheck } from "lucide-react";
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
 * A legal document composed the way the rest of the site composes: a hero, a
 * full-bleed hairline strip of facts, then the document itself.
 *
 * The previous version put a bordered metadata card in a right rail. Three
 * things were wrong with it. It carried more visual weight than the legal text
 * it annotated — fill, border, internal rules and a nested button, against
 * plain prose. It stranded ~630px between the end of the measure and the start
 * of the card, because a measure-wide column and a far-right card are two
 * objects, not a composition. And it was a component this design system does
 * not otherwise use: every other page states document facts in a `hairline-grid`
 * strip (see /investors), which is what this now does.
 *
 * The contents rail is gone too. These documents have one and two parts; a
 * table of contents for two items is furniture, not navigation.
 *
 * Each section is a row of two columns — the number and heading on the left,
 * the prose on the right — so the left column is occupied at every scroll
 * position instead of being a rail that runs out. The heading sticks through
 * its own section, which is what keeps a long clause list oriented.
 */
export function LegalArticle({ page }: { page: LegalPage }) {
  const companion = legalPages.find((doc) => doc.slug !== page.slug);
  const numbered = page.sections.length > 1;

  const facts = [
    { icon: Building2, label: "Published by", value: siteConfig.legalName },
    { icon: CalendarDays, label: "Last updated", value: page.updated ?? "Not stated" },
    { icon: ShieldCheck, label: "Regulatory status", value: "RBI-approved money changer" },
  ];

  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Legal</Eyebrow>
              <h1 className="display-lg mt-5 text-balance">{page.title}</h1>
            </div>
            {page.intro ? (
              <p className="text-lg leading-8 text-ink-soft lg:pb-2">{page.intro}</p>
            ) : null}
          </div>
        </Reveal>

        {/* The document's facts, stated the way every other page on the site
            states facts. Replaces a bordered card in a right rail. */}
        <dl className="hairline-grid mt-12 sm:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.07} className="hairline-cell p-6">
              <dt className="label-micro flex items-center gap-2 text-ink-soft">
                <fact.icon className="size-4 shrink-0 text-brand-deep" aria-hidden />
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold tracking-tight">{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-page gutter pt-16 pb-16 lg:pt-20 lg:pb-20">
        {/* Anchored to the page grid, not centred: the heading column starts
            on the same line as the eyebrow, the h1 and the facts strip above.
            Full-width chrome sets the page width; the document is a reading
            block hung off the same left edge. */}
        <div>
          {page.sections.map((section, index) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className={
                index === 0
                  ? "scroll-mt-28"
                  : "mt-14 scroll-mt-28 max-w-[calc(20rem+42rem+3rem)] border-t border-hairline pt-14"
              }
            >
              <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,42rem)] lg:gap-12">
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                  {numbered ? (
                    <p className="label-micro tnum text-brand-deep">
                      Section {String(index + 1).padStart(2, "0")}
                    </p>
                  ) : null}
                  <h2 className={`display-sm text-balance ${numbered ? "mt-3" : ""}`}>
                    {section.heading}
                  </h2>
                </Reveal>

                <div className="flex min-w-0 flex-col gap-4">
                  {section.blocks.map((block, blockIndex) =>
                    block.type === "paragraph" ? (
                      <Reveal key={blockIndex}>
                        <p className="measure text-base leading-7 text-ink-soft">{block.text}</p>
                      </Reveal>
                    ) : block.type === "clauses" ? (
                      // Verbatim contract clauses, numbered so they can be
                      // cited — the source publishes them as one long block.
                      <ol key={blockIndex} className="flex flex-col">
                        {block.items.map((clause, clauseIndex) => (
                          <li
                            key={clause.slice(0, 60)}
                            className="grid grid-cols-[2.25rem_1fr] border-t border-hairline py-5 first:border-t-0 first:pt-0"
                          >
                            <span className="tnum pt-1 text-xs font-semibold text-brand-deep">
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
              </div>
            </section>
          ))}

          {/* Closing strip, inline rather than boxed: where to take a question,
              and the other document. A card here would end the page on the
              heaviest object on it. */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid max-w-[calc(20rem+42rem+3rem)] gap-6 border-t border-hairline pt-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
              <p className="text-sm font-semibold">Questions about this policy?</p>
              <div className="flex flex-col gap-x-8 gap-y-1 sm:flex-row sm:flex-wrap sm:items-center">
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
                {companion ? (
                  <Link
                    href={`/${companion.slug}`}
                    className="group/doc flex min-h-11 items-center gap-2 text-sm font-medium text-brand-deep transition-colors hover:text-ink sm:ml-auto"
                  >
                    Read the {companion.title}
                    <ArrowRight
                      className="size-4 shrink-0 transition-transform duration-300 group-hover/doc:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
