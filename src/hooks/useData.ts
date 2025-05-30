import { useEffect, useState } from "react";
import apiRequest from "../api/utils/apiRequest";

interface UseDataOptions {
  queryParams?: Record<string, string | number | undefined>;
  dependencies?: unknown[];
}

interface ApiResponse<T> {
  content: T;
}

const useData = <T>(
  url: string,
  { queryParams, dependencies = [] }: UseDataOptions = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest<ApiResponse<T>>(url, { queryParams });
      setData(response.content);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, ...dependencies]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useData;
