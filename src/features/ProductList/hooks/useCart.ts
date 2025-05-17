import { useCallback, useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, getCartItemList } from '@/api/cart';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { CartItem } from '../types/Cart';

export const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { handleRequest } = useApiRequest();

  const fetchCartProductData = useCallback(async () => {
    return handleRequest({
      apiCall: () =>
        getCartItemList({
          page: 0,
          size: 50,
        }),
      onSuccess: (data) => {
        setCartData(data);
        return data;
      },
    });
  }, [handleRequest]);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      return handleRequest({
        apiCall: () =>
          addCartItem({
            productId,
            quantity,
          }),
        onSuccess: (data) => {
          setCartData(data);
          return data.length;
        },
      });
    },
    [handleRequest]
  );

  const deleteFromCart = useCallback(
    async (cartItemId: number) => {
      return handleRequest({
        apiCall: () => deleteCartItem(cartItemId),
        onSuccess: (data) => {
          setCartData(data);
          return data.length;
        },
      });
    },
    [handleRequest]
  );

  useEffect(() => {
    fetchCartProductData();
  }, [fetchCartProductData]);

  return {
    cartData,
    addToCart,
    deleteFromCart,
  };
};
