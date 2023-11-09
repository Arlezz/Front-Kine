import { useState } from "react";   

export default function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  return function debouncedFunction(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
};
