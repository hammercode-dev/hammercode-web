import { defineRouting } from "next-intl/routing";
import { pathnames } from "./navigation/config";
import { locales, defaultLocale } from "./locales";

export const routing = defineRouting({
  pathnames,
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
