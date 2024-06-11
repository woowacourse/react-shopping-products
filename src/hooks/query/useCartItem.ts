import { CartItem } from '@appTypes/product';
import ERROR_MESSAGE from '@constants/errorMessage';
import QUERY_KEYS from '@hooks/queryKeys';
import { getCartItems } from '@apis/ShoppingCartFetcher';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function useCartItems() {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: async () => {
      return getCartItems()
        .then(response => {
          if (500 <= response.status) throw new Error(ERROR_MESSAGE.server);
          if (400 <= response.status)
            throw new Error(ERROR_MESSAGE.missingCartItem);
          return response.json();
        })
        .catch(() => {
          throw new Error(ERROR_MESSAGE.clientNetwork);
        })
        .then(data => {
          return data.content as CartItem[];
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
