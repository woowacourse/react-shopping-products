import { useState } from "react";
import { useQueryClient } from "./QueryProvider";
import { Status } from "./types";

interface UseMutationProps<TRequest, TResponse> {
  mutationFn: (variables: TRequest) => Promise<TResponse>;
}

interface MutateOptions {
  onMutate?: (queryClient: ReturnType<typeof useQueryClient>) => void;
  onSuccess?: (queryClient: ReturnType<typeof useQueryClient>) => void;
  onSettled?: (queryClient: ReturnType<typeof useQueryClient>) => void;
  onError?: (error: unknown) => void;
}

export default function useMutation<TRequest, TResponse>({ mutationFn }: UseMutationProps<TRequest, TResponse>) {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<Status>("idle");

  const mutate = async (variables: TRequest, options?: MutateOptions) => {
    try {
      setStatus("loading");

      options?.onMutate?.(queryClient);

      await mutationFn(variables);

      options?.onSuccess?.(queryClient);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      options?.onError?.(error);
      throw error;
    } finally {
      options?.onSettled?.(queryClient);
    }
  };

  return { mutate, status };
}
