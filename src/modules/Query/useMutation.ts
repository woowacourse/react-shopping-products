import { useQueryClient } from "./QueryProvider";

interface UseMutationProps<T, V> {
  mutationFn: (variables: V) => Promise<T>;
  queryKey: string;
}

export default function useMutation<T, V>({ mutationFn, queryKey }: UseMutationProps<T, V>) {
  const { getQueryData, setQueryData, setQueryStatus } = useQueryClient();

  const mutate = async (variables: V, optimisticUpdate?: (prev: T) => T) => {
    const prevData = getQueryData(queryKey) as T;

    if (optimisticUpdate) {
      mutationFn(variables);
      setQueryData(queryKey, optimisticUpdate(prevData));
      setQueryStatus(queryKey, "success");
    } else {
      const response = await mutationFn(variables);
      setQueryData(queryKey, response);
      setQueryStatus(queryKey, "success");
    }
  };

  return { mutate };
}
