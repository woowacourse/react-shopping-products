import { patchCartItem } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';
import { useToast } from '@/hooks/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchCartItem = () => {
  const queryClient = useQueryClient();
  const { createToast } = useToast();

  const cartItemQuantityMutation = useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => patchCartItem({ cartItemId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.TOTAL_QUANTITY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.FETCH],
      });
    },
    onError: () => {
      createToast({
        message: '⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.',
      });
    },
  });

  return { cartItemQuantityMutation };
};

export default usePatchCartItem;
