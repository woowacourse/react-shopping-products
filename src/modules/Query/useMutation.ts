import { useQueryClient } from "./QueryProvider";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
  queryKey: string;
}

export default function useMutation<TRequest, TResponse, TOptimisticResponse = TResponse>({
  mutationFn,
  queryKey,
}: UseMutationProps<TRequest, TResponse>) {
  const { getQueryData, setQueryData } = useQueryClient();

  const mutate = async (variables: TRequest, optimisticUpdate?: (prev: TOptimisticResponse) => TResponse) => {
    const prevData = getQueryData(queryKey) as TOptimisticResponse;

    if (optimisticUpdate) {
      mutationFn(variables);
      setQueryData(queryKey, optimisticUpdate(prevData));
    } else {
      await mutationFn(variables);
    }
  };

  return { mutate };
}
