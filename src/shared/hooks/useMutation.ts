import { useCallback } from "react";
import { TOAST_TYPES } from "../config/toast";
import useToast from "./useToast";

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

const useMutation = <T>(
  mutationFn: (variables: T) => Promise<void>,
  options?: MutationOptions<T>
) => {
  const { showToast } = useToast();

  const mutate = useCallback(
    async (variables: T) => {
      try {
        await mutationFn(variables);
        options?.onSuccess?.(variables);
        if (options?.successMessage) {
          showToast({
            message: options.successMessage,
            type: TOAST_TYPES.SUCCESS,
          });
        }
      } catch (error) {
        const message =
          options?.errorMessage ||
          (error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.");

        showToast({ message, type: TOAST_TYPES.ERROR });
        options?.onError?.(error);
      }
    },
    [mutationFn, options, showToast]
  );

  return { mutate };
};

export default useMutation;
