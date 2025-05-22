import { useCallback, useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, getCartItemList, updateCartItem } from '@/api/cart';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { CartItem } from '../types/Cart';

export const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { handleRequest } = useApiRequest();

  const fetchCartProductData = useCallback(async () => {
    try {
      const cartProductData = handleRequest({
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
      return cartProductData;
    } catch (error) {
      return [];
    }
  }, [handleRequest]);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      try {
        const addRequest = handleRequest({
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
        return addRequest;
      } catch (error) {
        return [];
      }
    },
    [handleRequest]
  );

  const updateToCart = useCallback(
    async (productId: number, quantity: number) => {
      console.log('productId', productId);
      try {
        const patchRequest = handleRequest({
          apiCall: () => updateCartItem(productId, quantity),
          onSuccess: (data) => {
            setCartData(data);
            return data.length;
          },
        });
        return patchRequest;
      } catch (error) {
        return [];
      }
    },
    [handleRequest]
  );

  const deleteFromCart = useCallback(
    async (cartItemId: number) => {
      try {
        const deleteRequest = handleRequest({
          apiCall: () => deleteCartItem(cartItemId),
          onSuccess: (data) => {
            setCartData(data);
            return data.length;
          },
        });
        return deleteRequest;
      } catch (error) {
        return [];
      }
    },
    [handleRequest]
  );

  useEffect(() => {
    fetchCartProductData();
  }, [fetchCartProductData]);

  return {
    cartData,
    addToCart,
    updateToCart,
    deleteFromCart,
  };
};
