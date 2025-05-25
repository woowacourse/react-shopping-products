import { useState } from "react";
import { useQueryClient } from "./QueryProvider";
import { Status } from "./types";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
  queryKey: string;
}

export default function useMutation<TRequest, TResponse, TOptimisticResponse = TResponse>({
  mutationFn,
  queryKey,
}: UseMutationProps<TRequest, TResponse>) {
  const { getQueryData, setQueryData } = useQueryClient();
  const [status, setStatus] = useState<Status>("idle");

  const mutate = async (variables: TRequest, optimisticUpdate?: (prev: TOptimisticResponse) => TResponse) => {
    const prevData = getQueryData(queryKey) as TOptimisticResponse;

    try {
      setStatus("loading");
      if (optimisticUpdate) {
        await mutationFn(variables);
        setQueryData(queryKey, optimisticUpdate(prevData));
      } else {
        await mutationFn(variables);
      }
      setStatus("success");
    } catch (error) {
      setQueryData(queryKey, prevData);
      setStatus("error");
      throw error;
    }
  };

  return { mutate, status };
}
