import { useContext, useCallback, useEffect } from "react";
import { APIContext } from "../contexts/DataContext";

export function useAPIData<T>(name: string) {
  const { data } = useContext(APIContext);
  return data[name] as T | undefined;
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<{ data: T; error: null | { message: string } }>;
  name: string;
}) {
  const { data, setData, setErrorMessage, setIsLoading } =
    useContext(APIContext);

  const request = useCallback(async () => {
    const res = await fetcher();

    const error = res?.error;

    if (name === "products") {
      setIsLoading(false);
    }

    if (!error?.message) {
      setErrorMessage("");
      setData((data) => {
        return { ...data, [name]: res };
      });
      return;
    }

    setErrorMessage(error.message);
  }, [fetcher, name, setData, setErrorMessage, setIsLoading]);

  useEffect(() => {
    const hasData = data[name];
    if (hasData) {
      return;
    }
    request();
  }, [data, name, request]);

  return {
    data: data[name] as T | undefined,
    refetch: request,
  };
}
