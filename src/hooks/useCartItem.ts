import { useEffect } from 'react';

import { useToast } from './useToast';
import { fetchItems } from '../api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';

const useCartItems = () => {
  const { createToast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.CART_ITEM],
    queryFn: fetchItems,
    initialData: [],
    select: (data) => {
      return data.map((cartItem) => cartItem.product.id) || [];
    },
  });
  useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        createToast(
          '⛔️ 장바구니 상품을 가져오는데 실패했습니다. 새로고침해주세요',
        );
      }
    }
  }, [error, createToast]);

  const isInCart = (productId: number): boolean => {
    return data ? data.includes(productId) : false;
  };

  return { cartItemIds: data, isInCart, isLoading };
};

export default useCartItems;
