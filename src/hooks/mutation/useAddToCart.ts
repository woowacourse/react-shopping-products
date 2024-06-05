import { useMutation, useQueryClient } from 'react-query';

import QUERY_KEYS from '@hooks/queryKeys';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

export default function useAddToCart() {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  return useMutation({
    mutationFn: ShoppingCartFetcher.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: () => showToast('이미 존재하는 상품이거나, 네트워크 에러입니다'),
  });
}
