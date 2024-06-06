import { useMutation } from "@tanstack/react-query";
import { UpdateCartItemParams, updateCartItem } from "@src/apis/cartItems";
import { MUTATION_KEYS, QUERY_KEYS } from "@server/__constants__/queryKeys";
import { queryClient } from "@server/queryClient";

interface UseUpdateCartItemMutationReturn {
  updateCartItemMutation: (params: UpdateCartItemParams) => void;
}

type OnError = (error: Error) => void;

export const useUpdateCartItemMutation = (onError?: OnError): UseUpdateCartItemMutationReturn => {
  const invalidateCartItems = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
  };

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.deleteCartItem],
    mutationFn: updateCartItem,
    onSuccess: invalidateCartItems,
    onError,
  });

  const updateCartItemMutation = (params: UpdateCartItemParams) => {
    mutate(params);
  };

  return { updateCartItemMutation };
};
