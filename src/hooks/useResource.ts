import { useCallback, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

export function useResource<T, P = void>(key: string, fetcher: (params: P) => Promise<T>) {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useResource must be used within a DataProvider');
  }

  const { store, updateResource } = context;

  const resourceState = store[key] || {
    data: null,
    isLoading: false,
    isFetching: false,
    isError: false,
  };

  const fetchData = useCallback(
    async (params?: P, isInitialFetch = false) => {
      try {
        if (isInitialFetch) {
          updateResource(key, { isLoading: true, isError: false });
        } else {
          updateResource(key, { isFetching: true, isError: false });
        }

        const data = await fetcher(params as P);
        updateResource(key, { data, isLoading: false, isFetching: false });
        return data;
      } catch (error) {
        updateResource(key, {
          isError: true,
          isLoading: false,
          isFetching: false,
        });

        setTimeout(() => {
          updateResource(key, { isError: false });
        }, 3000);
      }
    },
    [key, fetcher, updateResource],
  );

  return {
    data: resourceState.data as T | null,
    isLoading: resourceState.isLoading,
    isFetching: resourceState.isFetching,
    isError: resourceState.isError,
    fetchData,
  };
}
