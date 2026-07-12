// `next/image` with `unoptimized` (our static export) does NOT prefix the
// configured `basePath` onto a local image `src`, so a bare "/logo.png" 404s
// when the site is served from a project subpath (e.g. GitHub Pages at
// /FinwaveForex/). Prefix such asset paths manually. `NEXT_PUBLIC_*` is inlined
// at build time, so this resolves to "" locally and "/FinwaveForex" in CI.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
