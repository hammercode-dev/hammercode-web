"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

import { Calendar1, User } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { Link } from "@/lib/navigation";
import { useAuthUser } from "@/components/hooks/UseAuthUser";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const { user } = useAuthUser();

  return (
    <ProtectedRoute>
      <section className="container mx-auto px-5 pt-24 pb-28">
        <div className="grid grid-cols-5 gap-8">
          <aside className="mt-8 hidden w-full flex-col justify-between gap-4 self-start rounded-lg lg:sticky lg:top-24 lg:col-span-1 lg:flex lg:flex-col lg:justify-start lg:bg-transparent">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt="profile" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-muted-foreground text-sm">Hello</p>
                <p className="font-semibold">{user?.username}</p>
              </div>
            </div>

            <Separator />

            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/my-events" className="flex items-center gap-2 text-gray-800 transition hover:text-blue-600">
                <Calendar1 size={16} /> My Events
              </Link>
              <Link href="/profile" className="flex items-center gap-2 text-gray-800 transition hover:text-blue-600">
                <User size={16} /> Profil
              </Link>
            </nav>
          </aside>

          <div className="col-span-5 lg:col-span-4">{children}</div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
