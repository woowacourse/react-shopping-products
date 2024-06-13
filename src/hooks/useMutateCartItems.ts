import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AddCartItemArgs,
  RemoveCartItemArgs,
  UpdateCartItemArgs,
  addCartItem,
  removeCartItem,
  updateCartItem,
} from '@_api/cart';
import { QUERY_KEYS } from '@_constants/queryKeys';
import { useToast } from './useToast';
import { ERROR_MESSAGE } from '@_constants/message';

export function useMutateCartItems() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem({ productId }),
    onError: () => {
      showToast(ERROR_MESSAGE.addToCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemId: number) => removeCartItem({ cartItemId }),
    onError: () => {
      showToast(ERROR_MESSAGE.removeFromCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateCartItemArgs) => updateCartItem({ cartItemId, quantity }),
    onError: () => {
      showToast(ERROR_MESSAGE.updateQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });

  const addItemToCart = ({ productId }: AddCartItemArgs) => {
    addMutation.mutate(productId);
  };

  const removeItemFromCart = ({ cartItemId }: RemoveCartItemArgs) => {
    removeMutation.mutate(cartItemId);
  };

  const updateCartItemQuantity = ({ cartItemId, quantity }: UpdateCartItemArgs) => {
    updateMutation.mutate({ cartItemId, quantity });
  };

  return { addItemToCart, removeItemFromCart, updateCartItemQuantity };
}
