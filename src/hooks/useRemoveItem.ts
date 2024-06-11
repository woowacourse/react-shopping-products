import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cart";
import { CART_KEYS } from "../constants";

export const useRemoveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] });
    },
  });
};
