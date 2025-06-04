import { createNavigation } from "next-intl/navigation";
import { routing } from "../routing";

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);

export { default as NavLink } from "./NavLink";
export * from "./types";
