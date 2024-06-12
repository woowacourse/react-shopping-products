import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cart";
import { QUERY_KEYS } from "../constants";

export const useRemoveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};
