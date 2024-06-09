import { useQuery } from '@tanstack/react-query';

import useAdjustCartItemQuantity from './useAdjustCartItemQuantity';

import { fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

const useCartItemList = () => {
  const { data: cartItemList } = useQuery<CartItemInfo[]>({
    queryKey: ['fetchCartItems'],
    queryFn: fetchCartItems,
  });

  const { deleteCartItemMutation, addCartItemMutation, adjustCartItemQuantityMutation } =
    useAdjustCartItemQuantity();

  const matchCartItem = (productId: number) => {
    return cartItemList?.find((cartItem) => cartItem.product.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    const cartItem = cartItemList?.find((cartItem) => cartItem.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const totalCartItemPrice = cartItemList?.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.product.price * cartItem.quantity;
  }, 0);

  return {
    cartItemList,
    deleteCartItemMutation,
    addCartItemMutation,
    adjustCartItemQuantityMutation,
    matchCartItem,
    getCartItemQuantity,
    totalCartItemPrice,
  };
};

export default useCartItemList;
