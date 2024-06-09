import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants";

type UpdateCartItemFuntion<T> = (args: T) => Promise<void>;

export default function useUpdateCartItem<T>(mutationFn: UpdateCartItemFuntion<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: T) => mutationFn(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
}
