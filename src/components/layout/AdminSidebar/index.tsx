"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/Sidebar";
import { SIDEBAR_NAV } from "./constant";
import { DesktopUserMenu } from "../Navbar/UserMenu";

export default function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-2">
        <Link href="/" className="flex items-center gap-2 p-2">
          <Image
            src="/assets/icons/ic_hmc-light.svg"
            alt="HMC Light"
            width={32}
            height={32}
            className="w-6 md:w-8 dark:hidden"
          />
          <Image
            src="/assets/icons/ic_hmc-dark.svg"
            alt="HMC Dark"
            width={32}
            height={32}
            className="hidden w-6 md:w-8 dark:inline"
          />
          <Image
            src="/assets/icons/ic_hmc-text-light.svg"
            alt="HMC Light"
            width={128}
            height={12}
            className="inline w-20 sm:w-24 lg:w-32 dark:hidden"
          />
          <Image
            src="/assets/icons/ic_hmc-text-dark.svg"
            alt="HMC Dark"
            width={128}
            height={12}
            className="hidden w-20 sm:w-24 lg:w-32 dark:inline"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_NAV.map((navGroup) => (
          <SidebarGroup key={navGroup.label}>
            <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navGroup.items.map((navItem) => (
                  <SidebarMenuItem key={navItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.includes("/dashboard" + navItem.url)}
                      className="data-[active=true]:bg-hmc-primary data-[active=true]:text-white"
                    >
                      <Link href={"/admin" + navItem.url}>{navItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <DesktopUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
