import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, modifyCartItem, deleteCartItem } from "../../api/cartItems";
import { CartItemType } from "../../types/cartItems";
import { useCallback } from "react";

function useCartItemQuantity() {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItemType[]>({ queryKey: ["cartItems"], queryFn: getCartItems });

  const updateQuantityMutation = useMutation({
    mutationFn: (item: { cartId: number; quantity: number }) => modifyCartItem(item.cartId, item.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

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
