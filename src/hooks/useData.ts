import { useEffect, useCallback } from 'react';
import { useDataContext } from '../context/DataStore/useDataContext';
import { APIKey, APIDataType } from '../types/dataStore';

const ongoingRequests = new Map<string, Promise<unknown>>();

type UseDataReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useData<K extends APIKey>(
  key: K,
  fetcher: () => Promise<APIDataType<K>>,
): UseDataReturn<APIDataType<K>> {
  const { state, dispatch } = useDataContext();
  const currentState = state[key];

  const fetchData = useCallback(async (): Promise<void> => {
    if (ongoingRequests.has(key)) {
      await ongoingRequests.get(key);
      return;
    }

    try {
      dispatch({ type: 'FETCH_START', key });

      const requestPromise = fetcher();
      ongoingRequests.set(key, requestPromise);

      const result = await requestPromise;
      dispatch({ type: 'FETCH_SUCCESS', key, data: result });
      ongoingRequests.delete(key);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.';
      dispatch({ type: 'FETCH_ERROR', key, error: errorMessage });
      ongoingRequests.delete(key);
    }
  }, [key, fetcher, dispatch]);

  useEffect(() => {
    if (!currentState.data && !currentState.error) {
      fetchData();
    }
  }, [fetchData, currentState.data, currentState.error]);

  return {
    data: currentState.data as APIDataType<K> | null,
    loading: currentState.loading,
    error: currentState.error,
    refetch: fetchData,
  };
}
