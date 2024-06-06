import { deleteCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "./__constants__/queryKeys";
import { queryClient } from "./queryClient";

interface UseDeleteCartItemMutationReturn {
  deleteCartItemMutation: (cartItemId: number) => void;
}

type OnError = (error: Error) => void;

export const useDeleteCartItemMutation = (onError?: OnError): UseDeleteCartItemMutationReturn => {
  const invalidateCartItems = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
  };

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.deleteCartItem],
    mutationFn: deleteCartItem,
    onSuccess: invalidateCartItems,
    onError,
  });

  const deleteCartItemMutation = (cartItemId: number) => {
    mutate(cartItemId);
  };

  return { deleteCartItemMutation };
};
