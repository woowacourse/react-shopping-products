import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItem } from "../api/cart";
import { CART_KEYS } from "../constants";

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.CART] });
    },
  });
};
