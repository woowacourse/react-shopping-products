import { deleteCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@server/__constants__/queryKeys";
import { queryInvalidator } from "@server/queryClient";

interface UseDeleteCartItemMutationReturn {
  deleteCartItemMutation: (cartItemId: number) => void;
}

type OnError = (error: Error) => void;

export const useDeleteCartItemMutation = (onError?: OnError): UseDeleteCartItemMutationReturn => {
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.deleteCartItem],
    mutationFn: deleteCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });

  const deleteCartItemMutation = (cartItemId: number) => {
    mutate(cartItemId);
  };

  return { deleteCartItemMutation };
};
