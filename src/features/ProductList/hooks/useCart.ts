import { useCallback, useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, getCartItemList } from '@/api/cart';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { CartItem } from '../types/Cart';

export const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { isLoading, handleRequest } = useApiRequest();

  const fetchCartProductData = useCallback(async () => {
    return handleRequest(
      () =>
        getCartItemList({
          page: 0,
          size: 50,
        }),
      (data) => {
        setCartData(data);
        return data;
      }
    );
  }, [handleRequest]);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      return handleRequest(
        () =>
          addCartItem({
            productId,
            quantity,
          }),
        (data) => {
          setCartData(data);
          return data.length;
        }
      );
    },
    [handleRequest]
  );

  const deleteFromCart = useCallback(
    async (cartItemId: number) => {
      return handleRequest(
        () => deleteCartItem(cartItemId),
        (data) => {
          setCartData(data);
          return data.length;
        }
      );
    },
    [handleRequest]
  );

  useEffect(() => {
    fetchCartProductData();
  }, [fetchCartProductData]);

  return {
    isLoading,
    cartData,
    addToCart,
    deleteFromCart,
  };
};
