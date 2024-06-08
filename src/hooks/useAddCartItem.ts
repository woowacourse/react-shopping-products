import { addCartItemByProductId } from '@/api/cartItemAPI';
import { queryClient } from '@/App';
import ERROR_MESSAGE from '@/constants/errorMessage';
import { useMutation } from '@tanstack/react-query';
import toast from '../services/toast';
import { CART_ITEM_KEYS } from '@/queries/keys';

const DEFAULT_TOAST_DURATION = 2_000;

const DEFAULT_ADD_QUANTITY = 1;

const useAddCartItem = () => {
  const { mutate: addCartItemMutation } = useMutation<
    void,
    Error,
    { productId: number; quantity: number }
  >({
    mutationFn: ({ productId, quantity }) => addCartItemByProductId(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_ITEM_KEYS.ALL });
    },
    onError: () => {
      toast.error(ERROR_MESSAGE.FAIL_ADD_CART_ITEM, DEFAULT_TOAST_DURATION);
    },
  });

  const addCartItem = (productId: number) => {
    addCartItemMutation({ productId, quantity: DEFAULT_ADD_QUANTITY });
  };

  return {
    addCartItem,
  };
};

export default useAddCartItem;
