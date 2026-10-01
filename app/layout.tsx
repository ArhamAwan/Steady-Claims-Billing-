import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Steady Claims Billing — Medical Billing & Revenue Cycle Support",
    template: "%s | Steady Claims Billing",
  },
  description:
    "Steady Claims Billing helps healthcare providers manage medical billing from claim submission through payment follow-up: revenue cycle management, denial management, insurance verification, AR follow-up, coding support, and credentialing.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  verification: {
    other: {
      "facebook-domain-verification": "96hry4knrpd54u3o3o8o7qauka6n9r",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  telephone: "+1-702-415-1750",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.regionShort,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <MetaPixel />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
