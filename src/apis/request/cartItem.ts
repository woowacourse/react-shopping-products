import { CartItem } from '@/types/cartItem.type';
import { BASE_URL } from '../baseUrl';
import { requestGet, requestPost, requestDelete } from '../fetcher';
import { ENDPOINT } from '../endpoints';

type ResponseCartItemList = {
  content: CartItem[];
  pageable: {
    sort: {
      sorted: false;
      unsorted: true;
      empty: true;
    };
    pageNumber: 0;
    pageSize: 20;
    offset: 0;
    paged: true;
    unpaged: false;
  };
  last: true;
  totalPages: 1;
  totalElements: 6;
  sort: {
    sorted: false;
    unsorted: true;
    empty: true;
  };
  first: true;
  number: 0;
  numberOfElements: 6;
  size: 20;
  empty: false;
};

type QueryParams = {
  page: number;
  size: number;
};

export const requestCartItemList = async (
  page: number = 0,
  size: number = 20,
): Promise<ResponseCartItemList> => {
  const queryParams: QueryParams = {
    page,
    size,
  };

  return await requestGet<ResponseCartItemList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.CART_ITEM,
    queryParams,
  });
};

export const requestAddCartItem = async (productId: number, quantity: number = 1) => {
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
