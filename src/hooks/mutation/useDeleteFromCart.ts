import { useMutation, useQueryClient } from 'react-query';

import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';

interface Props {
  errorHandler: (err: unknown) => void;
}

export default function useDeleteFromCart({ errorHandler }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ShoppingCartFetcher.deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: errorHandler,
  });
}
