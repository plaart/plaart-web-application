/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from "react";

export const useDebounce = (
  callback: () => void,
  delay: number,
  deps: React.DependencyList
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay, ...deps]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
