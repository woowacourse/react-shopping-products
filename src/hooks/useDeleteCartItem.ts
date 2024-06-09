import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cartItems";
import { ICartItem } from "../types/cartItems";
import { ERROR_MESSAGE } from "../constants/errorMessage/ko";
import QUERY_KEYS from "../constants/queryKeys";

export const useDeleteCartItemByProductId = () => {
  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData<ICartItem[]>([QUERY_KEYS.cartItem]);

  return useMutation({
    mutationFn: (productId: number) => {
      const targetItem = cartItems?.find((item) => item.product.id === productId);
      if (targetItem) {
        return deleteCartItem(targetItem.id);
      }
      throw new Error(ERROR_MESSAGE.deleteCartItem);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] }),
  });
};

export const useDeleteCartItemByCartId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] });
    },
  });
};
