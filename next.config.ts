import type { NextConfig } from "next";

const legacyIndex: Array<[string, string]> = [
  ["/", "/index.php"],
  ["/contacts/", "/contacts/index.php"],
  ["/strahovanie/", "/strahovanie/index.php"],
  ["/strahovanie/ipoteka-strahovanie-online/", "/strahovanie/ipoteka-strahovanie-online/index.php"],
  ["/strahovanie/osago-online/", "/strahovanie/osago-online/index.php"],
  ["/strahovanie/strahovanie-kvartiry-online/", "/strahovanie/strahovanie-kvartiry-online/index.php"],
  ["/strahovanie/strakhovanie-puteshestvennikov/", "/strahovanie/strakhovanie-puteshestvennikov/index.php"],
  ["/operator-po-priemu-platezhey/", "/operator-po-priemu-platezhey/index.php"],
  ["/ocenka-nedvizhimosti/", "/ocenka-nedvizhimosti/index.php"],
  ["/yuridicheskie-uslugi/", "/yuridicheskie-uslugi/index.php"],
  ["/payment/", "/payment/index.php"],
  ["/politika-konfidencialnosti/", "/politika-konfidencialnosti/index.php"],
  ["/obrabotka-personalnyh-dannyh/", "/obrabotka-personalnyh-dannyh/index.php"],
  ["/payment/success/", "/payment/success_url.php"],
  ["/payment/success/", "/payment/success_url.html"],
  ["/payment/fail/", "/payment/fail_url.php"],
  ["/payment/fail/", "/payment/fail_url.html"],
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["nodemailer"],
  async redirects() {
    return legacyIndex.map(([destination, source]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
