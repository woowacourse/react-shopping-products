import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  requestAddCartItem,
  requestUpdateCartItemQuantity,
} from "../apis/cartItems";

import { Product } from "../interfaces/Product";

export default function useCartItem() {
  const queryClient = useQueryClient();
  const addCartItem = useMutation({
    mutationFn: (product: Product) => requestAddCartItem(product.id, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  const updateCartItemQuantity = useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => requestUpdateCartItemQuantity({ cartItemId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  return {
    addCartItem,
    updateCartItemQuantity,
  };
}
