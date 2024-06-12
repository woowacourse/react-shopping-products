import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants";
import { useErrorContext } from "../../../hooks";

type UpdateCartItemFuntion<T> = (args: T) => Promise<void>;

export default function useUpdateCartItem<T>(mutationFn: UpdateCartItemFuntion<T>) {
  const queryClient = useQueryClient();
  const { setError } = useErrorContext();

  return useMutation({
    mutationFn: (args: T) => mutationFn(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
      setError(null);
    },
    onError: (error) => setError(error),
  });
}
