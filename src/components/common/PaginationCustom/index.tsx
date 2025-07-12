"use client";
import React from "react";
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/Pagination";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usePagination } from "@/components/hooks/UsePagination";
import { usePathname } from "@/lib/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  baseUrl?: string;
  className?: string;
}

export const PaginationCustom: React.FC<PaginationProps> = ({ currentPage, totalPages, category, className }) => {
  const pathname = usePathname();
  const baseUrl = pathname.split("?")[0];
  const { hasNextPage, hasPrevPage, nextPage, prevPage, pages, generatePageUrl } = usePagination({
    currentPage,
    totalPages,
    category,
    baseUrl,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("mt-8", className)}>
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={hasPrevPage ? generatePageUrl(prevPage!) : undefined}
              className={cn("bg-secondary text-secondary-foreground", !hasPrevPage && "cursor-not-allowed opacity-50")}
              onClick={!hasPrevPage ? (e) => e.preventDefault() : undefined}
              size="icon"
            />
          </PaginationItem>

          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isActive = page === currentPage;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={generatePageUrl(page)}
                  isActive={isActive}
                  className={cn({
                    [buttonVariants({
                      variant: "default",
                      className: "bg-hmc-base-blue hover:bg-hmc-base-blue text-white !shadow-none hover:text-white",
                    })]: isActive,
                    "bg-secondary text-secondary-foreground": !isActive,
                  })}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationNext
            href={hasNextPage ? generatePageUrl(nextPage!) : undefined}
            className={cn("bg-secondary text-secondary-foreground", !hasNextPage && "cursor-not-allowed opacity-50")}
            onClick={!hasNextPage ? (e) => e.preventDefault() : undefined}
            size="icon"
          />
        </PaginationContent>
      </UIPagination>
    </div>
  );
};
