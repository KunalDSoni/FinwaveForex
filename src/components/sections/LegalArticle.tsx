import type { LegalPage } from "@/content/legal";

export function LegalArticle({ page }: { page: LegalPage }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:pt-44">
      <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] sm:text-4xl">{page.title}</h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated: {page.updated}</p>
      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading} className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="mt-3 leading-7 text-ink-soft">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
