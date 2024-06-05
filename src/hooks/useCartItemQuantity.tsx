import { useMutation, useQueryClient } from '@tanstack/react-query';
import useNewCartItemList from './useNewCartItemList';
import {
  RequestAddCartItem,
  RequestModifyCartItemQuantityParams,
  requestAddCartItem,
  requestModifyCartItemQuantity,
} from '@/apis/request/cartItem';
import { QUERY_KEYS } from '@/constants/queryKeys';

const UNIT_COUNT = 1;

const useCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const { getCartItemId } = useNewCartItemList();

  const modifyCartItemQuantity = useMutation({
    mutationFn: ({ cartItemId, quantity }: RequestModifyCartItemQuantityParams) =>
      requestModifyCartItemQuantity({ cartItemId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
    },
  });

  const addCartItem = useMutation({
    mutationFn: ({ productId, quantity }: RequestAddCartItem) =>
      requestAddCartItem({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
    },
  });

  const increaseCartItemQuantity = () => {
    const updatedQuantity = quantity + UNIT_COUNT;
  };

  const decreaseCartItemQuantity = () => {};

  return {
    addCartItemQuantity,
    addCartItem,
  };
};

export default useCartItemQuantity;
