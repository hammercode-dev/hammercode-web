import { useMemo } from "react";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";

/**
 * Helper function to stringify params object into URL search string
 */
const stringifyParams = (params: Record<string, string | number>): string => {
  const pairs = Object.entries(params)
    .filter(([, value]) => value !== "" && value != null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
  return pairs.length > 0 ? pairs.join("&") : "";
};

/**
 * Helper function to parse URL search params into an object
 */
const parseSearchParams = (searchString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  if (!searchString) return params;

  const pairs = searchString.replace(/^\?/, "").split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  });
  return params;
};

/**
 * Props for the usePagination hook
 */
interface UsePaginationProps {
  /** Number of items to display per page */
  itemsPerPage: number;
  /** Current active page number (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
}

/**
 * Return type for the usePagination hook
 */
interface PaginationData {
  /** Current active page number */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Whether there is a next page available */
  hasNextPage: boolean;
  /** Whether there is a previous page available */
  hasPrevPage: boolean;
  /** Next page number or null if no next page */
  nextPage: number | null;
  /** Previous page number or null if no previous page */
  prevPage: number | null;
  /** Array of page numbers to display, including ellipsis for gaps */
  pages: (number | "ellipsis")[];
  /** Function to handle page change and update URL */
  handlePageChange: (page: number) => void;
  /** Function to handle items per page change and update URL */
  handleItemsPerPageChange: (itemsPerPage: number) => void;
  /** Current items per page setting */
  itemsPerPage: number;
}

/**
 * Custom hook for managing pagination state and URL parameters
 * Provides utilities for page navigation, items per page control, and smart page number display
 */
const usePagination = ({ currentPage, totalPages, itemsPerPage }: UsePaginationProps): PaginationData => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert searchParams to object
  const currentParams = parseSearchParams(searchParams.toString());

  /**
   * Handles page change by updating URL parameters
   * @param page - The target page number to navigate to
   */
  const handlePageChange = (page: number) => {
    const updatedParams = {
      ...currentParams,
      page: page.toString(),
      limit: itemsPerPage.toString(),
    };
    const queryString = stringifyParams(updatedParams);
    router.push(queryString ? `?${queryString}` : "", { scroll: false });
  };

  /**
   * Handles items per page change by updating URL parameters and resetting to page 1
   * @param newItemsPerPage - The new number of items to display per page
   */
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    const updatedParams = {
      ...currentParams,
      limit: newItemsPerPage.toString(),
      page: "1",
    };
    const queryString = stringifyParams(updatedParams);
    router.push(queryString ? `?${queryString}` : "", { scroll: false });
  };

  /**
   * Generates an array of page numbers to display with ellipsis for gaps
   * Shows first page, last page, current page and adjacent pages
   * Adds ellipsis when there are gaps between visible page numbers
   */
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
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPage,
  };
};

export default usePagination;
