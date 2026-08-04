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
  const [latest, ...archive] = financialReports;

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
        {/* Latest year leads; earlier years sit beneath as an archive. */}
        <Reveal>
          <a
            href={asset(latest.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="group shadow-card flex flex-col gap-6 rounded-2xl border border-hairline bg-white p-8 ring-1 ring-brand/20 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-rich-lg focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between lg:p-10"
          >
            <div className="flex items-start gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-ink transition-transform duration-300 group-hover:-rotate-6">
                <FileText className="size-6" aria-hidden />
              </span>
              <div>
                <p className="label-micro text-brand-deep">
                  Latest report
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
                  Financial Year {latest.year}
                </h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  PDF · {formatFileSize(latest.size)} · opens in a new tab
                </p>
              </div>
            </div>
            <span className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
              <ArrowDownToLine className="size-4" aria-hidden />
              Download
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-14 label-micro text-ink-soft">
            Earlier years
          </h2>
        </Reveal>
        <ul className="hairline-grid mt-6 sm:grid-cols-2">
          {archive.map((report, index) => (
            <li key={report.year}>
              <Reveal delay={index * 0.08} className="h-full">
                <a
                  href={asset(report.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row hairline-cell flex h-full items-center justify-between gap-5 p-6 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-deep ring-1 ring-brand/20 transition-colors duration-300 group-hover/row:bg-brand group-hover/row:text-ink">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold tracking-tight">
                        Financial Year {report.year}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-soft">
                        PDF · {formatFileSize(report.size)}
                      </span>
                    </span>
                  </span>
                  <ArrowDownToLine
                    className="size-5 shrink-0 text-brand-deep transition-transform duration-300 group-hover/row:translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </Reveal>
            </li>
          ))}
          {archive.length % 2 === 1 ? (
            <li className="hairline-cell hidden sm:block" aria-hidden />
          ) : null}
        </ul>

        <Reveal delay={0.15}>
          <p className="measure mt-8 text-sm text-ink-soft">
            Looking for something else? Write to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block py-1 font-medium text-brand-deep underline underline-offset-4 transition-colors hover:text-ink"
            >
              {siteConfig.email}
            </a>{" "}
            or call {siteConfig.phone}.
          </p>
        </Reveal>
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
