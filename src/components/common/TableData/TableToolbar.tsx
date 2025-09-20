"use client";

import { Input } from "@/components/ui/Input";
import { useQueryParams } from "@/hooks";
import { Search, X } from "lucide-react";

interface TableToolbarProps {
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  rightAction?: React.ReactNode;
}

export const TableToolbar = ({
  searchable = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  rightAction,
}: TableToolbarProps) => {
  const { setParam } = useQueryParams();

  const clearSearch = () => {
    setParam("search", "");
    onSearchChange?.("");
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Search Section */}
      <div className="flex-1">
        {searchable && (
          <div className="relative max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10"
              suffix={searchValue && <X className="w-5 cursor-pointer" onClick={clearSearch} />}
            />
          </div>
        )}
      </div>

      {/* Right Action Section */}
      {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
    </div>
  );
};
