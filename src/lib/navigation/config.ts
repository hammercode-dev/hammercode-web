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
  "/blogs": {
    en: "/blogs",
    id: "/blogs",
  },
  "/support-us": {
    en: "/support-us",
    id: "/support-us",
  },
  "/my-events": {
    en: "/my-events",
    id: "/my-events",
  },
  "/my-blogs": {
    en: "/my-blogs",
    id: "/my-blogs",
  },
} satisfies Pathnames<Locales>;
