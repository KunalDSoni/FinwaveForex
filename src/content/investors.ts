export type FinancialReport = {
  /** Financial year label, e.g. "2023-24". */
  year: string;
  /** Path under /public. Files mirrored from the current finwaveforex.com. */
  file: string;
  /** Bytes, used for the download hint. Update if a file is replaced. */
  size: number;
};

/**
 * Newest first. Sourced from the live site's
 * /assets/document/financial_reports/ directory.
 */
export const financialReports: FinancialReport[] = [
  { year: "2023-24", file: "/reports/financial-2023-24.pdf", size: 1881129 },
  { year: "2022-23", file: "/reports/financial-2022-23.pdf", size: 369309 },
  { year: "2021-22", file: "/reports/financial-2021-22.pdf", size: 312655 },
];

export function formatFileSize(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}
