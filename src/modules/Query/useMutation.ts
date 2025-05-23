import { useQueryClient } from "./QueryProvider";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
  queryKey: string;
}

export default function useMutation<TRequest, TResponse, TGetResponse = unknown>({
  mutationFn,
  queryKey,
}: UseMutationProps<TRequest, TResponse>) {
  const { getQueryData, setQueryData, setQueryStatus } = useQueryClient();

  const mutate = async (variables: TRequest, optimisticUpdate?: (prev: TGetResponse) => TResponse) => {
    const prevData = getQueryData(queryKey) as TGetResponse;

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
