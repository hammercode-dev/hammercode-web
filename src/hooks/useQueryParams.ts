import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

/**
 * Custom hook for managing URL query parameters with nextjs
 * Provides utilities to read, set, and update URL parameters programmatically
 */
const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Gets a string parameter from URL query string
   * @param key - The parameter key to retrieve
   * @param defaultValue - Default value if parameter doesn't exist
   * @returns The parameter value or default value
   */
  const getParam = (key: string, defaultValue?: string) => {
    return searchParams.get(key) || defaultValue || "";
  };

  /**
   * Gets a numeric parameter from URL query string
   * @param key - The parameter key to retrieve
   * @param defaultValue - Default numeric value if parameter doesn't exist or is invalid
   * @returns The parameter value as number or default value
   */
  const getNumberParam = (key: string, defaultValue: number = 0) => {
    const value = searchParams.get(key);
    return value ? parseInt(value, 10) : defaultValue;
  };

  /**
   * Sets a single URL parameter and updates the browser URL
   * @param key - The parameter key to set
   * @param value - The value to set (null/empty values will remove the parameter)
   */
  const setParam = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === "" || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "", { scroll: false });
  };

  /**
   * Sets multiple URL parameters at once and updates the browser URL
   * More efficient than calling setParam multiple times
   * @param updates - Object with key-value pairs to update (null/empty values will remove parameters)
   */
  const setParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "", { scroll: false });
  };

  return {
    getParam,
    getNumberParam,
    setParam,
    setParams,
    searchParams,
  };
};

export default useQueryParams;
