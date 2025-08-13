import RouteBreadcrumb from "@/components/common/RouteBreadcrumb";
import AdminSidebar from "@/components/layout/AdminSidebar";

import { Separator } from "@/components/ui/Separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProtectedRoute requiredRole="admin">
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
      </ProtectedRoute>
    </SidebarProvider>
  );
}
