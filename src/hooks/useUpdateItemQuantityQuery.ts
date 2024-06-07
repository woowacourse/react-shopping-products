import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from './useToast';

import { updateItemQuantity } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

const useUpdateItemQuantityQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateItemQuantity,
    onMutate: async ({ cartId, quantity }) => {
      // 나가는 모든 refetch 취소하여, 낙관적 업데이트를 덮어쓰지 않음
      await queryClient.cancelQueries({ queryKey: ['cartItems'] });

      // 이전 값 저장
      const previousCartItems = queryClient.getQueryData<CartItemInfo[]>(['cartItems']);

      // 새로운 값으로 낙관적 업데이트
      queryClient.setQueryData(['cartItems'], (prev: CartItemInfo[]) =>
        prev.map((cartItem) => (cartItem.id === cartId ? { ...cartItem, quantity } : cartItem)),
      );

      // context 객체에 이전 값을 담아 반환
      return { previousCartItems };
    },
    onError: (error, _, context) => {
      // 에러날 경우 이전 값으로 되돌림
      if (context && context.previousCartItems) {
        queryClient.setQueryData(['cartItems'], context.previousCartItems);
      }
      toast.error(error.message);
    },
    // error 또는 success 이후 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};

export default useUpdateItemQuantityQuery;
