import { useMutation, useQueryClient } from 'react-query';

import { CartItem } from '@appTypes/product';
import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

export default function useIncreaseCartItemQuantity() {
  const queryClient = useQueryClient();

  const { showToast } = useToastContext();

  return useMutation({
    mutationFn: (cartItemId: number) => {
      const cartItems = queryClient.getQueryData<CartItem[]>(
        QUERY_KEYS.cartItems
      );
      const targetCartItems = cartItems?.find(item => item.id === cartItemId);
      if (!targetCartItems) throw new Error('존재하지 않는 아이디입니다.');

      return ShoppingCartFetcher.updateCartItemQuantity(
        cartItemId,
        targetCartItems.quantity + 1
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: () => showToast('수량 업데이트에 실패했습니다'),
  });
}
