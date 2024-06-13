import {
  MutationKey,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';

import { addCartItem } from '@/api/cart';
import { MutationResponse } from '@/types/cartItem';

import useToast from '@/hooks/useToast';

type UseAddCartItemQueryProp = Omit<
  UseMutationOptions<MutationResponse, Error, number, MutationKey>,
  'mutationKey' | 'mutationFn'
>;

const useAddCartItemQuery = (mutationOptions?: UseAddCartItemQueryProp) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.add],
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
};

export default useAddCartItemQuery;
