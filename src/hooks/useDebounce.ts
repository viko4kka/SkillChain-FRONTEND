import { useEffect, useState } from "react";

interface useDebounceProps {
  value: string;
  delay: number;
}

export default function useDebounce({ value, delay }: useDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      console.log("dziala debounce");
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
