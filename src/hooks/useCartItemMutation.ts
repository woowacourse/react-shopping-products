import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductInCart,
  postProductInCart,
  updateCartItemQuantity,
} from "../api";
import { QUERY_KEYS } from "../constants/queryKeys";

const useCartItemMutation = () => {
  const queryClient = useQueryClient();

  const appendCartItemMutation = useMutation({
    mutationFn: ({ productId }: { productId: number }) =>
      postProductInCart({ productId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => updateCartItemQuantity({ cartItemId, quantity }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) =>
      deleteProductInCart({ cartItemId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
  });

  const appendProductInCart = async (productId: number) => {
    appendCartItemMutation.mutate({ productId });
  };

  const handleDecreaseQuantityButtonClick = (cartItem: CartItem) => {
    if (cartItem.quantity < 2) {
      return;
    }
    updateQuantityMutation.mutate({
      cartItemId: cartItem.id,
      quantity: cartItem.quantity - 1,
    });
  };

  const handleIncreaseQuantityButtonClick = (cartItem: CartItem) => {
    updateQuantityMutation.mutate({
      cartItemId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  };

  const handleRemoveItemButtonClick = (cartItem: CartItem) => {
    removeItemMutation.mutate({ cartItemId: cartItem.id });
  };

  return {
    appendProductInCart,
    handleDecreaseQuantityButtonClick,
    handleIncreaseQuantityButtonClick,
    handleRemoveItemButtonClick,
  };
};

export default useCartItemMutation;
