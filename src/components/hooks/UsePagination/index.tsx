import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  baseUrl?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  pages: (number | "ellipsis")[];
  generatePageUrl: (pageNum: number) => string | undefined;
}

export const usePagination = ({ currentPage, totalPages, category, baseUrl }: UsePaginationProps): PaginationData => {
  const generatePageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (pageNum > 1) params.set("page", pageNum.toString());
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  const pages = useMemo(() => {
    const pageNumbers: (number | "ellipsis")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push("ellipsis");
      }
    }

    return pageNumbers.filter((page, index, array) => {
      if (page === "ellipsis") {
        return array[index - 1] !== "ellipsis";
      }
      return true;
    });
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    pages,
    generatePageUrl,
  };
};
