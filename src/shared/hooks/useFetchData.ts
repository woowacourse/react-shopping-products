import { useCallback, useEffect, useMemo, useState } from 'react';

type DataState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

type UseFetchDataOptions<T> = {
  autoFetch?: () => Promise<T>;
};

export const useFetchData = <T>(options?: UseFetchDataOptions<T>) => {
  const [data, setData] = useState<DataState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetch = useCallback(async (apiCall: () => Promise<T>) => {
    setData((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const promises = [apiCall()];

      if (process.env.NODE_ENV !== 'test') {
        promises.push(new Promise((resolve) => setTimeout(resolve, 2000)));
      }

      const [result] = await Promise.all(promises);

      setData({ data: result, isLoading: false, error: null });
    } catch (e) {
      setData((prev) => ({ ...prev, error: e as Error }));
      throw e;
    }
  }, []);

  const mutate = useCallback(
    async (apiCall: () => Promise<void>, refetchFn?: () => Promise<T>) => {
      await apiCall();
      if (refetchFn) {
        await fetch(refetchFn);
      }
    },
    [fetch]
  );

  useEffect(() => {
    if (options?.autoFetch) {
      fetch(options.autoFetch);
    }
  }, [fetch, options?.autoFetch]);

  return useMemo(() => ({ ...data, fetch, mutate }), [data, fetch, mutate]);
};
