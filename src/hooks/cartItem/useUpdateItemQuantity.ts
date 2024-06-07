import { updateCartItemQuantity } from '@apis/shoppingCart/shoppingCart';
import { CartItem } from '@appTypes/product';
import { InfinityScrollResponse } from '@appTypes/response';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateItemQuantity = (): UseMutationResult<
  void,
  Error,
  { id: number; quantity: number },
  unknown
> => {
  const queryClient = useQueryClient();

  const showToast = useToastContext();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart-items'] });

      const previousCartItems = queryClient.getQueryData<InfinityScrollResponse<CartItem[]>>([
        'cart-items',
      ]);

      queryClient.setQueryData<InfinityScrollResponse<CartItem[]>>(
        ['cart-items'],
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
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },

    onError: (error, _, context) => {
      showToast(error.message);

      if (!context?.previousCartItems) return;

      queryClient.setQueryData(['cart-items'], context?.previousCartItems);
    },
  });
};

export default useUpdateItemQuantity;
