import { useEffect, useRef, useState } from 'react';

interface useJaeOProps<T> {
  path: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
}

export function useJaeO<T>({ path, fetchFn, onError }: useJaeOProps<T>) {
  const [data, setData] = useState<T>([] as T);
  const [isLoading, setIsLoading] = useState(true);
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

    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchFnRef.current();
        if (!ignore) {
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
