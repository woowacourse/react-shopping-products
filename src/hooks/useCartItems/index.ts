import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchAddCartItem,
  fetchDeleteCartItem,
  fetchCartItems,
  fetchAdjustCartItemQuantity,
} from '../../api/cartItems';

import { MAX_CART_ITEMS_SIZE } from '../../constants/pagination';
import { FetchAdjustCartItemQuantityProps } from '../../types/cart';
import QUERY_KEY from '../../types/queryKey';

const useCartItems = () => {
  const queryClient = useQueryClient();

  const getCartItems = useQuery({
    networkMode: 'always',
    queryKey: [QUERY_KEY.cartItems],
    queryFn: fetchCartItems,
  });

  const addCartItem = useMutation({
    mutationFn: (productId: number) => fetchAddCartItem(productId),
    networkMode: 'always',
    onMutate: () => {
      if (getCartItems.data && getCartItems.data.length >= MAX_CART_ITEMS_SIZE)
        throw new Error('Cart items cannot exceed 99');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: () => {
      setTimeout(() => {
        addCartItem.reset();
      }, 2000);
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (cartItemId: number) => fetchDeleteCartItem(cartItemId),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: () => {
      setTimeout(() => {
        deleteCartItem.reset();
      }, 2000);
    },
  });

  const adjustCartItemQuantity = useMutation({
    mutationFn: ({ cartItemId, quantity }: FetchAdjustCartItemQuantityProps) =>
      fetchAdjustCartItemQuantity({ cartItemId, quantity }),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: () => {
      setTimeout(() => {
        adjustCartItemQuantity.reset();
      }, 2000);
    },
  });

  return {
    getCartItems,
    addCartItem,
    deleteCartItem,
    adjustCartItemQuantity,
  };
};

export default useCartItems;
