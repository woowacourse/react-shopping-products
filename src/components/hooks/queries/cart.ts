import { cartApis } from '../../../api/cart';
import useFetch from '../useFetch';

import APIError from '../../../api/apiError';
import { CartItem } from '../../../types';

interface GetCartItemsResponse {
  content: CartItem[];
}

export const cartQueries = {
  useGetCartItems: (params: { size: number }) =>
    useFetch<GetCartItemsResponse>({
      queryFn: async () => {
        const response = await cartApis.get({ ...params });

        if (!response.ok)
          throw new APIError(
            response.status,
            '장바구니 목록을 불러오는 데 실패했습니다.'
          );

        return await response.json();
      },
    }),
};

export const cartMutations = {
  useAddCartItem: (params: { productId: number }) =>
    useFetch({
      queryFn: async () => {
        const response = await cartApis.add({ ...params });

        if (!response.ok)
          throw new APIError(
            response.status,
            '일시적인 오류로 장바구니에 상품을 추가하지 못했습니다.'
          );

        return response;
      },
    }),

  useDeleteCartItem: (params: { cartItemId: number | undefined }) =>
    useFetch({
      queryFn: async () => {
        const response = await cartApis.delete({ ...params });

        if (!response.ok)
          throw new APIError(
            response.status,
            '일시적인 오류로 장바구니에서 상품을 삭제하지 못했습니다.'
          );

        return response;
      },
    }),
};
