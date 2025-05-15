import {
  useState,
  useCallback,
  useEffect,
  DependencyList,
  useRef,
} from "react";

function useFetch<T>(
  url: string | URL,
  options: RequestInit = {},
  immediate = true,
  deps: DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetcher = useCallback(async () => {
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);

      if (!res.ok)
        throw new Error(`오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`);

      if (res.status === 201 || res.status === 204) return;

      if (res.headers.get("content-type") !== "application/json") {
        return;
      }

      const json = await res.json();

      setData(json as T);
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        setError(new Error("요청이 취소되었습니다."));
      } else if (e instanceof Error && e.name === "TypeError") {
        setError(new Error("네트워크 오류가 발생했습니다."));
      } else {
        setError(e instanceof Error ? e : new Error(String(e)));
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(options), ...deps]);

  useEffect(() => {
    if (immediate) fetcher();
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetcher, immediate]);

  return { data, isLoading, error, fetcher };
}

export default useFetch;
