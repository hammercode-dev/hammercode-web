import { useState } from "react";
import { Link } from "@/lib/navigation";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useTranslations } from "next-intl";
import LocaleToggle from "../../common/LocaleToggle";
import { LINKS } from "./constant";

// import AnnouncementLayout from "@/components/layout/AnnouncementLayout";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const t = useTranslations("Layout");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full">
      {/* <AnnouncementLayout /> */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto py-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/icons/ic_hmc-light.svg"
                alt="HMC Light"
                width={40}
                height={40}
                className="dark:hidden"
              />
              <Image
                src="/assets/icons/ic_hmc-dark.svg"
                alt="HMC Dark"
                width={40}
                height={40}
                className="hidden dark:inline"
              />
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

            <nav className="hidden items-center gap-7 md:flex">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} />
              ))}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </nav>

            <Button
              className="p-2 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out md:hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0"
            }`}
          >
            <div className="container mx-auto space-y-4 px-4 pt-4">
              <nav className="flex flex-col items-center gap-4">
                {LINKS.map(({ href, id }) => (
                  <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} onClick={() => setIsOpen(false)} />
                ))}
              </nav>
              <div className="flex items-center justify-center gap-2">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
