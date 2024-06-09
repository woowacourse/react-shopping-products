import { patchCartItem } from '@/api/cartItem';
import { cartKeys } from '@/constants/index';
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
        queryKey: cartKeys.totalQuantity(),
      });
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: () => {
      createToast({
        message: '⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.',
        delayTime: 1_000 * 2,
      });
    },
  });

  return { cartItemQuantityMutation };
};

export default usePatchCartItem;
