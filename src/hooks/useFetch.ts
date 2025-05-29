import {
  useState,
  useCallback,
  useEffect,
  DependencyList,
  useRef,
} from "react";
import { ApiError } from "../constants/Error";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";
import { getErrorMessage } from "../util/getErrorMessage";
import { createApiError } from "../util/createApiError";

function useFetch<T>(
  url: string | URL,
  options: RequestInit = {},
  immediate = true,
  deps: DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0);

  const fetcher = useCallback(async (): Promise<T | undefined> => {
    // 이전 요청이 남아있으면 취소
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    const currentRequestId = ++requestIdRef.current;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });

      // 중복 요청 확인
      if (currentRequestId !== requestIdRef.current) return;

      if (!res.ok) {
        const errorType = getErrorTypeByStatus(res.status);
        throw new ApiError(
          res.status,
          res.statusText,
          getErrorMessage(res.statusText, res.status),
          errorType
        );
      }

      // 201/204 처리 (body 없음)
      if (res.status === 201 || res.status === 204) {
        return undefined;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        return undefined;
      }

      const json = (await res.json()) as T;

      if (currentRequestId !== requestIdRef.current) return;

      setData(json);
      return json;
    } catch (e) {
      if (currentRequestId !== requestIdRef.current) return;
      setError(createApiError(e));
      throw e;
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [url, options, ...deps]);

  useEffect(() => {
    if (immediate) fetcher();
    return () => controllerRef.current?.abort();
  }, [fetcher, immediate]);

  const abort = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return { data, isLoading, error, fetcher, abort };
}

export default useFetch;
