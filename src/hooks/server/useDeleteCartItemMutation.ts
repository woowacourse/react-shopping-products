import { deleteCartItem } from "@src/apis/cartItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../__constants__/queryKeys";

interface UseDeleteCartItemMutationReturn {
  deleteCartItemMutation: (cartItemId: number) => void;
}

export type OnError = (error: Error) => void;

export const useDeleteCartItemMutation = (onError?: OnError): UseDeleteCartItemMutationReturn => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.removeCartItem],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError,
  });

  const deleteCartItemMutation = (cartItemId: number) => {
    mutate(cartItemId);
  };

  return { deleteCartItemMutation };
};
