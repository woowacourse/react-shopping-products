import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQuantity } from '../../api/cart';
import { Cart } from '../../types/Cart.type';

const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData<Cart[]>(['cart']) ?? [];

  const mutation = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleUpdateCartItemQuantity = (productId: number, quantity: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem) mutation.mutate({ cartItemId: cartItem.id, quantity });
  };

  return { handleUpdateCartItemQuantity };
};

export default useUpdateCartItemQuantity;
