import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartItem } from '../../api/cart';
import { Cart } from '../../types/Cart.type';
import { ToastContext } from '../../context/ToastProvider';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const cartItems = queryClient.getQueryData<Cart[]>([QUERY_KEYS.CART]) ?? [];

  const { showToast } = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
    onError: (error) => showToast(error.message),
  });

  const handleDeleteCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem) mutation.mutate(cartItem.id);
  };

  return { handleDeleteCartItem };
};

export default useDeleteCartItem;
