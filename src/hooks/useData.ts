// useQuery.ts
import { useState, useCallback, useEffect, DependencyList } from "react";
import { ApiError } from "../constants/Error";
import { createApiError } from "../util/createApiError";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";
import { getErrorMessage } from "../util/getErrorMessage";
import { useQueryContext } from "../contexts/QueryContext";
import { DataKey, DataPoolMap, DataResponseMap } from "../types/data-types";

type Opts = Omit<RequestInit, "method" | "signal">;

export function useData<K extends DataKey>(
  key: K,
  url: string | URL,
  options: Opts = {},
  immediate = true,
  deps: DependencyList = []
) {
  const { dataPool, setData, controllers } = useQueryContext();
  const cached = dataPool[key] as DataPoolMap[K] | undefined;
  const [loading, setLoading] = useState(!cached && immediate);
  const [error, setError] = useState<ApiError | null>(null);

  const fetcher = useCallback(async () => {
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
  }, [key, url, JSON.stringify(options), ...deps]);

  useEffect(() => {
    if (!cached && immediate) fetcher();
    return () => controllers.current[key]?.abort();
  }, [fetcher, immediate]);

  const abort = () => controllers.current[key]?.abort();

  return { data: cached, loading, error, refetch: fetcher, abort };
}
