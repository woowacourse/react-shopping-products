import { useEffect, useState } from 'react';
import { fetchClient } from '../apis/fetchClient';
import { HTTPMethod } from '../types/apis';

interface UseFetchResult<T> {
  error: unknown;
  isLoading: boolean;
  data: T | undefined;
}

interface FetchOptions {
  url: string;
  method: HTTPMethod;
  token?: string;
}

export default function useFetch<T>({ url, method, token }: FetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchClient(url, method, token);
        setData(fetchedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, token]);

  return {
    error,
    isLoading,
    data,
  };
}
