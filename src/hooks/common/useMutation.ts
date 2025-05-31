import { useCallback } from "react";
import { useQueryClient } from "../../contexts/QueryContext";

interface UseMutationProps<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

const useMutation = <T, V>(mutationFn: (variables: V) => Promise<T>, options: UseMutationProps<T> = {}) => {
  const { startMutating, endMutating } = useQueryClient();

  const mutate = useCallback(
    async (variables: V) => {
      startMutating();
      try {
        const result = await mutationFn(variables);
        endMutating();
        options.onSuccess?.(result);
      } catch (e) {
        if (e instanceof Error) {
          endMutating(e);
          options.onError?.(e);
        }
      }
    },
    [mutationFn, options, startMutating, endMutating],
  );

  return {
    mutate,
  };
};

export default useMutation;
