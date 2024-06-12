import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCartItemQuantityChange } from "../api/cart";
import { QUERY_KEYS } from "../constants";

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItemQuantityChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};
