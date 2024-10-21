import { NavLinkProps } from "../../../lib/navigation/NavLink";
import { ValidPathnames } from "../../../lib/navigation/types";

export const LINKS: NavLinkProps<ValidPathnames>[] = [
  {
    id: "1",
    href: "/about",
  },
  {
    id: "2",
    href: "/events",
  },
];
