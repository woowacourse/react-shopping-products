import { useCallback, useEffect } from 'react';
import { useAPIContext } from '../context/APIContext';
import { useToastContext } from '../context/ToastContext';

interface UseAPIProps<T> {
  fetcher: () => Promise<T>;
  name: string;
}

export function useAPI<T>({ fetcher, name }: UseAPIProps<T>) {
  const { state, setState, isLoading, setIsLoading } = useAPIContext();
  const { addToast } = useToastContext();

  const request = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, [name]: true }));

    try {
      const result = await fetcher();
      setState((prev) => ({ ...prev, [name]: result }));
    } catch (e) {
      addToast((e as Error).message);
    } finally {
      setIsLoading((prev) => ({ ...prev, [name]: false }));
    }
  }, [fetcher, name, setState, setIsLoading]);

  useEffect(() => {
    if (state[name] !== undefined) return;
    request();
  }, [name, state[name], request]);

  return {
    data: state[name] as T | null,
    isLoading: isLoading[name] || false,
    refetch: request,
  };
}
