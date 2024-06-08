import { useMutation, useQueryClient } from '@tanstack/react-query';

import QUERY_KEYS from '@hooks/queryKeys';
import { updateCartItemQuantity } from '@apis/ShoppingCartFetcher';

const formatNumberToPositiveInt32 = (number: number) => {
  if (number < 1) return 1;
  if (number > 2 ** 32 - 1) return 2 ** 32 - 1;
  return Math.floor(number);
};

export default function useChangeCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => {
      const intQuantity = formatNumberToPositiveInt32(quantity);
      return updateCartItemQuantity(cartItemId, intQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });
}
