import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { addCartItem, deleteCartItem, fetchCartItems } from '../../api/cartItems';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastProvider';

const useCartItems = () => {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const cartItems = useQuery({
    queryKey: [QUERY_KEYS.cartItem],
    queryFn: fetchCartItems,
  });

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

  return { cartItems, addCart, deleteCart };
};

export default useCartItems;
