"use client";
import { Link } from "@/lib/navigation";
import { ComponentProps } from "react";
import { pathnames } from "@/lib/navigation/config";
import { usePathname } from "next/navigation";

export type NavLinkProps<Pathname extends keyof typeof pathnames> = ComponentProps<typeof Link<Pathname>>;

function NavLink<Pathname extends keyof typeof pathnames>({ href, onClick, ...rest }: NavLinkProps<Pathname>) {
  const path = usePathname();
  return (
    <Link href={href} onClick={onClick}>
      <span
        className={path?.includes(href as string) ? "text-hmc-base-blue" : "text-hmc-base-darkblue dark:text-white"}
      >
        {rest.title}
      </span>
    </Link>
  );
}

export default NavLink;
