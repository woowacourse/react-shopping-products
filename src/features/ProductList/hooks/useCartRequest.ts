import { useCallback } from 'react';

import { addCartItem, deleteCartItem, getCartItemList, setCartQuantity } from '@/api/cart';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { CartItem } from '../types/Cart';

export const useCartRequest = (setCartData: (data: CartItem[]) => void) => {
  const { handleRequest } = useApiRequest();

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
  }, [handleRequest, setCartData]);

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
    [handleRequest, setCartData]
  );

  const increaseQuantity = useCallback(
    async (cartItemId: number, currentQuantity: number) => {
      return handleRequest(
        () => setCartQuantity({ cartItemId, quantity: currentQuantity + 1 }),
        (data) => {
          setCartData(data);
          return data.length;
        }
      );
    },
    [handleRequest, setCartData]
  );

  const decreaseQuantity = useCallback(
    async (cartItemId: number, currentQuantity: number) => {
      return handleRequest(
        () => setCartQuantity({ cartItemId, quantity: currentQuantity - 1 }),
        (data) => {
          setCartData(data);
          return data.length;
        }
      );
    },
    [handleRequest, setCartData]
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
    [handleRequest, setCartData]
  );

  return {
    fetchCartProductData,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
  };
};
