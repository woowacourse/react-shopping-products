import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type Status = "idle" | "loading" | "success" | "error";

const APIContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {},
});

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  return (
    <APIContext.Provider value={{ data, setData }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) {
  const { data, setData } = useContext(APIContext);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const request = useCallback(async () => {
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetcher();

      if (!res) {
        setStatus("error");
        setErrorMessage(
          `${name}을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`
        );
        return;
      }

      setData((prev) => ({ ...prev, [name]: res }));
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : `${name}을 불러오는 중 알 수 없는 오류가 발생했습니다.`
      );
    }
  }, [fetcher, name, setData]);

  useEffect(() => {
    if (data[name] == null) {
      request();
    } else {
      setStatus("success");
    }
  }, [data, name, request]);

  return {
    data: data[name] as T | undefined,
    status,
    errorMessage,
    refetch: request,
  };
}
