import { useMutation, useQueryClient } from '@tanstack/react-query';

import ERROR_MESSAGE from '@constants/errorMessage';
import QUERY_KEYS from '@hooks/queryKeys';
import { addProduct } from '@apis/ShoppingCartFetcher';

const mutationFn = async (id: number) => {
  return addProduct(id)
    .catch(() => {
      throw new Error(ERROR_MESSAGE.clientNetwork);
    })
    .then((response: Response) => {
      if (500 <= response.status) throw new Error(ERROR_MESSAGE.server);
      if (400 <= response.status) throw new Error(ERROR_MESSAGE.hadCartItem);
    });
};
export default function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });
}
