import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestModifyCartItemQuantity,
} from '@/apis/request/cartItem';
import useCartItemList from './useCartItemList';
import { useToast } from '../useToast';
import {
  getCachedCartItemListData,
  getUpdatedCartItemListOfChangedCartItemQuantity,
  getUpdatedCartItemListOfRemovedCartItem,
  invalidateCartItemQueries,
  setCartItemQueryData,
  showCartItemError,
} from './cartItems.utils';

const UNIT_COUNT = 1;

const useCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const { getCartItemQuantity, getCartItemId } = useCartItemList();
  const { showToast } = useToast();

  const modifyCartItemQuantity = useMutation({
    mutationFn: requestModifyCartItemQuantity,
    onMutate: async ({ cartItemId, quantity }) => {
      const previousCartItemCacheData = getCachedCartItemListData(queryClient);

      const newCartItemData = getUpdatedCartItemListOfChangedCartItemQuantity(
        previousCartItemCacheData,
        cartItemId,
        quantity,
      );

      setCartItemQueryData(queryClient, newCartItemData);
      return { previousCartItemCacheData };
    },
    onError: (error, variables, context) => {
      showCartItemError(error, showToast);

      if (context) setCartItemQueryData(queryClient, context.previousCartItemCacheData);
    },
    onSettled: () => invalidateCartItemQueries(queryClient),
    networkMode: 'always',
    retry: 3,
  });

  const { mutate: addCartItem } = useMutation({
    mutationFn: (productId: number) => requestAddCartItem({ productId }),
    onSuccess: () => invalidateCartItemQueries(queryClient),
    onError: (error) => showCartItemError(error, showToast),
    networkMode: 'always',
  });

  const { mutate: deleteCartItemMutation } = useMutation({
    mutationFn: requestDeleteCartItem,
    onMutate: async (cartItemId: number) => {
      const previousCartItemCacheData = getCachedCartItemListData(queryClient);

      const newCartItemData = getUpdatedCartItemListOfRemovedCartItem(
        previousCartItemCacheData,
        cartItemId,
      );

      setCartItemQueryData(queryClient, newCartItemData);

      return { previousCartItemCacheData };
    },
    onError: (error, variables, context) => {
      showCartItemError(error, showToast);

      if (context) setCartItemQueryData(queryClient, context.previousCartItemCacheData);
    },
    onSettled: () => invalidateCartItemQueries(queryClient),
    networkMode: 'always',
  });

  const deleteCartItem = async (productId: number) => {
    const cartItemId = getCartItemId(productId);

    deleteCartItemMutation(cartItemId);
  };

  const increaseCartItemQuantity = async (productId: number) => {
    const updatedQuantity = getCartItemQuantity(productId) + UNIT_COUNT;
    const cartItemId = getCartItemId(productId);

    modifyCartItemQuantity.mutate({ cartItemId, quantity: updatedQuantity });
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    const updatedQuantity = getCartItemQuantity(productId) - UNIT_COUNT;
    const cartItemId = getCartItemId(productId);

    modifyCartItemQuantity.mutate({ cartItemId, quantity: updatedQuantity });
  };

  return {
    decreaseCartItemQuantity,
    increaseCartItemQuantity,
    addCartItem,
    deleteCartItem,
  };
};

export default useCartItemQuantity;
