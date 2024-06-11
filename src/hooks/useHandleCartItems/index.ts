import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem, deleteCartItem, patchCartItemQuantity } from '../../api/cartItems';
import { QUERY_KEY } from '../../constants/queryKeys';

const useHandleCartItems = () => {
  const queryClient = useQueryClient();

  const addCart = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });

  const deleteCart = useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });

  const updateCartItemQuantity = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) =>
      patchCartItemQuantity(cartId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });

  return { addCart, deleteCart, updateCartItemQuantity };
};

export default useHandleCartItems;
