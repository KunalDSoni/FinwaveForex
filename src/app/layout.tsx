import type { Metadata } from "next";
import { Fragment_Mono, Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/content/site";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

// Editorial display face for headlines and the italic accent. Hanken keeps the
// body copy; the pairing is what gives the page its financial-press authority.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Finwave Forex: RBI-Approved Money Changers",
    template: "%s - Finwave Forex",
  },
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable} ${fragmentMono.variable}`}>
      <body className="font-sans">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <JsonLd />
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
