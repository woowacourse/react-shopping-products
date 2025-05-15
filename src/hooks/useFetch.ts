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
  //abort 컨트롤러를 사용하는 이유는 뭘까요?
  //그리고 왜 꼭 ref에서 사용해야 할까요?

  const fetcher = useCallback(async () => {
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    setError(null);
    try {
      // fetch 자체의 실패는 failed to fetch가 떠요.
      // fetch 에러 인스턴스는 TypeError입니다.
      // await fetch(...)
      // └─> 네트워크 오류 시: promise.rejects(new TypeError(/* ... */))
      // 이것을 사용해서 커스텀 에러를 보여줄수 있을까요?

      const res = await fetch(url, options);

      if (!res.ok)
        throw new Error(`오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`);

      // 우리가 만드는 API의 useCase는 이 밖을 벗어나지 않을겁니다.
      // 이 미션이 끝나기전까지(심지어는 step2에서도!)
      // 이 코드는 정상 동작할거에요.

      if (res.status === 201 || res.status === 204) return;
      // 그런데 이런 친구들이.. data는 null로 해야 할까요?

      // 그런데 우리가 valid한 json을 알수가 있을까요?
      // 그러고 보니, valid한 json은 header에 항상
      // 'content-type': 'application/json'을 붙여요.
      // 이것을 이용해서 json의 invalid함을 검출할수 있을까요?

      const json = await res.json();
      setData(json as T);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
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
