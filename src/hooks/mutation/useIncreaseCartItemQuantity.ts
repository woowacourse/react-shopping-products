import { useMutation, useQueryClient } from 'react-query';

import { CartItem } from '@appTypes/product';
import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';

interface Props {
  errorHandler: (err: unknown) => void;
}

export default function useIncreaseCartItemQuantity({ errorHandler }: Props) {
  const queryClient = useQueryClient();

  const mutationFn = async (cartItemId: number) => {
    const cartItems = queryClient.getQueryData<CartItem[]>(
      QUERY_KEYS.cartItems
    );
    const targetCartItems = cartItems?.find(item => item.id === cartItemId);
    if (!targetCartItems) throw new Error(ERROR_MESSAGE.missingCartItem);

    return ShoppingCartFetcher.updateCartItemQuantity(
      cartItemId,
      targetCartItems.quantity + 1
    ).catch(error => {
      if (!(error instanceof HTTPError))
        throw new Error(ERROR_MESSAGE.clientNetwork);
      if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
      if (400 <= error.statusCode)
        throw new Error(ERROR_MESSAGE.missingCartItem);
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: errorHandler,
  });
}
