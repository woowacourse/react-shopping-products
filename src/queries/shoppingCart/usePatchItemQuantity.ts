import { updateCartItemQuantity } from '@apis/shoppingCart/shoppingCart';
import { CartItem } from '@appTypes/product';
import { InfinityScrollResponse } from '@appTypes/response';
import { QUERY_KEY } from '@queries/queryKey';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchItemQuantity = (
  showToast: (message: string) => void
): UseMutationResult<void, Error, { id: number; quantity: number }, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.cartItems });

      const previousCartItems = queryClient.getQueryData<InfinityScrollResponse<CartItem[]>>(
        QUERY_KEY.cartItems
      );

      queryClient.setQueryData<InfinityScrollResponse<CartItem[]>>(
        QUERY_KEY.cartItems,
        (oldCartItems) =>
          oldCartItems && {
            ...oldCartItems,
            content: oldCartItems?.content.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }
      );

      return { previousCartItems };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.cartItems });
    },

    onError: (error, _, context) => {
      showToast(error.message);

      if (!context?.previousCartItems) return;

      queryClient.setQueryData(QUERY_KEY.cartItems, context?.previousCartItems);
    },
  });
};

export default usePatchItemQuantity;
