import { useEffect, useState } from "react";
import { useQueryClient } from "../../contexts/QueryContext";
import { useErrorMessage } from "../../contexts";

interface UseQueryProps<T> {
  queryKey: string;
  fetchFn: () => Promise<T>;
}

const useQuery = <T>({ queryKey, fetchFn }: UseQueryProps<T>) => {
  const query = useQueryClient();
  const [, forceRender] = useState({});
  const { setErrorMessage } = useErrorMessage();

  const state = query.get<T>(queryKey);

  useEffect(() => {
    const reRenderFn = () => forceRender({});
    query.subscribe(queryKey, reRenderFn);

    if (!state) {
      query.refetch(queryKey, fetchFn).catch((e) => {
        if (e instanceof Error) setErrorMessage(e.message);
      });
    }

    return () => query.unsubscribe(queryKey, reRenderFn);
  }, [queryKey, fetchFn, query, state, setErrorMessage]);

  return {
    data: state?.data || null,
    isLoading: state?.isLoading || true,
    error: state?.error || null,
    refetch: () => query.refetch(queryKey, fetchFn),
  };
};

export default useQuery;
