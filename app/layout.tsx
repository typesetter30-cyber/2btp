import type { Metadata, Viewport } from "next";
import { Golos_Text, Onest } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MobileDock } from "@/components/site/MobileDock";
import { ConsultProvider } from "@/components/site/Consult";
import { JsonLd } from "@/components/site/JsonLd";
import { company } from "@/lib/site";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const sans = Golos_Text({
  subsets: ["cyrillic", "latin"],
  variable: "--font-golos",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const display = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-onest",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: company.legalName,
  url: "https://2btp.ru/",
  logo: "https://2btp.ru/brand/logo.png",
  image: "https://2btp.ru/brand/logo.png",
  telephone: "+7-383-210-55-54",
  email: company.email,
  taxID: company.inn,
  foundingDate: String(company.startYear),
  address: {
    "@type": "PostalAddress",
    postalCode: "630099",
    addressLocality: "Новосибирск",
    streetAddress: "ул. Каменская, д. 58",
    addressCountry: "RU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [company.telegram, company.vk, company.ok, company.yandexMaps, company.twoGis],
  areaServed: "RU",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body>
        <div className="bg-decor" aria-hidden="true" />
        <JsonLd data={organization} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          К содержанию
        </a>
        <ConsultProvider>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <MobileDock />
        </ConsultProvider>
      </body>
    </html>
  );
}
