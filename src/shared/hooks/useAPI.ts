import { useCallback, useContext, useEffect, useMemo } from "react";
import { APIContext } from "../../app/providers/APIContext";
import { ApiResponse, isApiError } from "../api/apiClient";
import { ApiDataKey, ApiDataTypeMap } from "../api/types/data";

interface APIResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

export const useAPI = <K extends ApiDataKey>(
  key: K,
  fetcher: () => Promise<ApiResponse<ApiDataTypeMap[K]>>
): APIResult<ApiDataTypeMap[K]> => {
  const { data, fetchData } = useContext(APIContext);

  useEffect(() => {
    if (!data[key]) fetchData(key, fetcher);
  }, [key, fetcher, data, fetchData]);

  const result = useMemo(() => {
    const value = data[key];

    if (!value) {
      return { data: null, error: null, loading: true };
    }

    if (isApiError(value)) {
      return { data: null, error: value.error, loading: false };
    }

    return { data: value as ApiDataTypeMap[K], error: null, loading: false };
  }, [data, key]);

  const refetch = useCallback(
    () => fetchData(key, fetcher),
    [fetchData, key, fetcher]
  );

  return { ...result, refetch };
};
