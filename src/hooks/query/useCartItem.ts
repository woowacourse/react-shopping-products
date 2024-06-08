import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import { getCartItems } from '@apis/ShoppingCartFetcher';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function useCartItems() {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: async () => {
      return getCartItems().catch(error => {
        if (!(error instanceof HTTPError))
          throw new Error(ERROR_MESSAGE.clientNetwork);
        if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
      });
    },
  });

  const getCartItemByProductId = useCallback(
    (productId: number) => {
      return cartItems?.find(cartItem => cartItem.product.id === productId);
    },
    [cartItems]
  );

  return { cartItems, getCartItemByProductId, isLoading };
}
