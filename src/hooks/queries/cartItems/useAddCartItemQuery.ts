import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';

import { addCartItem } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';
import { Product } from '@/types/product';

import useToast from '@/hooks/useToast';

const useAddCartItemQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.add],
    mutationFn: (product: Product) => addCartItem({ productId: product.id }),
    onMutate: async (product) => {
      // 나가는 모든 refetch 취소하여, 낙관적 업데이트를 덮어쓰지 않음
      await queryClient.cancelQueries({ queryKey: [CART_KEYS.fetch] });

      // 이전 값 저장
      const previousCartItems = queryClient.getQueryData<CartItemInfo[]>([CART_KEYS.fetch]);

      // 기존 cart id와 겹치지 않는 새로운 CartItemInfo를 만들어 삽입
      const newCartItem: CartItemInfo = {
        id: new Date().getTime(),
        quantity: 1,
        product,
      };

      // 새로운 값으로 낙관적 업데이트
      queryClient.setQueryData([CART_KEYS.fetch], (prev: CartItemInfo[]) => [...prev, newCartItem]);

      // context 객체에 이전 값을 담아 반환
      return { previousCartItems };
    },
    onError: (error, _, context) => {
      // 에러날 경우 이전 값으로 되돌림
      if (context && context.previousCartItems) {
        queryClient.setQueryData([CART_KEYS.fetch], context.previousCartItems);
      }
      toast.error(error.message);
    },
    // error 또는 success 이후 항상 refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
  });
};

export default useAddCartItemQuery;
