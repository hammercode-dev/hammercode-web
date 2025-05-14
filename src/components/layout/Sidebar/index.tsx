"use client";
import { FC, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import LocaleToggle from "@/components/common/LocaleToggle";

import NavLink from "../../../lib/navigation/NavLink";
import { LINKS } from "../../layout/Navbar/constant";

const Sidebar: FC = () => {
  const t = useTranslations("Layout");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="rounded-sm border p-2">
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="top" className="w-screen">
        <SheetHeader>
          <SheetTitle className="ml-2 flex justify-center">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="h-8 w-10 bg-[url('/assets/icons/ic_hmc-light.svg')] bg-cover bg-center dark:bg-[url('/assets/icons/ic_hmc-dark.svg')]"></div>
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="mt-2 flex flex-col items-center gap-4">
              {LINKS.map(({ href, id }) => (
                <NavLink key={id} href={href} title={t(`navbar.link-${id}`)} onClick={() => setIsOpen(false)} />
              ))}
              <div className="flex items-center gap-2">
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
