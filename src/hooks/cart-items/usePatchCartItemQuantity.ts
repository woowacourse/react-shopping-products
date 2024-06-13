import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchCartItemQuantity } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";
import { CartItem } from "../../types/cartItem";

interface UsePatchCartItemQuantityResult {
  handleIncreaseQuantity: (cartItemId: number, cartItemQuantity: number) => void;
  handleDecreaseQuantity: (cartItemId: number, cartItemQuantity: number) => void;
  error: unknown;
}

export default function usePatchCartItemQuantity(): UsePatchCartItemQuantityResult {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: patchCartItemQuantity,
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.cartItems] });

      const prevCartItem = queryClient.getQueryData<CartItem[]>([QUERY_KEYS.cartItems]);

      queryClient.setQueryData([QUERY_KEYS.cartItems], (prevData: CartItem[]) => {
        const nextCartItem = prevData.map((cartItem) => {
          return cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem;
        });

        return nextCartItem;
      });

      return { prevCartItem };
    },
    onError(_, __, context) {
      if (context?.prevCartItem) {
        queryClient.setQueryData([QUERY_KEYS.cartItems], context.prevCartItem);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  const handleIncreaseQuantity = (cartItemId: number, currentQuantity: number) => {
    mutate({ cartItemId, quantity: currentQuantity + 1 });
  };

  const handleDecreaseQuantity = (cartItemId: number, currentQuantity: number) => {
    mutate({ cartItemId, quantity: currentQuantity - 1 });
  };

  return {
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    error,
  };
}
