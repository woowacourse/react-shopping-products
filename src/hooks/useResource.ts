import { useEffect, useCallback } from "react";
import { useResourcesContext } from "../context/ResourcesContext";

type Fetcher<T> = () => Promise<T>;

export const useResource = <T>(key: string, fetcher: Fetcher<T>) => {
  const { resources, getInitialState, updateResource } = useResourcesContext();
  const resource = resources[key] ?? getInitialState();

  const fetchAndUpdate = useCallback(async () => {
    const prev = resources[key] ?? getInitialState();

    updateResource(key, {
      ...prev,
      isLoading: true,
      isFetching: true,
      isError: false,
      isSuccess: false,
    });

    try {
      const data = await fetcher();
      updateResource(key, {
        ...prev,
        data,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
      });
    } catch {
      updateResource(key, {
        ...prev,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
      });
    }
  }, [key, fetcher, updateResource, resources, getInitialState]);

  useEffect(() => {
    if (resources[key]) return;
    fetchAndUpdate();
  }, [key, resources, fetchAndUpdate]);

  const refetch = fetchAndUpdate;

  return {
    ...(resource as typeof resource & { data: T }),
    refetch,
  };
};
