import { addCartItem } from '../api';
import { useToast } from './useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constant/queryKeys';

export function useAddCartItem() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
    onError: () => {
      showToast('상품 담기에 실패했습니다.');
    },
  });

  const handlerAddCartItem = (productId: number) => {
    mutate({ productId });
  };

  return { handlerAddCartItem };
}
