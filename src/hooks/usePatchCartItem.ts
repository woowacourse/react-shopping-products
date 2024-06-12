import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchCartItem } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';
import { CartItemListResponse } from '../types/type';
import { useToast } from '../store/ToastProvider';

export default function usePatchCartItem() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: patchCartItem,
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });

      const previousCartItemList = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEMS,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.CART_ITEMS],
        (prev: CartItemListResponse) =>
          prev && {
            ...prev,
            content: prev.content.map((item) =>
              item.id === cartItemId ? { ...item, quantity } : item,
            ),
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
