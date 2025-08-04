import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

import { Calendar1, User } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { Link } from "@/lib/navigation";

const user = {
  name: "Putra Satria",
  image: "",
  fallback: "PS",
};

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-5 pt-24 pb-28">
      <div className="grid grid-cols-5 gap-8">
        <aside className="fixed right-0 bottom-0 left-0 col-span-1 mt-8 flex w-full flex-col justify-between gap-4 self-start rounded-lg bg-white lg:sticky lg:top-24 lg:flex-col lg:justify-start lg:bg-transparent dark:bg-slate-950">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-muted-foreground text-sm">Hi</p>
              <p className="font-semibold">{user.name}</p>
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

        <div className="col-span-4">{children}</div>
      </div>
    </section>
  );
}
