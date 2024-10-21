import { NavbarListProps } from "./NavItem";
import { ValidPathnames } from "./type";

export const LINKS: NavbarListProps<ValidPathnames>[] = [
  {
    id: "1",
    href: "/about",
  },
  {
    id: "2",
    href: "/events",
  },
];
