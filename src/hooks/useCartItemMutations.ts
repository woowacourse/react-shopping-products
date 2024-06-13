import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestUpdateCartItemQuantity,
} from "../apis/cartItems";

import { Product } from "../interfaces/Product";
import { QUERY_KEYS } from "../constants/queryKeys";

export default function useCartItemMutations() {
  const queryClient = useQueryClient();

  const addCartItem = useMutation({
    mutationFn: (product: Product) => requestAddCartItem(product.id, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItemList] });
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (cartItemId: number) => requestDeleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItemList] });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItemList] });
    },
  });
  return {
    mutateError:
      addCartItem.error || deleteCartItem.error || updateCartItemQuantity.error,
    addCartItem,
    deleteCartItem,
    updateCartItemQuantity,
  };
}
