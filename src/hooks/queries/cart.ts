import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApis } from '../../api/cart';
import { QUERY_KEYS } from '../../constants/queryKeys';

export const cartQueries = {
  useGetCartItems: (params: { size: number }) =>
    useQuery({
      queryKey: [QUERY_KEYS.getCartItems, params.size],
      queryFn: async () => await cartApis.get({ ...params }),
    }),
};

export const cartMutations = {
  useAddCartItem: (
    params: { productId: number; quantity: number },
    onSuccessCallback: () => void
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async () => await cartApis.add({ ...params, quantity: 1 }),
      onSuccess: () => {
        onSuccessCallback();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
      },
    });
  },

  useDeleteCartItem: (
    params: { cartItemId: number | undefined },
    onSuccessCallback: () => void
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async () => await cartApis.delete({ ...params }),
      onSuccess: () => {
        onSuccessCallback();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
      },
    });
  },
};
