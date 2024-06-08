import { requestCartItemList } from '@/apis/request/cartItem';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { TIME } from '@/constants/time';
import { useInfiniteQuery } from '@tanstack/react-query';

export const CART_ITEM_PAGE = {
  START: 0,
  SIZE: 100,
};

const useCartItemList = () => {
  const { isSuccess, data, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CART_ITEM, CART_ITEM_PAGE.START],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => requestCartItemList(pageParam, CART_ITEM_PAGE.SIZE), // TODO: 오류 핸들링 필요
    select: (data) => {
      const cartItemList = (data.pages ?? []).flatMap(({ content }) => content);

      const newCartItemMap = new Map();
      cartItemList.forEach((cartItem) => newCartItemMap.set(cartItem.product.id, cartItem)); // PID를 key로한다.

      // map과 리스트로 반환
      return { cartItemList, cartItemMap: newCartItemMap };
    },
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : null),
    staleTime: TIME.HOUR,
    networkMode: 'always',
  });

  const getCartItemQuantity = (productId: number): number => {
    if (!data || !data.cartItemMap) return 0;

    const { cartItemMap } = data;
    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemId = (productId: number): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemMap } = data;
    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.id : -1;
  };

  const getTotalQuantity = (): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemMap } = data;
    return cartItemMap.size;
  };

  const getTotalPrice = (): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemList } = data;

    return cartItemList.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  };

  return {
    isSuccess,
    data: data?.cartItemList,
    ...rest,
    getCartItemId,
    getCartItemQuantity,
    getTotalQuantity,
    getTotalPrice,
  };
};

export default useCartItemList;
