import { useEffect, useCallback } from "react";
import { useResourcesContext } from "../context/ResourcesContext";

type Fetcher<T> = () => Promise<T>;

export const useResource = <T>(
  key: string,
  fetcher: Fetcher<T>,
  options?: { enabled?: boolean }
) => {
  const { resources, updateResource, resetResource } = useResourcesContext();

  const state = resources[key] ?? {
    data: null,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
  };

  const fetchData = useCallback(async () => {
    updateResource<T>(key, () => ({
      data: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isError: false,
    }));

    try {
      const data = await fetcher();
      updateResource<T>(key, () => ({
        data,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
      }));
    } catch (error) {
      updateResource<T>(key, () => ({
        data: null,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
      }));
    }
  }, [key, fetcher, updateResource]);

  useEffect(() => {
    if (options?.enabled === false) return;
    fetchData();
  }, [fetchData, options?.enabled]);

  return {
    ...state,
    refetch: fetchData,
    reset: () => resetResource(key),
  };
};
