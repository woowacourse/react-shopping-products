import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";

interface UseCartMutationOptions<T> {
  mutationFn: (variables: T) => Promise<unknown>;
}

const useCartMutation = <T>({ mutationFn }: UseCartMutationOptions<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};

export default useCartMutation;
