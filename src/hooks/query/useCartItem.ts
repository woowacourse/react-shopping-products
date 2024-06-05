import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

interface Props {
  errorHandler: (err: unknown) => void;
}

export default function useCartItems({ errorHandler }: Props) {
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: ShoppingCartFetcher.getCartItems,
    onError: errorHandler,
  });

  const getCartItemByProductId = useCallback(
    (productId: number) => {
      return cartItems?.find(cartItem => cartItem.product.id === productId);
    },
    [cartItems]
  );

  return { cartItems, getCartItemByProductId, isLoading, error };
}
