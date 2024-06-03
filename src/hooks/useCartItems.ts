import { useEffect, useState } from 'react';

import useToast from './useToast';

import { addCartItem, deleteCartItem, fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';
import CustomError from '@/utils/error';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);
  const toast = useToast();

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (productId: number) => {
    try {
      await addCartItem({ productId });
      await refreshCartItems();
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteCartItem = async (productId: number) => {
    try {
      const matchedCartItemInfo = matchCartItem(productId);
      const cartItemId = matchedCartItemInfo!.id;

      await deleteCartItem(cartItemId);
      await refreshCartItems();
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message);
      }
    }
  };

  const refreshCartItems = async () => {
    const data = await fetchCartItems();
    setCartItems(data);
  };

  useEffect(() => {
    refreshCartItems();
  }, []);

  return { cartItems, handleAddCartItem, handleDeleteCartItem, matchCartItem };
};

export default useCartItems;
