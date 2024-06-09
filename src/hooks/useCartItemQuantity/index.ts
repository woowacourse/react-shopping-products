import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, modifyCartItem } from "../../api/cartItems";
import { CartItemType } from "../../types/cartItems";
import { useCallback } from "react";
import { useDeleteCartItemByCartId } from "../useDeleteCartItem";
import QUERY_KEYS from "../../constants/queryKeys";

function useCartItemQuantity() {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItemType[]>({ queryKey: [QUERY_KEYS.cartItem], queryFn: getCartItems, staleTime: 30 * 1000 });

  const updateQuantityMutation = useMutation({
    mutationFn: (item: { cartId: number; quantity: number }) => modifyCartItem(item.cartId, item.quantity),
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.cartItem] });
      const previousItems = queryClient.getQueryData<CartItemType[]>([QUERY_KEYS.cartItem]);
      queryClient.setQueryData<CartItemType[]>([QUERY_KEYS.cartItem], (prev) =>
        prev?.map((cartItem) => (cartItem.id === item.cartId ? { ...cartItem, quantity: item.quantity } : cartItem))
      );
      return { previousItems };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([QUERY_KEYS.cartItem], context?.previousItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] });
    },
  });

  const deleteItemMutation = useDeleteCartItemByCartId();

  const increaseQuantity = useCallback(
    (cartId: number) => {
      const item = cartItems?.find((item: CartItemType) => item.id === cartId);
      if (item) {
        updateQuantityMutation.mutate({ cartId: item.id, quantity: item.quantity + 1 });
      }
    },
    [cartItems, updateQuantityMutation]
  );

  const decreaseQuantity = useCallback(
    (cartId: number) => {
      const item = cartItems?.find((item: CartItemType) => item.id === cartId);
      if (item) {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) {
          updateQuantityMutation.mutate({ cartId, quantity: newQuantity });
        } else {
          deleteItemMutation.mutate(cartId);
        }
      }
    },
    [cartItems, deleteItemMutation, updateQuantityMutation]
  );

  return {
    cartItems: cartItems || [],
    increaseQuantity,
    decreaseQuantity,
    deleteItemMutation,
    isLoading,
    error,
  };
}

export default useCartItemQuantity;
