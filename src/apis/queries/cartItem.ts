import { QUERY_KEYS } from '@/constants/queryKeys';
import { CART_ITEM_PAGE } from '@/hooks/cartItem/useCartItemList';
import { QueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  requestAddCartItem,
  requestCartItemList,
  requestDeleteCartItem,
  requestModifyCartItemQuantity,
} from '../request/cartItem';
import { invalidateCartItemQueries } from '@/apis/queries/cartItem.utils';
import ErrorWithHeader from '@/errors/ErrorWithHeader';

export const useInfiniteCartItemListQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.CART_ITEM, CART_ITEM_PAGE.START],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => requestCartItemList(pageParam, CART_ITEM_PAGE.SIZE), // TODO: 오류 핸들링 필요
    select: (data) => {
      const cartItemList = (data.pages ?? []).flatMap(({ content }) => content);

      const newCartItemMap = new Map();
      cartItemList.forEach((cartItem) => newCartItemMap.set(cartItem.product.id, cartItem)); // PID를 key로한다.

      return newCartItemMap;
    },
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : null),
    networkMode: 'always',
  });
};

export const useModifyCartItemQuantityMutation = (
  queryClient: QueryClient,
  onModifyCartItemQuantityError: (error: ErrorWithHeader) => void,
) => {
  return useMutation({
    mutationFn: requestModifyCartItemQuantity,
    onSuccess: () => invalidateCartItemQueries(queryClient),
    networkMode: 'always',
    onError: onModifyCartItemQuantityError,
  });
};

export const useAddCartItemMutation = (
  queryClient: QueryClient,
  onAddCartItemError: (error: ErrorWithHeader) => void,
) => {
  return useMutation({
    mutationFn: (productId: number) => requestAddCartItem({ productId }),
    onSuccess: () => invalidateCartItemQueries(queryClient),
    networkMode: 'always',
    onError: onAddCartItemError,
  });
};

export const useDeleteCartItemMutation = (
  queryClient: QueryClient,
  onModifyDeleteCartItemError: (error: ErrorWithHeader) => void,
) => {
  return useMutation({
    mutationFn: requestDeleteCartItem,
    onSuccess: () => invalidateCartItemQueries(queryClient),
    networkMode: 'always',
    onError: onModifyDeleteCartItemError,
  });
};
