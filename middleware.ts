import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const FRENCH_COUNTRIES = new Set([
  "FR", "BE", "CH", "LU", "MC",
  "CI", "SN", "ML", "BF", "GN", "TG", "BJ", "GA", "CG", "CM", "MG",
  "CD", "NE", "TD", "CF", "GQ", "RW", "BI", "DJ", "KM", "MU", "SC",
]);

const GERMAN_COUNTRIES = new Set(["DE", "AT"]);
const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "AR", "CO", "CL", "PE", "EC", "GT", "CU", "BO",
  "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "VE",
]);

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "FR";

  // Auto-detect locale from country on first visit (no NEXT_LOCALE cookie yet)
  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");
  if (!hasLocaleCookie) {
    let detectedLocale = "en";
    if (FRENCH_COUNTRIES.has(country)) detectedLocale = "fr";
    else if (GERMAN_COUNTRIES.has(country)) detectedLocale = "de";
    else if (SPANISH_COUNTRIES.has(country)) detectedLocale = "es";

    // Set cookie so next-intl middleware picks it up
    request.cookies.set("NEXT_LOCALE", detectedLocale);
  }

  const response = intlMiddleware(request);

  // Set country cookie for Shopify @inContext pricing
  const currentCountry = request.cookies.get("country")?.value;
  if (currentCountry !== country) {
    response.cookies.set("country", country, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 86400,
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Exclude static assets, API routes, and SEO/discovery files (robots.txt,
    // sitemap.xml, OpenGraph images) so they aren't locale-redirected. A 307
    // on /sitemap.xml broke Googlebot crawling — every bot was forced to a
    // /<locale>/sitemap.xml URL that does not exist as a route.
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon|manifest.json|images|videos|api|opengraph-image|sitemap\\.xml$|.*\\.txt$|.*\\.xml$).*)",
  ],
};
