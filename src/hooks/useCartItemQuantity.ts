import { CartItem } from '../types/type';

import useAddCartItem from './useAddCartItem';
import useDeleteCartItem from './useDeleteCartItem';
import usePatchCartItem from './usePatchCartItem';

const useCartItemQuantity = (cartItem: CartItem) => {
  const { quantity } = cartItem;

  const addCartItemMutation = useAddCartItem();
  const deleteCartItemMutation = useDeleteCartItem();
  const patchCartItemMutation = usePatchCartItem();

  const handleIncreaseQuantity = () => {
    if (!cartItem) return;
    patchCartItemMutation.mutate({
      cartItemId: cartItem.id,
      quantity: quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (!cartItem) return;
    if (quantity === 1) {
      deleteCartItemMutation.mutate({ cartItemId: cartItem.id });

      return;
    }
    patchCartItemMutation.mutate({
      cartItemId: cartItem.id,
      quantity: quantity - 1,
    });
  };

  const handleAddCartItem = () => {
    addCartItemMutation.mutate({
      productId: cartItem.product.id,
      quantity: 1,
    });
  };

  const handleDeleteCartItem = () => {
    deleteCartItemMutation.mutate({ cartItemId: cartItem.id });
  };

  return {
    quantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleAddCartItem,
    handleDeleteCartItem,
  };
};

export default useCartItemQuantity;
