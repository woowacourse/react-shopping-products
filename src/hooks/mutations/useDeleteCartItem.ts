import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartItem } from '../../api/cart';
import { Cart } from '../../types/Cart.type';

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData<Cart[]>(['cart']) ?? [];

  const mutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleDeleteCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem) mutation.mutate(cartItem.id);
  };

  return { handleDeleteCartItem };
};

export default useDeleteCartItem;
