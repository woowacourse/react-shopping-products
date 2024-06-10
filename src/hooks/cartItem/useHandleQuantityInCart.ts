import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../constants/queryKeys";
import { patchCartItem } from "../../api/cartItems";

const useHandleQuantityInCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      patchCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
};

export default useHandleQuantityInCart;
