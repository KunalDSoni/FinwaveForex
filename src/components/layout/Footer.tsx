import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = siteConfig;

  return (
    <footer className="border-t border-hairline bg-sand/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Finwave <span className="text-brand">Forex</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">{siteConfig.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold tracking-widest text-ink-soft uppercase">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-ink-soft uppercase">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 transition-colors hover:text-ink">
                  <Phone className="size-4 shrink-0 text-brand" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 transition-colors hover:text-ink">
                  <Mail className="size-4 shrink-0 text-brand" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <address className="not-italic">
                  {address.line1}, {address.line2},
                  <br />
                  {address.city} — {address.postalCode}
                </address>
              </li>
            </ul>
          </div>
          <nav aria-label="Legal">
            <h2 className="text-xs font-semibold tracking-widest text-ink-soft uppercase">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          aria-hidden
          className="mt-16 text-center text-[clamp(3rem,11vw,8.5rem)] leading-none font-semibold tracking-tighter text-ink/5 select-none after:content-['Finwave_Forex']"
        />
        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} All rights reserved.
          </p>
          <p>RBI-approved money changers.</p>
        </div>
      </div>
    </footer>
  );
}
