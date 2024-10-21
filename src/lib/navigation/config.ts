import { Pathnames, LocalePrefix } from "next-intl/routing";
import { Locales } from "../locales";

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/about": {
    en: "/about",
    id: "/about",
  },
  "/events": {
    en: "/events",
    id: "/events",
  },
  "/contact": {
    en: "/contact",
    id: "/contact",
  },
} satisfies Pathnames<Locales>;

export const localePrefix: LocalePrefix<Locales> = "as-needed" satisfies LocalePrefix;
