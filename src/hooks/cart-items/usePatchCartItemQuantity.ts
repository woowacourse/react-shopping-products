import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToasts from "../useToasts";

import { patchCartItemQuantity } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";
import { CartItem } from "../../types/cartItem";

export default function usePatchCartItemQuantity() {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { mutate } = useMutation({
    networkMode: "always",
    retry: false,
    mutationFn: patchCartItemQuantity,
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.cartItems] });

      const prevCartItem = queryClient.getQueryData<CartItem[]>([QUERY_KEYS.cartItems]);

      queryClient.setQueryData([QUERY_KEYS.cartItems], (prevData: CartItem[]) => {
        const nextCartItem = prevData.map((cartItem) => {
          return cartItem.product.id === productId ? { ...cartItem, quantity } : cartItem;
        });

        return nextCartItem;
      });

      return { prevCartItem };
    },
    onError(error, _, context) {
      if (error instanceof Error) {
        addToast(error.message);
      }
      if (context?.prevCartItem) {
        queryClient.setQueryData([QUERY_KEYS.cartItems], context.prevCartItem);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  const handleIncreaseQuantity = (productId: number, currentQuantity: number) => {
    mutate({ productId, quantity: currentQuantity + 1 });
  };

  const handleDecreaseQuantity = (productId: number, currentQuantity: number) => {
    mutate({ productId, quantity: currentQuantity - 1 });
  };

  return {
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
}
