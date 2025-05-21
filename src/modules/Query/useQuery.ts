import { useEffect } from "react";
import { useQueryClient } from "./QueryProvider";

interface UseQueryProps<T> {
  queryKey: string;
  queryFn: () => Promise<T>;
}

export default function useQuery<T>({ queryKey, queryFn }: UseQueryProps<T>) {
  const { getQueryData, setQueryData, getQueryStatus, setQueryStatus } = useQueryClient();

  const fetchData = async (forceFetch = false) => {
    setQueryStatus(queryKey, "loading");
    try {
      if (getQueryData(queryKey) && !forceFetch) {
        setQueryStatus(queryKey, "success");
        return;
      }

      const response = await queryFn();
      setQueryData(queryKey, response);
      setQueryStatus(queryKey, "success");
    } catch (error) {
      setQueryStatus(queryKey, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData(true);

  return {
    data: getQueryData(queryKey) as T,
    status: getQueryStatus(queryKey),
    fetchData,
    refetch,
  };
}
