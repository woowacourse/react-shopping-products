import { useMutation, useQueryClient } from 'react-query';

import { CartItem } from '@appTypes/product';
import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';

interface Props {
  errorHandler: (err: unknown) => void;
}

export default function useDecreaseCartItemQuantity({ errorHandler }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: number) => {
      const cartItems = queryClient.getQueryData<CartItem[]>(
        QUERY_KEYS.cartItems
      );
      const targetCartItems = cartItems?.find(item => item.id === cartItemId);
      if (!targetCartItems) throw new Error('존재하지 않는 아이디입니다.');

      return ShoppingCartFetcher.updateCartItemQuantity(
        cartItemId,
        Math.max(targetCartItems.quantity - 1, 1)
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: errorHandler,
  });
}
