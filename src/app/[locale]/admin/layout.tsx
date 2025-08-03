"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import RouteBreadcrumb from "@/components/common/RouteBreadcrumb";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Separator } from "@/components/ui/Separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthUser();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      redirect("/");
    }
  }, [isLoading, user]);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <RouteBreadcrumb />
          </div>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
