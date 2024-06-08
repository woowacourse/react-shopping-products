import { useMutation } from "@tanstack/react-query";
import { updateCartItem } from "@src/apis/cartItems";
import { MUTATION_KEYS } from "@server/__constants__/queryKeys";
import { queryInvalidator } from "../queryClient";
import type { OnError } from "onError";

export const useUpdateCartItemMutation = (onError?: OnError) => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.updateCartItem],
    mutationFn: updateCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });
};
