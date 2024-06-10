import { deleteCartItem } from '../api';
import { useToast } from './useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constant/queryKeys';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
    onError: () => {
      showToast('상품 삭제에 실패했습니다.');
    },
  });

  const handlerDeleteCartItem = (cartItemId: number) => {
    mutate({ cartItemId });
  };

  return { handlerDeleteCartItem };
}
