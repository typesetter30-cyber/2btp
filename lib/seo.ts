import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, company } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, noIndex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      locale: "ru_RU",
      type: "website",
      images: [{ url: "/brand/logo.png", alt: company.legalName }],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Услуги для бизнеса и физических лиц | Технологии Бизнеса",
    template: "%s",
  },
  description:
    "Бухгалтерия, ипотека, страхование, приём платежей, оценка недвижимости и юридические услуги. ООО «Технологии Бизнеса», Новосибирск.",
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
    images: [{ url: "/brand/logo.png", alt: company.legalName }],
  },
  formatDetection: { telephone: false, email: false, address: false },
};
