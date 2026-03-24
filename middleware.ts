import { NextRequest, NextResponse } from "next/server";

/**
 * Francophone countries — visitors from these get French by default.
 */
const FRENCH_COUNTRIES = new Set([
  "FR", "BE", "CH", "LU", "MC", // Western Europe
  "CI", "SN", "ML", "BF", "GN", "TG", "BJ", "GA", "CG", "CM", "MG",
  "CD", "NE", "TD", "CF", "GQ", "RW", "BI", "DJ", "KM", "MU", "SC",
]);

/**
 * Detect locale from:
 * 1. Explicit user preference cookie (wk-locale) — highest priority
 * 2. Country header (Vercel geo) — francophone countries → fr
 * 3. Accept-Language header
 * 4. Default → en
 */
function detectLocale(request: NextRequest, country: string): string {
  const explicit = request.cookies.get("wk-locale")?.value;
  if (explicit === "fr" || explicit === "en") return explicit;

  if (FRENCH_COUNTRIES.has(country)) return "fr";

  const acceptLang = request.headers.get("accept-language") ?? "";
  if (acceptLang.toLowerCase().startsWith("fr")) return "fr";

  return "en";
}

/**
 * Detect visitor country from Vercel geo headers and store in cookie.
 * Shopify Storefront API uses this via @inContext(country:) to return
 * localized prices (USD for US, GBP for UK, EUR for EU, etc.)
 *
 * Also detects locale and auto-sets wk-locale cookie on first visit.
 */
export function middleware(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    "FR"; // Default to France (primary market)

  const locale = detectLocale(request, country);

  const response = NextResponse.next();

  // Set country cookie if changed
  const currentCountry = request.cookies.get("country")?.value;
  if (currentCountry !== country) {
    response.cookies.set("country", country, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  // Auto-set locale cookie on first visit (only if not already explicitly set by user)
  const currentLocale = request.cookies.get("wk-locale")?.value;
  if (!currentLocale) {
    response.cookies.set("wk-locale", locale, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  // Run on all pages except static assets and API routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon|manifest.json|images|videos|.*\\.txt$).*)"],
};
