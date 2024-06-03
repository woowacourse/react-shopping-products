import { useState } from 'react';
import { HEADERS } from '../../api/common';
import { generateQueryParams } from '../../utils/generateQueryParams';
import { CommonQueryParams } from '../../api/types';
import APIError from '../../api/apiError';

interface UseFetchResult<T> {
  isLoading: boolean;
  error: Error | null;
  fetchData: (options: {
    errorMessage: string;
    queryParams?: CommonQueryParams;
  }) => Promise<T | undefined>;
}

interface UseFetchProps {
  url: string;
}

export default function useFetch<T>({ url }: UseFetchProps): UseFetchResult<T> {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({
    queryParams,
    errorMessage,
  }: {
    errorMessage: string;
    queryParams?: CommonQueryParams;
  }) => {
    setLoading(true);
    setError(null);

    const queryString = queryParams ? generateQueryParams(queryParams) : '';
    try {
      const response = await fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: HEADERS,
      });

      if (!response.ok) throw new APIError(response.status, errorMessage);

      const data = await response.json();
      return data as T;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, fetchData };
}
