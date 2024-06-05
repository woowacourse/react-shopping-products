import { requestCartItemList } from '@/apis/request/cartItem';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CartItem } from '@/types/cartItem.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const CART_ITEM_PAGE = {
  START: 0,
  SIZE: 100,
};

const useNewCartItemList = () => {
  const [cartItemMap, setCartItemMap] = useState<Map<number, CartItem>>(new Map());

  const { isSuccess, data, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CART_ITEM, CART_ITEM_PAGE.SIZE],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const data = await requestCartItemList(pageParam, CART_ITEM_PAGE.SIZE);

      // 맵으로 장바구니 목록을 관리한다.
      const { content } = data;

      const newCartItemMap = new Map();
      content.forEach((cartItem) => newCartItemMap.set(cartItem.product.id, cartItem)); // PID를 key로한다.
      setCartItemMap(newCartItemMap);

      return data;
    },
    select: (data) => (data.pages ?? []).flatMap(({ content }) => content),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : null),
  });

  // const isInCart = (productId: number) => {
  //   if (!isSuccess) return;

  //   return data.some(({ product }) => product.id === productId);
  // };

  const getCartItemId = (productId: number) => {
    // const cartItem = cartItemMap.get(productId);
    // return !cartItem ? 0 : cartItem.id;
  };

  const getCartItemQuantity = (productId: number) => {
    const cartItem = cartItemMap.get(productId);

    return !cartItem ? 0 : cartItem.id;
  };

  return {
    // isInCart,
    isSuccess,
    data,
    ...rest,
    getCartItemId,
    getCartItemQuantity,
  };
};

export default useNewCartItemList;
