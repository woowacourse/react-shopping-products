import { useCallback, useEffect, useState } from 'react';

type UseFetcherOnlyProps<TResult> = {
  fetcher: (
    args?: any
  ) => Promise<{ data: { content: TResult }; status: number }>;
  fetcherParams?: Record<string, any>;
  enabled?: boolean;
};

function useFetcherOnly<TResult>({
  fetcher,
  fetcherParams,
  enabled = true,
}: UseFetcherOnlyProps<TResult>) {
  const [data, setData] = useState<TResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, status: null });

  const request = useCallback(async () => {
    setIsLoading(true);
    setError({ isError: false, status: null });

    try {
      const res = await fetcher(fetcherParams);
      setData(res.data.content);
    } catch (e: any) {
      setError({
        isError: true,
        status: Number(e?.message) || null,
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, fetcherParams]);

  useEffect(() => {
    if (!enabled) return;
    request();
  }, []);

  return { data, isLoading, error, refetch: request };
}

export default useFetcherOnly;
