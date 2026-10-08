import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/payment/success", "/payment/fail"],
    },
    sitemap: "https://2btp.ru/sitemap.xml",
    host: "https://2btp.ru",
  };
}
