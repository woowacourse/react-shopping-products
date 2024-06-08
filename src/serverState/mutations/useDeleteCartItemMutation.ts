import { deleteCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@serverState/__constants__/queryKeys";
import { queryInvalidator } from "@serverState/queryClient";
import type { OnError } from "onError";

export const useDeleteCartItemMutation = (onError?: OnError) => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.deleteCartItem],
    mutationFn: deleteCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });
};
