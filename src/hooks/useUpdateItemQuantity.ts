import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCartItemQuantityChange } from "../api/cart";
import { CART_KEYS } from "../constants";

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItemQuantityChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] });
    },
  });
};
