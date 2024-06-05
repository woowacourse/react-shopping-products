import { useEffect } from 'react';

import { useToast } from './useToast';
import { getCartList } from '@/api/cartItem';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';

const useCartItems = () => {
  const { createToast } = useToast();
  const { data: cartItemIds, isError } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: async () => {
      const cartItems = await getCartList();
      return cartItems.map((cartItem) => cartItem.product.id);
    },
    initialData: [],
  });

  useEffect(() => {
    isError &&
      createToast(
        '장바구니에 담긴 상품들을 불러오는데 실패했습니다. 새로고침해주세요',
      );
  }, [isError]);

  const isInCart = (productId: number) => {
    return cartItemIds !== null && cartItemIds.includes(productId);
  };

  return { cartItemIds, isInCart };
};

export default useCartItems;
