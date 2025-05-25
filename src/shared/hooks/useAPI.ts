import { useContext, useEffect, useMemo } from "react";
import { APIContext } from "../../app/providers/ApiContext";
import { ApiError, isApiError } from "../api/apiClient";
import { ApiDataKey, ApiDataTypeMap } from "../api/types/data";

interface APIResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
}

export const useAPI = <K extends ApiDataKey>(
  key: K,
  fetcher: () => Promise<ApiDataTypeMap[K] | ApiError>
): APIResult<ApiDataTypeMap[K]> => {
  const { data, fetchData } = useContext(APIContext);

  useEffect(() => {
    if (!data[key]) fetchData(key, fetcher);
  }, [key, fetcher, data, fetchData]);

  const result = useMemo(() => {
    const value = data[key];

    if (!value) {
      return { data: null, error: null, isLoading: true };
    }

    if (isApiError(value)) {
      return { data: null, error: value.error, isLoading: false };
    }

    return { data: value as ApiDataTypeMap[K], error: null, isLoading: false };
  }, [data, key]);

  return {
    ...result,
    refetch: () => fetchData(key, fetcher),
  };
};
