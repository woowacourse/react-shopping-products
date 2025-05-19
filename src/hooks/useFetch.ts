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
        throw new Error(
          "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
        );

      // 201 Created, 204 No Content
      // 201 Created: 요청이 성공적으로 처리되었고, 새로운 리소스가 생성됨
      // 204 No Content: 요청이 성공적으로 처리되었지만, 응답 본문에 데이터가 없음
      // 이 경우에는 응답 본문을 파싱하지 않고 종료

      if (res.status === 201 || res.status === 204) return;

      // 응답의 Content-Type 헤더를 확인하여 JSON인지 확인
      // JSON이 아닌 경우에는 파싱하지 않음
      // 이 경우에는 응답 본문을 파싱하지 않고 종료
      // 이렇게 처리 하는 것은 대개 좋다고 볼수는 없지만,
      // 현 사용 용례에는 적절하다고 여겨지기 때문에, 이렇게 처리함.

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return;
      }

      const json = await res.json();

      setData(json as T);
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        setError(new Error("요청이 취소되었습니다."));
      } else if (e instanceof Error && e.name === "TypeError") {
        setError(
          new Error("네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요.")
        );
      } else {
        setError(e instanceof Error ? e : new Error(String(e)));
      }
    } finally {
      setIsLoading(false);
    }
    //천천히 deps에 고민해보자.
  }, [url, options, ...deps]);

  useEffect(() => {
    if (immediate) fetcher();
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetcher, immediate]);

  return { data, isLoading, error, fetcher };
}

export default useFetch;
