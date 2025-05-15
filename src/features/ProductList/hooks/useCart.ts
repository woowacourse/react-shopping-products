import { useCallback, useContext, useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, getCartItemList } from '@/api/cart';
import { ToastContext } from '@/shared/context/ToastProvider';

import { CartItem } from '../types/Cart';

export const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const fetchCartProductData = useCallback(async () => {
    try {
      setIsLoading(true);
      const cart = await getCartItemList({
        page: 0,
        size: 50,
        sort: '',
      });

      setCartData(cart);
      return cart;
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      try {
        const data = await addCartItem({ productId, quantity });
        setCartData(data);
        return data.length;
      } catch (error) {
        showToast((error as Error).message);
        return cartData;
      }
    },
    [cartData, showToast]
  );

  const deleteFromCart = useCallback(
    async (cartItemId: number) => {
      try {
        const data = await deleteCartItem(cartItemId);
        setCartData(data);
        return data.length;
      } catch (error) {
        showToast((error as Error).message);
        return cartData;
      }
    },
    [cartData, showToast]
  );

  useEffect(() => {
    fetchCartProductData();
  }, [fetchCartProductData]);

  return {
    cartData,
    isLoading,
    addToCart,
    deleteFromCart,
  };
};
