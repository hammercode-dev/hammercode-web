import { Link } from "@/lib/navigation";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useTranslations } from "next-intl";
import LocaleToggle from "../../common/LocaleToggle";
import { LINKS } from "./constant";

// import AnnouncementLayout from "@/components/layout/AnnouncementLayout";
import Sidebar from "../Sidebar";
import Image from "next/image";

const Navbar = () => {
  const t = useTranslations("Layout");
  return (
    <header className="fixed top-0 z-50 w-full">
      {/* <AnnouncementLayout /> */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto py-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-10 bg-[url('/assets/icons/ic_hmc-light.svg')] bg-cover bg-center dark:bg-[url('/assets/icons/ic_hmc-dark.svg')]"></div>
              <Image
                src="/assets/icons/ic_hmc-text-light.svg"
                alt="HMC Light"
                width={160}
                height={18}
                className="light:inline w-32 transition-opacity duration-300 lg:w-40 dark:hidden"
              />
              <Image
                src="/assets/icons/ic_hmc-text-dark.svg"
                alt="HMC Dark"
                width={160}
                height={18}
                className="hidden w-32 transition-opacity duration-300 lg:w-40 dark:inline"
              />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} />
              ))}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </nav>
            <div className="flex lg:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
