import { useEffect, useRef, useState, useCallback } from 'react';

const cache = new Map<string, { data: unknown; updatedAt: number }>();

interface useJaeOProps<T> {
  fetchKey: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
}

export function useJaeO<T>({ fetchKey, fetchFn, onError }: useJaeOProps<T>) {
  const [data, setData] = useState<T>(
    () => (cache.get(fetchKey)?.data ?? []) as T
  );
  const [isLoading, setIsLoading] = useState(!cache.get(fetchKey));
  const [isError, setIsError] = useState(false);

  const fetchFnRef = useRef(fetchFn);
  const onErrorRef = useRef(onError);

  const fetchAndSetData = useCallback(
    async (ignore: boolean) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchFnRef.current();
        if (!ignore) {
          cache.set(fetchKey, { data, updatedAt: Date.now() });
          setData(data);
        }
      } catch {
        setIsError(true);
        onErrorRef.current?.();
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    },
    [fetchKey]
  );

  const refetch = useCallback(() => {
    return fetchAndSetData(false);
  }, [fetchAndSetData]);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let ignore = false;

    const cached = cache.get(fetchKey);
    if (cached) {
      setData(cached.data as T);
      setIsLoading(false);
    } else {
      fetchAndSetData(ignore);
    }

    return () => {
      ignore = true;
    };
  }, [fetchAndSetData, fetchKey]);

  return { data, isLoading, isError, refetch };
}
