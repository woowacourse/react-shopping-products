import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItem } from "../api/cart";
import { QUERY_KEYS } from "../constants";

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};
