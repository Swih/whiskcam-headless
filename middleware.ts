import { NextRequest, NextResponse } from "next/server";

/**
 * Detect visitor country from Vercel geo headers and store in cookie.
 * Shopify Storefront API uses this via @inContext(country:) to return
 * localized prices (USD for US, GBP for UK, EUR for EU, etc.)
 */
export function middleware(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    "FR"; // Default to France (primary market)

  const response = NextResponse.next();

  // Only set cookie if it changed (avoid unnecessary Set-Cookie headers)
  const current = request.cookies.get("country")?.value;
  if (current !== country) {
    response.cookies.set("country", country, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return response;
}

export const config = {
  // Run on all pages except static assets and API routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon|manifest.json|images|videos|.*\\.txt$).*)"],
};
