import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value by delaying updates until after a specified delay
 * Useful for optimizing search inputs, API calls, and other scenarios where you want to
 * limit the frequency of updates
 *
 * @template T - The type of the value being debounced
 * @param value - The value to be debounced
 * @param delay - The delay in milliseconds before the debounced value is updated
 * @returns The debounced value
 */
function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounced;
