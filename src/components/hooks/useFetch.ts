import { useState, useCallback } from 'react';
import APIError from '../../api/apiError';

interface UseFetchProps<TData> {
  queryFn: () => Promise<TData>;
  onError?: (error: APIError) => Promise<unknown> | unknown;
}

interface UseFetchResult<TData> {
  query: () => Promise<void>;
  isLoading: boolean;
  error: APIError | null;
  data: TData;
}

export default function useFetch<TData>({
  queryFn,
  onError,
}: UseFetchProps<TData>): UseFetchResult<TData> {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<APIError | null>(null);
  const [data, setData] = useState<TData>({} as TData);

  const query = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await queryFn();
      setData(data);
    } catch (error) {
      setError(error as APIError);

      if (onError) onError(error as APIError);
    } finally {
      setLoading(false);
    }
  }, [queryFn, onError]);

  return { query, isLoading, error, data };
}
