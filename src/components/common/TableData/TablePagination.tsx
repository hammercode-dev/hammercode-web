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
import { usePagination } from "@/hooks";

interface TablePaginationProps {
  itemsPerPage: number;
  currentPage?: number;
  totalPages?: number;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  itemsPerPage,
  currentPage = 1,
  totalPages = 1,
  className,
}) => {
  const { hasNextPage, hasPrevPage, nextPage, prevPage, pages, handlePageChange } = usePagination({
    currentPage,
    totalPages,
    itemsPerPage,
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
              onClick={() => hasPrevPage && handlePageChange(prevPage!)}
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
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isActive = page === currentPage;

            return (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  onClick={() => handlePageChange(page as number)}
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
              onClick={() => hasNextPage && handlePageChange(nextPage!)}
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
