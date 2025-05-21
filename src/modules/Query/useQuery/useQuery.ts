import { useEffect, useState } from "react";
import { useQueryClient } from "../QueryClientProvider/QueryClientProvider";

type Status = "idle" | "loading" | "success" | "error";

interface UseQueryProps<T> {
  queryKey: string;
  queryFn: () => Promise<T>;
}

export default function useQuery<T>({ queryKey, queryFn }: UseQueryProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const queryClient = useQueryClient();

  const fetchData = async () => {
    setStatus("loading");
    try {
      const cachedData = queryClient.get(queryKey);


      const response = await queryFn();
      queryClient.set(queryKey, response);
      setData(response);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    status,
    fetchData,
  };
}
