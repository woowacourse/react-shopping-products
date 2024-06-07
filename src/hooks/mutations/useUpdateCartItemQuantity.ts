import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQuantity } from '../../api/cart';
import { Cart } from '../../types/Cart.type';
import { ToastContext } from '../../context/ToastProvider';

const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const cartItems = queryClient.getQueryData<Cart[]>(['cart']) ?? [];

  const { showToast } = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => showToast(error.message),
  });

  const handleUpdateCartItemQuantity = (productId: number, quantity: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem) mutation.mutate({ cartItemId: cartItem.id, quantity });
  };

  return { handleUpdateCartItemQuantity };
};

export default useUpdateCartItemQuantity;
