import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../constants/queryKeys";
import { deleteCartItems } from "../../api/cartItems";

const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetCartItemId: number) => deleteCartItems(targetCartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
};

export default useRemoveItemFromCart;
