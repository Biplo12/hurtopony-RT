import { useEffect, useState } from "react";

interface UseDebounceProps {
  value: string;
  delay: number;
}

/**
 * Debounces a value by delaying the update of the value until the delay has passed.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
const useDebounce = ({ value, delay }: UseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
