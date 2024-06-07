import { useMutation } from "@tanstack/react-query";
import { UpdateCartItemParams, updateCartItem } from "@src/apis/cartItems";
import { MUTATION_KEYS } from "@server/__constants__/queryKeys";
import { queryInvalidator } from "../queryClient";

interface UseUpdateCartItemMutationReturn {
  updateCartItemMutation: (params: UpdateCartItemParams) => void;
}

type OnError = (error: Error) => void;

export const useUpdateCartItemMutation = (onError?: OnError): UseUpdateCartItemMutationReturn => {
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.updateCartItem],
    mutationFn: updateCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });

  const updateCartItemMutation = (params: UpdateCartItemParams) => {
    mutate(params);
  };

  return { updateCartItemMutation };
};
