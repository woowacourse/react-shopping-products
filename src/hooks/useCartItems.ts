import { useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';
import { ErrorState } from '@/types/error';
import CustomError from '@/utils/error';

interface UseCartItemsProp {
  handleError: ({ name, isError, errorMessage }: ErrorState) => void;
  resetError: () => void;
}

const useCartItems = ({ handleError, resetError }: UseCartItemsProp) => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (productId: number) => {
    try {
      await addCartItem({ productId });
      await refreshCartItems();
      resetError();
    } catch (error) {
      if (error instanceof CustomError) {
        handleError({ isError: true, name: error.name, errorMessage: error.message });
      }
    }
  };

  const handleDeleteCartItem = async (productId: number) => {
    try {
      const matchedCartItemInfo = matchCartItem(productId);
      const cartItemId = matchedCartItemInfo!.id;

      await deleteCartItem(cartItemId);
      await refreshCartItems();
      resetError();
    } catch (error) {
      if (error instanceof CustomError) {
        handleError({ isError: true, name: error.name, errorMessage: error.message });
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
