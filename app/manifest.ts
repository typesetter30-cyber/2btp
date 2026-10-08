import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Технологии Бизнеса",
    short_name: "2btp",
    description: "Бухгалтерия, ипотека, страхование, платежи, оценка и юридические услуги.",
    start_url: "/",
    display: "standalone",
    lang: "ru",
    background_color: "#f3f0ea",
    theme_color: "#f3f0ea",
    icons: [
      { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
