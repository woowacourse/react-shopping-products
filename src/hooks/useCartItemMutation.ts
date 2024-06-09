import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductInCart,
  postProductInCart,
  updateCartItemQuantity,
} from "../api";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useErrorContext } from "./useErrorContext";

const useCartItemMutation = () => {
  const appendCartItemMutation = useAppendCartItemMutation();
  const updateQuantityMutation = useUpdateQuantityMutation();
  const removeItemMutation = useRemoveItemMutation();

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

const useAppendCartItemMutation = () => {
  const { showError } = useErrorContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }: { productId: number }) =>
      postProductInCart({ productId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
    onError: showError,
  });
};

const useUpdateQuantityMutation = () => {
  const { showError } = useErrorContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => updateCartItemQuantity({ cartItemId, quantity }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
    onError: showError,
  });
};

const useRemoveItemMutation = () => {
  const { showError } = useErrorContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) =>
      deleteProductInCart({ cartItemId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
    onError: showError,
  });
};
