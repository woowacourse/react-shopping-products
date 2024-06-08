import { addCartItem } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';
import { useToast } from '@/hooks/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostCartItem = () => {
  const queryClient = useQueryClient();
  const { createToast } = useToast();

  const addToCartMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.TOTAL_QUANTITY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.FETCH],
      });
    },
    onError: () => {
      createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
    },
  });

  return { addToCartMutation };
};

export default usePostCartItem;
