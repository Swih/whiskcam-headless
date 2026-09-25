import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "FR";

  // Currency/market detection is independent of the language in the URL.
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
