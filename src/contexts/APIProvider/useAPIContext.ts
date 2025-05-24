import { useCallback, useContext, useEffect } from "react";
import { APIContext } from "./APIProvider";
import { INITIAL_ERROR } from "../context.constant";

interface useAPIContextType<T> {
  name: string;
  fetcher: () => Promise<T>;
}

export function useAPIContext<T>({ name, fetcher }: useAPIContextType<T>) {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPIContext must be used within an APIProvider");
  }
  const { data, setData, isLoading, setIsLoading, error, setError } = context;

  const request = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetcher();
      setData((prev) => ({ ...prev, [name]: res }));
      setError((prev) => ({
        ...prev,
        [name]: INITIAL_ERROR,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        [name]: {
          isError: true,
          errorMessage: "상품을 불러오지 못했습니다.",
        },
      }));
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, name, setData, setIsLoading, setError]);

  useEffect(() => {
    console.log("effect", data);
    if (data[name] === undefined) {
      request();
    }
  }, [data, name, request]);

  // TODO : 구조 손보기 (ProductListPage의 name이랑 같이)

  return {
    data: data[name] as T | undefined,
    isLoading,
    error: error[name] ?? { isError: false, errorMessage: "" },
    refetch: request,
  };
}
