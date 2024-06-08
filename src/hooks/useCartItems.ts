import { useQuery } from '@tanstack/react-query';

import { fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';
import useAdjustCartItemQuantity from './useAdjustCartItemQuantity';

const useCartItems = () => {
  const { data: cartItems } = useQuery<CartItemInfo[]>({
    queryKey: ['fetchCartItems'],
    queryFn: fetchCartItems,
  });

  const { addCartItemMutation, adjustCartItemQuantityMutation } = useAdjustCartItemQuantity();

  const matchCartItem = (productId: number) => {
    return cartItems?.find((cartItem) => cartItem.product.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    return cartItems?.map((cartItem) => {
      if (cartItem.product.id === productId) return cartItem.quantity;
    });
  };

  return {
    cartItems,
    addCartItemMutation,
    adjustCartItemQuantityMutation,
    matchCartItem,
    getCartItemQuantity,
  };
};

export default useCartItems;
