import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { pathnames, localePrefix } from "./config";
import { locales } from "../locales";

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

export { default as NavLink } from "./NavLink";
export * from "./types";
