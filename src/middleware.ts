import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "id"] as const;
type Locale = (typeof locales)[number];

export default async function middleware(request: NextRequest) {
  const headerLocale = request.headers.get("x-next-intl-locale");

  const defaultLocale: Locale = locales.includes(headerLocale as Locale) ? (headerLocale as Locale) : "id";

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
    alternateLinks: false,
  });

  const response = handleI18nRouting(request);
  response.headers.set("x-next-intl-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
