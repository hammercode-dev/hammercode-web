import { Link } from "@/lib/navigation";
import { ComponentProps } from "react";
import { pathnames } from "@/lib/navigation/config";

export type NavLinkProps<Pathname extends keyof typeof pathnames> = ComponentProps<typeof Link<Pathname>>;

function NavLink<Pathname extends keyof typeof pathnames>({ href, onClick, ...rest }: NavLinkProps<Pathname>) {
  return (
    <Link href={href} onClick={onClick}>
      <span>{rest.title}</span>
    </Link>
  );
}

export default NavLink;
