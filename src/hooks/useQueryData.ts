import { useState, useCallback, useEffect } from "react";
import { ApiError } from "../constants/Error";
import { createApiError } from "../util/createApiError";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";
import { getErrorMessage } from "../util/getErrorMessage";
import { useQueryContext } from "../contexts/QueryContext";
import { DataKey, DataPoolMap, DataResponseMap } from "../types/data-types";

type Opts = Omit<RequestInit, "method" | "signal">;
type FetchOptions = {
  url: string | URL;
  options?: Opts;
  immediate?: boolean;
};
function useQueryData<K extends DataKey>(
  key: K,
  { url, options, immediate = true }: FetchOptions
) {
  const { dataPool, setData, controllers } = useQueryContext();
  const cached = dataPool[key] as DataPoolMap[K] | undefined;
  const [loading, setLoading] = useState(!cached && immediate);
  const [error, setError] = useState<ApiError | null>(null);

  const loadData = useCallback(async () => {
    controllers.current[key]?.abort();

    const controller = new AbortController();
    controllers.current[key] = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        ...options,
        method: "GET",
        signal: controller.signal,
      });

      if (!res.ok)
        throw new ApiError(
          res.status,
          res.statusText,
          getErrorMessage(res.statusText, res.status),
          getErrorTypeByStatus(res.status)
        );

      const type = res.headers.get("content-type");
      if (!type || !type.includes("application/json")) return;

      const json = (await res.json()) as DataResponseMap[K];
      setData(key, json.content);
    } catch (e) {
      if ((e as DOMException).name !== "AbortError")
        setError(createApiError(e));
    } finally {
      if (controllers.current[key] === controller)
        controllers.current[key] = null;
      setLoading(false);
    }
  }, [key, url]);

  useEffect(() => {
    if (!cached && immediate) loadData();
    return () => controllers.current[key]?.abort();
  }, [loadData, immediate]);

  const abort = () => controllers.current[key]?.abort();

  return { data: cached, loading, error, loadData, abort };
}
export default useQueryData;
