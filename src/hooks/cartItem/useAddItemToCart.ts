import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../constants/queryKeys";
import { postCartItems } from "../../api/cartItems";

const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) =>
      postCartItems({ productId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
};

export default useAddItemToCart;
