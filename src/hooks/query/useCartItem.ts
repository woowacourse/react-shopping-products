import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

interface Props {
  errorHandler: (err: unknown) => void;
}

export default function useCartItems({ errorHandler }: Props) {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: async () => {
      return ShoppingCartFetcher.getCartItems().catch(error => {
        if (!(error instanceof HTTPError))
          throw new Error(ERROR_MESSAGE.clientNetwork);
        if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
      });
    },
    onError: errorHandler,
  });

  const getCartItemByProductId = useCallback(
    (productId: number) => {
      return cartItems?.find(cartItem => cartItem.product.id === productId);
    },
    [cartItems]
  );

  return { cartItems, getCartItemByProductId, isLoading };
}
