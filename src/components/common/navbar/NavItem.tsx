import { Link } from "@/lib/navigation";
import { ComponentProps } from "react";
import { pathnames } from "@/lib/config";

export type NavbarListProps<Pathname extends keyof typeof pathnames> = ComponentProps<typeof Link<Pathname>>;

function NavItem<Pathname extends keyof typeof pathnames>({ href, onClick, ...rest }: NavbarListProps<Pathname>) {
  return (
    <Link href={href} onClick={onClick}>
      <span>{rest.title}</span>
    </Link>
  );
}

export default NavItem;
