"use client";
import { Link } from "@/lib/navigation";
import { usePathname } from "next/navigation";

function NavLink({ href, onClick, title }: { href: string; onClick?: () => void; title: string }) {
  const path = usePathname();
  return (
    <Link href={href} onClick={onClick}>
      <span
        className={path?.includes(href as string) ? "text-hmc-base-blue" : "text-hmc-base-darkblue dark:text-white"}
      >
        {title}
      </span>
    </Link>
  );
}

export default NavLink;
