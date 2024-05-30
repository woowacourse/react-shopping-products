import { useEffect, useState } from 'react';
import { fetchClient } from '../apis/fetchClient';
import { HTTPMethod } from '../types/apis';

export interface UseFetchResult<T> {
  error: unknown;
  isLoading: boolean;
  data: T | undefined;
}

interface FetchOptions {
  url: string;
  method: HTTPMethod;
  body?: object;
  token?: string;
}

export default function useFetch<T>({ url, method, body, token }: FetchOptions): UseFetchResult<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchClient({ url, method, body, token });
        setData(fetchedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, token]);

  return {
    error,
    isLoading,
    data,
  };
}
