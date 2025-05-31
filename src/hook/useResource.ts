import { useEffect, useCallback, useRef } from 'react';
import { apiRequest } from '../api';
import { useDataContext, ResourceState } from '../context/DataContext';
import createResourceId from '../util/createResourceId';

interface UseResourceOptions<T> {
  initialData?: T | null;
  autoFetch?: boolean;
  params?: Record<string, string | number>;
}

export default function useResource<T>(
  url: string,
  options: UseResourceOptions<T> = {}
): ResourceState<T> & { refetch: () => Promise<void> } {
  const { state, dispatch } = useDataContext();
  const { autoFetch = true } = options;

  const paramsRef = useRef(options.params);
  useEffect(() => {
    paramsRef.current = options.params;
  }, [options.params]);

  const resourceIdRef = useRef(createResourceId(url, paramsRef.current));

  const resourceState: ResourceState<T> = (state.resources[
    resourceIdRef.current
  ] as ResourceState<T>) || {
    data: options.initialData || null,
    isLoading: false,
    error: null,
  };

  const fetchResource = useCallback(async () => {
    const currentResourceId = resourceIdRef.current;
    dispatch({ type: 'FETCH_START', resourceId: currentResourceId });

    try {
      let fullUrl = url;
      if (paramsRef.current) {
        const queryString = Object.entries(paramsRef.current)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        fullUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      }

      const response = await apiRequest<T>(fullUrl);
      dispatch({
        type: 'FETCH_SUCCESS',
        resourceId: currentResourceId,
        data: response,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        resourceId: currentResourceId,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [url, dispatch]);

  const initialFetchRef = useRef(false);
  useEffect(() => {
    if (autoFetch && !initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchResource();
    }
  }, [fetchResource, autoFetch]);

  return {
    ...resourceState,
    refetch: fetchResource,
  };
}
