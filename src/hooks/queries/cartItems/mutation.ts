import { QueryClient, useMutation } from '@tanstack/react-query';
import { addCartItem, deleteCartItem, patchCartItemQuantity } from '../../../api/cartItems';
import { QUERY_KEY } from '../../../constants/queryKeys';

export const useAddCartMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });
};

export const useDeleteCartMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });
};

export const useUpdateCartItemQuantity = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) =>
      patchCartItemQuantity(cartId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItem] });
    },
  });
};
