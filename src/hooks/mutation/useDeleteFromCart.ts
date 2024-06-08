import { useMutation, useQueryClient } from '@tanstack/react-query';

import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import { deleteCartItem } from '@apis/ShoppingCartFetcher';

const mutationFn = async (id: number) => {
  return deleteCartItem(id).catch(error => {
    if (!(error instanceof HTTPError))
      throw new Error(ERROR_MESSAGE.clientNetwork);
    if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
    if (400 <= error.statusCode) throw new Error(ERROR_MESSAGE.missingCartItem);
  });
};

export default function useDeleteFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });
}
