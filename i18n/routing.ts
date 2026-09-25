import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "de", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // An explicit URL wins over geolocation, Accept-Language and old cookies.
  // Visitors can still choose their language using the language switcher.
  localeDetection: false,
  // Metadata + sitemap declare only real translations. Automatic HTTP Link
  // headers would incorrectly advertise translated versions of English articles.
  alternateLinks: false,
});
