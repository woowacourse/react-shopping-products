import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setStatus("loading");
    try {
      const data = await fetcher();
      setData(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, status, fetchData, error };
}
