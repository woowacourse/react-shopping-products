import { deleteCartItem } from '@/api/cartItem';
import { cartKeys } from '@/constants/index';
import { useToast } from '@/hooks/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const { createToast } = useToast();

  const deleteCartMutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),

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
        message: '⛔️ 상품을 삭제하는데 실패했습니다. 다시 시도해 주세요.',
        delayTime: 1_000 * 2,
      });
    },
  });

  return { deleteCartMutation };
};

export default useDeleteCartItem;
