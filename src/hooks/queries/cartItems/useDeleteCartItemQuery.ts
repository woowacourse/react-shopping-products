import {
  MutationKey,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';
import useToast from '../../useToast';

import { deleteCartItem } from '@/api/cart';
import { MutationResponse } from '@/types/cartItem';

type UseDeleteCartItemQueryProp = Omit<
  UseMutationOptions<MutationResponse, Error, number, MutationKey>,
  'mutationKey' | 'mutationFn'
>;

const useDeleteCartItemQuery = (mutationOptions?: UseDeleteCartItemQueryProp) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.delete],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
};

export default useDeleteCartItemQuery;
