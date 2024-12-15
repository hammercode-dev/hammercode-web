import { Link } from "@/lib/navigation";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useTranslations } from "next-intl";
import LocaleToggle from "../../common/LocaleToggle";
import { LINKS } from "./constant";

import AnnouncementLayout from "@/components/layout/AnnouncementLayout";
import Sidebar from "../Sidebar";
import IconHmcTextLight from "@/components/icon/IconHmcTextLight";
import IconHmcTextDark from "@/components/icon/IconHmcTextDark";

const Navbar = () => {
  const t = useTranslations("Layout");
  return (
    <header className="sticky w-full z-50 top-0">
      <AnnouncementLayout />
      <div className="border-b  bg-white dark:bg-slate-950">
        <div className="container mx-auto py-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-8 bg-[url('/assets/icons/ic_hmc-light.svg')] dark:bg-[url('/assets/icons/ic_hmc-dark.svg')] bg-cover bg-center"></div>
              <IconHmcTextLight className="lg:w-40 w-32 light:inline dark:hidden transition-opacity duration-300" />
              <IconHmcTextDark className="lg:w-40 w-32 hidden dark:inline transition-opacity duration-300" />
            </Link>

            <nav className="lg:flex items-center gap-7 hidden">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} />
              ))}
              <div className="flex gap-2 items-center">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </nav>
            <div className="lg:hidden flex">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
