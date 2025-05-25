import { useCallback, useEffect } from 'react';
import { useAPIContext } from '../context/APIContext';

interface UseAPIProps<T> {
  fetcher: () => Promise<T>;
  name: string;
}

export function useAPI<T>({ fetcher, name }: UseAPIProps<T>) {
  const { state, setState, isLoading, setIsLoading, error, setError } =
    useAPIContext();

  const request = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, [name]: true }));
    setError((prev) => ({
      ...prev,
      [name]: { isError: false, errorMessage: '' },
    }));

    try {
      const result = await fetcher();
      setState((prev) => ({ ...prev, [name]: result }));
    } catch (e) {
      setError((prev) => ({
        ...prev,
        [name]: {
          isError: true,
          errorMessage: (e as Error)?.message,
        },
      }));
    } finally {
      setIsLoading((prev) => ({ ...prev, [name]: false }));
    }
  }, [fetcher, name, setState, setIsLoading, setError]);

  useEffect(() => {
    request();
  }, [request]);

  return {
    data: state[name] as T | null,
    isLoading: isLoading[name],
    error: error[name],
    refetch: request,
  };
}
