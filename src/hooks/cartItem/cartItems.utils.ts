import { QUERY_KEYS } from '@/constants/queryKeys';
import getObjectCopy from '@/utils/getObjectCopy';
import { QueryClient } from '@tanstack/react-query';
import { CART_ITEM_PAGE } from './useCartItemList';
import { InfiniteScrollData, PageData } from '@/types/infiniteScroll';
import { CartItem } from '@/types/cartItem.type';

export const getCachedCartItemListData = (queryClient: QueryClient) => {
  return getObjectCopy<InfiniteScrollData<PageData<CartItem>>>(
    queryClient.getQueryData([QUERY_KEYS.CART_ITEM, CART_ITEM_PAGE.START]),
  );
};

export const getUpdatedCartItemListOfChangedCartItemQuantity = (
  cartData: InfiniteScrollData<PageData<CartItem>>,
  cartItemId: number,
  quantity: number,
) => {
  const newCartItemData = getObjectCopy<InfiniteScrollData<PageData<CartItem>>>(cartData);
  const itemToUpdate = newCartItemData.pages[0].content.find((item) => item.id === cartItemId);

  if (itemToUpdate) itemToUpdate.quantity = quantity;

  return newCartItemData;
};

export const getUpdatedCartItemListOfRemovedCartItem = (
  cartData: InfiniteScrollData<PageData<CartItem>>,
  cartItemId: number,
) => {
  const newCartItemData = getObjectCopy<InfiniteScrollData<PageData<CartItem>>>(cartData);
  newCartItemData.pages[0].content = newCartItemData.pages[0].content.filter(
    (item) => item.id !== cartItemId,
  );

  return newCartItemData;
};

export const invalidateCartItemQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
};

export const setCartItemQueryData = (
  queryClient: QueryClient,
  data: InfiniteScrollData<PageData<CartItem>>,
) => {
  queryClient.setQueryData([QUERY_KEYS.CART_ITEM, CART_ITEM_PAGE.START], data);
};

export const showCartItemError = (error: Error, showFn: (message: string) => void) => {
  if (error instanceof Error) showFn(error.message);
};
