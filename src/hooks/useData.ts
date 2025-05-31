import { APIContext } from "@/context/APIContext";
import { useCallback, useContext, useEffect, useRef } from "react";

interface UseDataProps<T> {
  fetchFn: () => Promise<T>;
  name: string;
}

const useData = <T>({ fetchFn, name }: UseDataProps<T>) => {
  const context = useContext(APIContext);

  if (!context) {
    throw new Error("useData는 DataProvider 내부에서 사용되어야 합니다.");
  }

  const { data, setData, isLoading, setIsLoading, setRefetchFunction } =
    context;

  const hasRefetch = useRef(false);

  const fetchData = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, [name]: true }));
    try {
      const response = await fetchFn();
      setData((prev) => ({ ...prev, [name]: response }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [name]: false }));
    }
  }, [fetchFn, name, setData, setIsLoading]);

  useEffect(() => {
    if (!hasRefetch.current) {
      setRefetchFunction(name, fetchData);
      hasRefetch.current = true;
    }
  }, [fetchData, name, setRefetchFunction]);

  useEffect(() => {
    if (data[name] === undefined) {
      fetchData();
    }
  }, [data, name, fetchData]);

  return {
    data: data[name] as T,
    isLoading: isLoading[name] ?? false,
    refetch: fetchData,
  };
};

export default useData;
