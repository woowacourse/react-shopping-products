import {
  useState,
  useCallback,
  useEffect,
  DependencyList,
  useRef,
} from "react";
import { ApiError, ErrorType } from "../constants/Error";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";
import { getErrorMessage } from "../util/getErrorMessage";
import { createApiError } from "../util/createApiError";

// HTTP 상태 코드에 따른 에러 타입 매핑

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

  const fetcher = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const currentRequestId = ++requestIdRef.current;

    const fetchOptionsWithSignal = {
      ...options,
      signal: controller.signal,
    };

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url, fetchOptionsWithSignal);

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      if (!res.ok) {
        const errorType = getErrorTypeByStatus(res.status);
        throw new ApiError(
          res.status,
          res.statusText,
          getErrorMessage(res.statusText, res.status),
          errorType
        );
      }

      // 201 Created, 204 No Content 처리
      if (res.status === 201 || res.status === 204) return;

      // JSON이 아닌 응답 처리
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return;
      }

      const json = await res.json();

      // 요청이 이미 취소되었거나 다른 요청이 시작된 경우 처리 중단
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setData(json as T);
    } catch (e) {
      // 요청이 이미 취소되었거나 다른 요청이 시작된 경우 에러 처리 중단
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setError(createApiError(e));
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [url, JSON.stringify(options), ...deps]);

  useEffect(() => {
    if (immediate) fetcher();
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetcher, immediate]);

  // abort 함수 추가하여 수동 취소 가능하게 함
  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  return { data, isLoading, error, fetcher, abort };
}

// 외부에서 사용할 수 있도록 타입과 상수 export
export { ErrorType, ApiError };
export default useFetch;
