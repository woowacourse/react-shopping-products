import { adjustCartItemQuantity } from '@/api/cartItemAPI';
import { queryClient } from '@/App';
import ERROR_MESSAGE from '@/constants/errorMessage';
import toast from '@/services/toast';
import { useMutation } from '@tanstack/react-query';
import { AdjustCartItemQuantity, CartItemData } from '@/types';
import { CART_ITEM_KEYS } from '@/queries/keys';

const DEFAULT_TOAST_DURATION = 2_000;

type MutationContext = {
  previousCartItem?: CartItemData;
};

const useAdjustCartItemQuantity = () => {
  const { mutate: adjustCartItemQuantityMutation } = useMutation<
    void,
    Error,
    { cartItemId: number; quantity: number },
    MutationContext
  >({
    mutationFn: ({ cartItemId, quantity }) => adjustCartItemQuantity({ cartItemId, quantity }),
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: CART_ITEM_KEYS.DETAIL(cartItemId) });

      const previousCartItem = queryClient.getQueryData<CartItemData>(
        CART_ITEM_KEYS.DETAIL(cartItemId),
      );

      queryClient.setQueryData<CartItemData>(CART_ITEM_KEYS.DETAIL(cartItemId), (old) => ({
        ...old!,
        quantity,
      }));

      return { previousCartItem };
    },
    onError: (err, variables, context) => {
      if (context?.previousCartItem) {
        queryClient.setQueryData(
          CART_ITEM_KEYS.DETAIL(variables.cartItemId),
          context.previousCartItem,
        );
      }
      toast.error(ERROR_MESSAGE.FAIL_ADJUST_CART_ITEM_QUANTITY, DEFAULT_TOAST_DURATION);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_ITEM_KEYS.ALL });
    },
  });

  const handleAdjustCartItemQuantity = ({ cartItemId, quantity }: AdjustCartItemQuantity) => {
    adjustCartItemQuantityMutation({ cartItemId, quantity });
  };

  return {
    handleAdjustCartItemQuantity,
  };
};

export default useAdjustCartItemQuantity;
