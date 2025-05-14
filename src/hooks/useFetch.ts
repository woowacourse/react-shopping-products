import { useCallback, useEffect, useState, DependencyList } from "react";

const useFetch = <T>(
  url: string | URL,
  option?: RequestInit,
  immediate = true,
  deps: DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, option);
      const data: T = await response.json();
      setData(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  }, [deps]);

  useEffect(() => {
    if (!immediate) return;
    fetcher();
  }, []);

  return {
    data,
    isLoading,
    error,
    fetcher,
  };
};
export default useFetch;
