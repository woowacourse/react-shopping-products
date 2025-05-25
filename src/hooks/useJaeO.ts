import { useEffect, useRef, useState } from 'react';

const cache = new Map<string, { data: unknown; updatedAt: number }>();

interface useJaeOProps<T> {
  path: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
}

export function useJaeO<T>({ path, fetchFn, onError }: useJaeOProps<T>) {
  const [data, setData] = useState<T>(() => (cache.get(path)?.data ?? []) as T);
  const [isLoading, setIsLoading] = useState(!cache.get(path));
  const [isError, setIsError] = useState(false);

  const fetchFnRef = useRef(fetchFn);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let ignore = false;

    const cached = cache.get(path);
    const cacheHit = !!cached;

    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);

      if (cacheHit) {
        setData(cached.data as T);
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchFnRef.current();
        if (!ignore) {
          cache.set(path, { data, updatedAt: Date.now() });
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
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, [path]);

  return { data, isLoading, isError };
}
