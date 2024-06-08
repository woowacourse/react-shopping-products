import { useQuery } from '@tanstack/react-query';

import useAdjustCartItemQuantity from './useAdjustCartItemQuantity';

import { fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

const useCartItems = () => {
  const { data: cartItems } = useQuery<CartItemInfo[]>({
    queryKey: ['fetchCartItems'],
    queryFn: fetchCartItems,
  });

  const { deleteCartItemMutation, addCartItemMutation, adjustCartItemQuantityMutation } =
    useAdjustCartItemQuantity();

  const matchCartItem = (productId: number) => {
    return cartItems?.find((cartItem) => cartItem.product.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    return cartItems?.map((cartItem) => {
      if (cartItem.product.id === productId) return cartItem.quantity;
    });
  };

  const totalCartItemPrice = cartItems?.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.product.price * cartItem.quantity;
  }, 0);

  return {
    cartItems,
    deleteCartItemMutation,
    addCartItemMutation,
    adjustCartItemQuantityMutation,
    matchCartItem,
    getCartItemQuantity,
    totalCartItemPrice,
  };
};

export default useCartItems;
