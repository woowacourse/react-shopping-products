import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cartItems";
import { CartItemType } from "../types/cartItems";
import { ERROR_MESSAGE } from "../constants/errorMessage/ko";

export const useDeleteCartItemByProductId = () => {
  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData<CartItemType[]>(["cartItems"]);

  return useMutation({
    mutationFn: (productId: number) => {
      const targetItem = cartItems?.find((item) => item.product.id === productId);
      if (targetItem) {
        return deleteCartItem(targetItem.id);
      }
      throw new Error(ERROR_MESSAGE.deleteCartItem);
    },
    //TODO: onError에서 에러 핸들링
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartItems"] }),
  });
};

export const useDeleteCartItemByCartId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};
