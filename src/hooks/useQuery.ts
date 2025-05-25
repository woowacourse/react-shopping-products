import { useEffect, useState } from "react";
import { useQueryClient } from "../contexts/QueryContext";
import { useErrorMessage, useLoading } from "../contexts";

interface UseQueryProps<T> {
  queryKey: string;
  fetchFn: () => Promise<T>;
}

const useQuery = <T>({ queryKey, fetchFn }: UseQueryProps<T>) => {
  const query = useQueryClient();
  const [, forceRender] = useState({});
  const { startFetching, endFetching } = useLoading();
  const { setErrorMessage } = useErrorMessage();

  const state = query.get<T>(queryKey);

  useEffect(() => {
    const reRenderFn = () => forceRender({});
    query.subscribe(queryKey, reRenderFn);

    if (!state) {
      startFetching();
      query
        .refetch(queryKey, fetchFn)
        .catch((e) => {
          if (e instanceof Error) setErrorMessage(e.message);
        })
        .finally(() => endFetching());
    }

    return () => query.unsubscribe(queryKey, reRenderFn);
  }, [queryKey, fetchFn, query, state, setErrorMessage, startFetching, endFetching]);

  return {
    data: state?.data || null,
    isLoading: state?.isLoading || true,
    error: state?.error || null,
    refetch: () => query.refetch(queryKey, fetchFn),
  };
};

export default useQuery;
