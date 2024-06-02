import { useState } from "react";
import { SmartURLSearchParams } from "../utils/SmartURLSearchParams";

interface UseFetchReturn<T> {
  isLoading: boolean;
  error: Error | null;
  fetchData: (queryParams?: SmartURLSearchParams) => Promise<T | undefined>;
}

export const useFetch = <T>(
  fetcher: (queryParams?: URLSearchParams) => Promise<T>
): UseFetchReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (queryParams?: SmartURLSearchParams) => {
    setIsLoading(true);
    try {
      const result = await fetcher(queryParams);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
};
