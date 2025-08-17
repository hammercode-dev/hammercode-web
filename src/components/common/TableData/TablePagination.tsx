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

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const { hasNextPage, hasPrevPage, nextPage, prevPage, pages } = usePagination({
    currentPage,
    totalPages,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevPage && onPageChange(prevPage!)}
              className={cn(
                "bg-secondary text-secondary-foreground cursor-pointer",
                !hasPrevPage && "cursor-not-allowed opacity-50"
              )}
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
                  onClick={() => onPageChange(page as number)}
                  isActive={isActive}
                  className={cn("cursor-pointer", {
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

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNextPage && onPageChange(nextPage!)}
              className={cn(
                "bg-secondary text-secondary-foreground cursor-pointer",
                !hasNextPage && "cursor-not-allowed opacity-50"
              )}
              size="icon"
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
};
