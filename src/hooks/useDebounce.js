import { useEffect, useState } from "react";

const useDebounce = (value, delay = 300) => {
  const [valueSearch, setValueSearch] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setValueSearch(value);
    }, delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);
  return valueSearch;
};

export default useDebounce;
