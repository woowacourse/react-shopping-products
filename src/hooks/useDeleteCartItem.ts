import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCartItem } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';
import { CartItemListResponse } from '../types/type';
import { useToast } from '../store/ToastProvider';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: deleteCartItem,
    onMutate: async ({ cartItemId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });

      const previousCartItemList = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEMS,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.CART_ITEMS],
        (prev: CartItemListResponse) =>
          prev && {
            ...prev,
            content: prev.content.filter((item) => item.id !== cartItemId),
          },
      );

      return { previousCartItemList };
    },

    onError(error, _, context: any) {
      queryClient.setQueryData(
        [QUERY_KEYS.CART_ITEMS],
        context.previousCartItemList,
      );

      addToast(error.message);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
}
