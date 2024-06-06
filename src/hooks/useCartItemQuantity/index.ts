import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, modifyCartItem, deleteCartItem } from "../../api/cartItems";
import { CartItem } from "../../types/cartItems";
import { useCallback } from "react";

function useCartItemQuantity() {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItem[]>({ queryKey: ["cartItems"], queryFn: getCartItems });

  const updateQuantityMutation = useMutation({
    mutationFn: (item: { productId: number; quantity: number }) => modifyCartItem(item.productId, item.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (productId: number) => deleteCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const increaseQuantity = useCallback(
    (productId: number) => {
      const item = cartItems?.find((item: CartItem) => item.product.id === productId);
      if (item) {
        updateQuantityMutation.mutate({ productId, quantity: item.quantity + 1 });
      }
    },
    [cartItems, updateQuantityMutation]
  );

  const decreaseQuantity = useCallback(
    (productId: number) => {
      const item = cartItems?.find((item: CartItem) => item.product.id === productId);
      if (item) {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) {
          updateQuantityMutation.mutate({ productId, quantity: newQuantity });
        } else {
          deleteItemMutation.mutate(productId);
        }
      }
    },
    [cartItems, deleteItemMutation, updateQuantityMutation]
  );

  return {
    cartItems: cartItems || [],
    increaseQuantity,
    decreaseQuantity,
    isLoading,
    error,
  };
}

export default useCartItemQuantity;
