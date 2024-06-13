import {
  MutationKey,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';
import useToast from '../../useToast';

import { updateItemQuantity } from '@/api/cart';
import { MutationResponse, UpdateCartItemQuantityParameter } from '@/types/cartItem';

type UseUpdateItemQuantityQueryProp = Omit<
  UseMutationOptions<MutationResponse, Error, UpdateCartItemQuantityParameter, MutationKey>,
  'mutationKey' | 'mutationFn'
>;

const useUpdateItemQuantityQuery = (mutationOptions?: UseUpdateItemQuantityQueryProp) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.updateQuantity],
    mutationFn: updateItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
};

export default useUpdateItemQuantityQuery;
