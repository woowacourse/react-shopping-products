import { useMutation, useQuery } from '@tanstack/react-query';
import { cartApis } from '../../api/cart';
import { MAX_CART_ITEMS_FETCH_SIZE } from '../../constants/paginationRules';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { CartItem } from '../../types';
import useInvalidateQueries from '../useInvalidateQueries';

export const cartQueries = {
  useGetCartItems: () =>
    useQuery<CartItem[]>({
      initialData: [],
      queryKey: [QUERY_KEYS.getCartItems],
      queryFn: async () =>
        await cartApis.get({ size: MAX_CART_ITEMS_FETCH_SIZE }),
    }),
};

export const cartMutations = {
  useAddCartItem: (params: { productId: number }) => {
    const { invalidateQueries } = useInvalidateQueries([
      QUERY_KEYS.getCartItems,
    ]);

    return useMutation({
      mutationFn: async () => await cartApis.add({ ...params, quantity: 1 }),
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },

  useDeleteCartItem: (params: { cartItemId: number | undefined }) => {
    const { invalidateQueries } = useInvalidateQueries([
      QUERY_KEYS.getCartItems,
    ]);

    return useMutation({
      mutationFn: async () => await cartApis.delete({ ...params }),
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },

  useUpdateCartItemQuantity: () => {
    const { invalidateQueries } = useInvalidateQueries([
      QUERY_KEYS.getCartItems,
    ]);

    return useMutation({
      mutationFn: async (params: { cartItemId?: number; quantity?: number }) =>
        await cartApis.update({ ...params }),
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },
};
