"use client";
import { FC, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import NavLink from "../../../lib/navigation/NavLink";
import { ThemeToggle } from "../ThemeToggle";
import LocaleToggle from "../LocaleToggle";
import { LINKS } from "../../layout/Navbar/constant";

const Sidebar: FC = () => {
  const t = useTranslations("Layout");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="border rounded-sm p-2">
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="top" className="w-screen">
        <SheetHeader>
          <SheetTitle className="flex justify-center ml-2">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-8 bg-[url('/assets/icons/ic_hmc-light.svg')] dark:bg-[url('/assets/icons/ic_hmc-dark.svg')] bg-cover bg-center"></div>
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="flex flex-col items-center gap-4 mt-2">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} onClick={() => setIsOpen(false)} />
              ))}
              <div className="flex gap-2 items-center">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;
