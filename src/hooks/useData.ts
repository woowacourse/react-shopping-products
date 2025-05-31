import { useEffect, useCallback } from 'react';
import { useDataContext } from '../context/DataStore/useDataContext';
import { APIKey, APIDataType } from '../types/dataStore';

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
    try {
      dispatch({ type: 'FETCH_START', key });
      const result = await fetcher();
      dispatch({ type: 'FETCH_SUCCESS', key, data: result });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.';
      dispatch({ type: 'FETCH_ERROR', key, error: errorMessage });
    }
  }, [key, fetcher, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: currentState.data as APIDataType<K> | null,
    loading: currentState.loading,
    error: currentState.error,
    refetch: fetchData,
  };
}
