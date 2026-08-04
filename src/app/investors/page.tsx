import { Fragment } from "react";
import { ArrowDownToLine, Building2, FileText, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";
import { financialReports, formatFileSize } from "@/content/investors";
import { siteConfig } from "@/content/site";
import { asset } from "@/lib/base-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Investors",
  description:
    "Annual financial reports for Finwave Forex Pvt. Ltd., an RBI-approved money changer based in Ahmedabad.",
  path: "/investors",
});

const disclosures = [
  { icon: Building2, label: "Registered entity", value: siteConfig.legalName },
  { icon: ShieldCheck, label: "Regulatory status", value: "RBI-approved money changer" },
  {
    icon: FileText,
    label: "Reports published",
    value: `${financialReports.length} financial years`,
  },
];

export default function InvestorsPage() {
  return (
    <>
      <section className="mx-auto max-w-page gutter pt-28 lg:pt-36">
        <Breadcrumb trail={[{ label: "Investors" }]} />
        <SectionHeading
          as="h1"
          layout="split"
          lines={[
            <Fragment key="l1">Financial reports,</Fragment>,
            <Fragment key="l2">
              published <Em>in full.</Em>
            </Fragment>,
          ]}
          sub="Annual accounts for Finwave Forex Pvt. Ltd. Download any year as a PDF, or write to us for anything not published here."
        />

        <dl className="hairline-grid mt-12 sm:grid-cols-3">
          {disclosures.map((row, index) => (
            <Reveal key={row.label} delay={index * 0.07} className="hairline-cell p-6">
              <dt className="flex items-center gap-2 label-micro text-ink-soft">
                <row.icon className="size-4 shrink-0 text-brand-deep" aria-hidden />
                {row.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold tracking-tight">{row.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Section>
        {/* One rank of equal cards, not a 1390x160 hero slab with 700px of
            void in its middle and two half-empty rows beneath it. The year
            carries the weight, so each card is full rather than a label
            stranded opposite a button. */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {financialReports.map((report, index) => (
            <li key={report.year}>
              <Reveal delay={index * 0.08} className="h-full">
                <a
                  href={asset(report.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/report shadow-card flex h-full flex-col rounded-2xl border border-hairline bg-canvas p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-rich-lg focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="label-micro text-brand-deep">
                      {index === 0 ? "Latest report" : "Annual report"}
                    </span>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover/report:bg-brand group-hover/report:text-ink">
                      <FileText className="size-5" aria-hidden />
                    </span>
                  </div>

                  <p className="display-stat mt-6">{report.year}</p>
                  <p className="mt-2 text-sm text-ink-soft">Financial year</p>

                  <span className="mt-7 flex items-center justify-between gap-4 border-t border-hairline pt-5 text-sm font-semibold">
                    <span className="text-brand-deep">
                      Download
                      <span className="sr-only"> the {report.year} financial report</span>
                    </span>
                    <span className="flex items-center gap-2 font-normal text-ink-soft">
                      PDF · {formatFileSize(report.size)}
                      <ArrowDownToLine
                        className="size-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover/report:translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        lines={[
          <Fragment key="l1">Need something</Fragment>,
          <Fragment key="l2">
            not <Em tone="dark">published here?</Em>
          </Fragment>,
        ]}
        body="Write to us or call the office and we'll point you to the right document or person."
      />
    </>
  );
}
