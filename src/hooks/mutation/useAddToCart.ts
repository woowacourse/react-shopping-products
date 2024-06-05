import { useMutation, useQueryClient } from 'react-query';

import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import { addProduct } from '@apis/ShoppingCartFetcher';

interface Props {
  errorHandler: (err: unknown) => void;
}
export default function useAddToCart({ errorHandler }: Props) {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      return addProduct(id).catch(error => {
        if (!(error instanceof HTTPError))
          throw new Error(ERROR_MESSAGE.clientNetwork);
        if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
        if (400 <= error.statusCode) throw new Error(ERROR_MESSAGE.hadCartItem);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
      },
      onError: errorHandler,
    }
  );
}
