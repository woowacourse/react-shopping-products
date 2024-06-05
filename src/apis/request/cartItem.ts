import { BASE_URL } from '../baseUrl';
import { requestGet, requestPost, requestDelete, requestPatch } from '../fetcher';
import { ENDPOINT } from '../endpoints';
import { ResponseCartItemList } from '../responseTypes';
import { CartItem } from '@/types/cartItem.type';
import { PageParams } from '@/types/infiniteScroll';

type QueryParams = {
  page: number;
  size: number;
};

export const requestCartItemList = async (
  page: number = 0,
  size: number = 20,
): Promise<PageParams<CartItem>> => {
  const queryParams: QueryParams = {
    page,
    size,
  };

  const { content, pageable, last } = await requestGet<ResponseCartItemList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.CART_ITEM,
    queryParams,
  });

  return {
    content,
    hasNextPage: !last,
    nextCursor: pageable.pageNumber + 1,
  };
};

export type RequestAddCartItem = {
  productId: number;
  quantity: number;
};

export const requestAddCartItem = async ({ productId, quantity = 1 }: RequestAddCartItem) => {
  await requestPost({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.CART_ITEM,
    body: {
      productId,
      quantity,
    },
  });
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  await requestDelete({
    baseUrl: BASE_URL.SHOP,
    endpoint: `${ENDPOINT.CART_ITEM}/${cartItemId}`,
    body: {
      id: cartItemId,
    },
  });
};

export type RequestModifyCartItemQuantityParams = {
  cartItemId: number;
  quantity: number;
};

export const requestModifyCartItemQuantity = async ({
  cartItemId,
  quantity,
}: RequestModifyCartItemQuantityParams) => {
  await requestPatch({
    baseUrl: BASE_URL.SHOP,
    endpoint: `${ENDPOINT.CART_ITEM}/${cartItemId}`,
    body: {
      quantity,
    },
  });
};
