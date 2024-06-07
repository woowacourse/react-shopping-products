import { useContext } from 'react';
import { ToastContext } from '../context/ToastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem, deleteCartItem, patchCartItemQuantity } from '../api/cartItems';
import { QUERY_KEYS } from '../constants/queryKeys';

const useHandleCartItems = () => {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const addCart = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const deleteCart = useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const updateCartItemQuantity = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) =>
      patchCartItemQuantity(cartId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return { addCart, deleteCart, updateCartItemQuantity };
};

export default useHandleCartItems;
