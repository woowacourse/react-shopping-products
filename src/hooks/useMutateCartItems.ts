import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AddCartItemArgs,
  RemoveCartItemArgs,
  UpdateCartItemArgs,
  addCartItem,
  removeCartItem,
  updateCartItem,
} from '@_api/cart';

export function useMutateCartItems() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem({ productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemId: number) => removeCartItem({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateCartItemArgs) => updateCartItem({ cartItemId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
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
