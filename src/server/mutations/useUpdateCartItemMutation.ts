import { useMutation } from "@tanstack/react-query";
import { UpdateCartItemParams, updateCartItem } from "@src/apis/cartItems";
import { MUTATION_KEYS } from "@server/__constants__/queryKeys";
import { queryInvalidator } from "../queryClient";
import type { OnError } from "onError";

interface UseUpdateCartItemMutationReturn {
  updateCartItemMutation: (params: UpdateCartItemParams) => void;
}

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
