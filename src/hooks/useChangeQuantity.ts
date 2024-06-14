import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';
import { patchCartItemQuantityChange } from '../api';
import { QUERY_KEYS } from '../constant/queryKeys';

export function useChangeQuantity() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: patchCartItemQuantityChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        showToast(error.message);
      }
    },
  });

  const handleIncreaseQuantity = (cartItemId: number, quantity: number) => {
    mutate({ cartItemId, quantity: quantity + 1, errorMessage: '상품 수량 변경에 실패했습니다.' });
  };

  const handleDecreaseQuantity = (cartItemId: number, quantity: number) => {
    mutate({ cartItemId, quantity: quantity - 1, errorMessage: '상품 수량 변경에 실패했습니다.' });
  };

  return { handleIncreaseQuantity, handleDecreaseQuantity };
}
