import { useMutation, useQueryClient } from '@tanstack/react-query';

import ERROR_MESSAGE from '@constants/errorMessage';
import QUERY_KEYS from '@hooks/queryKeys';
import { updateCartItemQuantity } from '@apis/ShoppingCartFetcher';

const MAX_QUANTITY = 2 ** 31 - 1;
export default function useChangeCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => {
      if (quantity < 1) return;
      if (quantity > MAX_QUANTITY) return;
      return updateCartItemQuantity(cartItemId, Math.floor(quantity))
        .catch(() => {
          throw new Error(ERROR_MESSAGE.clientNetwork);
        })
        .then((response: Response) => {
          if (500 <= response.status) throw new Error(ERROR_MESSAGE.server);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });
}
