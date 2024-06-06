import { cartApis } from '../../api/cart';
import useFetch from '../useFetch';

import { CartItem } from '../../types';

interface GetCartItemsResponse {
  content: CartItem[];
}

export const cartQueries = {
  useGetCartItems: (params: { size: number }) =>
    useFetch<GetCartItemsResponse>({
      queryFn: async () => await cartApis.get({ ...params }),
    }),
};

export const cartMutations = {
  useAddCartItem: (params: { productId: number }) =>
    useFetch({
      queryFn: async () => await cartApis.add({ ...params }),
    }),

  useDeleteCartItem: (params: { cartItemId: number | undefined }) =>
    useFetch({
      queryFn: async () => await cartApis.delete({ ...params }),
    }),
};
