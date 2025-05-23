"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { LINKS } from "./constant";
import LocaleToggle from "../../common/LocaleToggle";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
// import AnnouncementLayout from "@/components/layout/AnnouncementLayout";

const Navbar = () => {
  const t = useTranslations("Layout");
  const { logout } = useAuth();
  const { user, isAuthenticated } = useAuthUser();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

            {/* Desktop Menu */}
            <nav className="hidden items-center gap-7 md:flex">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} />
              ))}

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LocaleToggle />
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {!isAuthenticated ? (
                  <Button size="sm">
                    <Link href="/sign-in">{t("navbar.sign-in")}</Link>
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="flex items-center gap-2">
                        {user?.username} <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href="/profile">{t("navbar.profile")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        <span className="text-destructive hover:text-destructive/80">{t("navbar.sign-out")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </motion.div>
            </nav>

            {/* Mobile Menu Trigger */}
            <Button
              className="p-2 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Menu */}
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
