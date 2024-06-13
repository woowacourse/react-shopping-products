import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorContext } from "./useErrorContext";
import { QUERY_KEYS } from "../constants/queryKeys";

const useMutationWithErrorHandler = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: (data: T) => Promise<any>,
  successMessage: string
) => {
  const { showError } = useErrorContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        `An error occurred: ${successMessage}`;
      showError(message);
    },
  });
};

export default useMutationWithErrorHandler;
