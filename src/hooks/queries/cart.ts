import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApis } from '../../api/cart';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { CartItem } from '../../types';
import { MAX_CART_ITEMS_FETCH_SIZE } from '../../constants/paginationRules';

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
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async () => await cartApis.add({ ...params, quantity: 1 }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
      },
    });
  },

  useDeleteCartItem: (params: { cartItemId: number | undefined }) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async () => await cartApis.delete({ ...params }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
      },
    });
  },

  useUpdateCartItemQuantity: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (params: { cartItemId?: number; quantity?: number }) =>
        await cartApis.update({ ...params }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
      },
    });
  },
};
