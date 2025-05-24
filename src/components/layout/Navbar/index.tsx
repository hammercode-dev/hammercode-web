"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { LINKS } from "./constant";
import LocaleToggle from "../../common/LocaleToggle";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DesktopUserMenu, MobileUserMenu } from "./UserMenu";
// import AnnouncementLayout from "@/components/layout/AnnouncementLayout";

const Navbar = () => {
  const t = useTranslations("Layout");
  const { user, isAuthenticated } = useAuthUser();
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* <AnnouncementLayout /> */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto px-5 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/icons/ic_hmc-light.svg"
                alt="HMC Light"
                width={40}
                height={40}
                className="w-7 md:w-10 dark:hidden"
              />
              <Image
                src="/assets/icons/ic_hmc-dark.svg"
                alt="HMC Dark"
                width={40}
                height={40}
                className="hidden w-7 md:w-10 dark:inline"
              />
              <Image
                src="/assets/icons/ic_hmc-text-light.svg"
                alt="HMC Light"
                width={160}
                height={18}
                className="inline w-28 sm:w-32 lg:w-40 dark:hidden"
              />
              <Image
                src="/assets/icons/ic_hmc-text-dark.svg"
                alt="HMC Dark"
                width={160}
                height={18}
                className="hidden w-28 sm:w-32 lg:w-40 dark:inline"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden items-center gap-7 lg:flex">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} />
              ))}

              <div className="flex items-center gap-3">
                <LocaleToggle />
                <ThemeToggle />

                {/* Desktop User Menu */}
                <DesktopUserMenu user={user} isAuthenticated={isAuthenticated} logout={logout} t={t} />
              </div>
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <LocaleToggle />
              <ThemeToggle />

              {/* Mobile Menu Trigger */}
              <Button
                className="p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`transition-all duration-300 ease-in-out lg:hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0"
            }`}
          >
            <div className="mx-auto mt-5 w-full space-y-6">
              <nav className="flex flex-col gap-7">
                {LINKS.map(({ href, id }) => (
                  <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} onClick={() => setIsOpen(false)} />
                ))}
              </nav>

              {/* Mobile User Menu */}
              <MobileUserMenu user={user} isAuthenticated={isAuthenticated} logout={logout} t={t} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
