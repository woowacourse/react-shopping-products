import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import {
  fetchAddCartItem,
  fetchDeleteCartItem,
  fetchCartItems,
  fetchAdjustCartItemQuantity,
} from '../../api/cartItems';
import { UseToastContext } from '../../components/ShoppingProductsPage';

import { FetchAdjustCartItemQuantityProps } from '../../types/cart';
import QUERY_KEY from '../../types/queryKey';
import { MAX_CART_ITEMS_SIZE } from '../../constants/pagination';
import ERROR_MESSAGE from '../../constants/errorMessage';

const useCartItems = () => {
  const { setErrorMessage } = useContext(UseToastContext);

  const queryClient = useQueryClient();

  const getCartItems = useQuery({
    networkMode: 'always',
    queryKey: [QUERY_KEY.cartItems],
    queryFn: fetchCartItems,
  });

  if (getCartItems.isError) setErrorMessage(ERROR_MESSAGE.fetchCart);

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
      if (getCartItems.data && getCartItems.data.length >= MAX_CART_ITEMS_SIZE)
        return setErrorMessage(ERROR_MESSAGE.overMaxCartItemCounts);

      setErrorMessage(ERROR_MESSAGE.addToCart);
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (cartItemId: number) => fetchDeleteCartItem(cartItemId),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: () => {
      setErrorMessage(ERROR_MESSAGE.deleteFromCart);
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
      setErrorMessage(ERROR_MESSAGE.adjustCartItemQuantity);
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
