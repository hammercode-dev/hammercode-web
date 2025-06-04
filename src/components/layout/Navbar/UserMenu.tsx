import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Link } from "@/lib/navigation";
import { User as UserType } from "@/types";
import { ChevronDown, User, X } from "lucide-react";

interface UserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  t: (key: string, values?: Record<string, string | number | Date> | undefined) => string;
  logout: () => void;
}

const DesktopUserMenu = ({ user, isAuthenticated, logout, t }: UserMenuProps) => {
  return !isAuthenticated ? (
    <Button asChild size="sm" className="w-full">
      <Link href="/sign-in">{t("navbar.sign-in")}</Link>
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex h-auto min-w-36 items-center gap-3 px-3 py-2.5">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full p-1">
            <User size={14} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm leading-none font-medium">{user?.username}</span>
          </div>
          <ChevronDown size={16} className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background space-y-1">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-3 p-3">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full p-1">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.username}</span>
              <span className="text-muted-foreground text-xs">{user?.email}</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <span className="text-destructive hover:text-destructive/80 flex cursor-pointer items-center gap-2">
            <X size={16} />
            {t("navbar.sign-out")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileUserMenu = ({ user, isAuthenticated, logout, t }: UserMenuProps) => {
  return (
    <div className="border-t pt-4">
      {!isAuthenticated ? (
        <Button asChild size="sm" className="w-full">
          <Link href="/sign-in">{t("navbar.sign-in")}</Link>
        </Button>
      ) : (
        <div className="space-y-3">
          <Link href="/profile" className="bg-muted/50 hover:bg-muted flex items-center gap-3 rounded-lg p-3">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
              <User size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive/80 w-full cursor-pointer justify-start"
            onClick={logout}
          >
            <X size={16} className="mr-2" />
            {t("navbar.sign-out")}
          </Button>
        </div>
      )}
    </div>
  );
};

export { DesktopUserMenu, MobileUserMenu };
