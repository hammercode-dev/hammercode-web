import { Pathnames } from "next-intl/routing";
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
  "/testimonial": {
    en: "/testimonial",
    id: "/testimonial",
  },
  "/support-us": {
    en: "/support-us",
    id: "/support-us",
  },
} satisfies Pathnames<Locales>;
