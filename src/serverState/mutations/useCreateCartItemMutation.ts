import { CreateCartItemParams, createCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@serverState/__constants__/queryKeys";
import { queryInvalidator } from "@serverState/queryClient";
import type { OnError } from "onError";

export const useCreateCartItemMutation = (onError?: OnError) => {
  return useMutation<void, Error, CreateCartItemParams>({
    mutationKey: [MUTATION_KEYS.createCartItem],
    mutationFn: createCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });
};
