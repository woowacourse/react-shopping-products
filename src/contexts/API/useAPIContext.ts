import { useCallback, useContext, useEffect } from "react";
import { APIContext } from "./APIProvider";
import { INITIAL_ERROR } from "../context.constant";
import { useErrorContext } from "../Error/ErrorContext";

interface useAPIContextType<T> {
  name: string;
  fetcher: () => Promise<T>;
  onError?: (err: unknown) => void;
}

export function useAPIContext<T>({
  name,
  fetcher,
  onError,
}: useAPIContextType<T>) {
  const context = useContext(APIContext);
  const { handleError } = useErrorContext();
  if (!context) {
    throw new Error("useAPIContext must be used within an APIProvider");
  }
  const { data, setData, isLoading, setIsLoading } = context;

  const request = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, [name]: true }));
    try {
      const res = await fetcher();
      setData((prev) => ({ ...prev, [name]: res }));
      handleError(INITIAL_ERROR);
    } catch (err) {
      if (onError) onError(err);
      else
        handleError({
          isError: true,
          errorMessage: "상품을 불러오지 못했습니다.",
        });
    } finally {
      setIsLoading((prev) => ({ ...prev, [name]: false }));
    }
  }, [fetcher, name, setData, setIsLoading, handleError, onError]);

  useEffect(() => {
    if (data[name] !== undefined) return;
    request();
  }, [name]);

  return {
    data: data[name] as T | undefined,
    isLoading: isLoading[name] ?? false,
    refetch: request,
  };
}
