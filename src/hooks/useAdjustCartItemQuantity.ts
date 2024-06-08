import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adjustCartItemQuantity, addCartItem } from './../api/cart';
import { useToast } from './useToast';

import { CartItemInfo } from '@/types/cartItem';

const useAdjustCartItemQuantity = () => {
  const { toastError } = useToast();

  const queryClient = useQueryClient();

  const { mutate: addCartItemMutation } = useMutation({
    mutationFn: (productId: number) => addCartItem({ productId, quantity: 1 }),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ['fetchCartItems'] });

      const prevOption = queryClient.getQueryData(['fetchCartItems']);
      queryClient.setQueryData(['fetchCartItems'], (oldCartItems: CartItemInfo[]) => {
        const newCartItem: CartItemInfo = {
          id: Date.now(),
          quantity: 1,
          product: {
            id: productId,
            name: 'productId',
            price: 1000,
            imageUrl: '',
            category: '',
          },
        };
        return [...oldCartItems, newCartItem];
      });
      return { prevOption };
    },

    onError: (error, _, context) => {
      toastError(error.message);
      queryClient.setQueryData(['fetchCartItems'], context?.prevOption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCartItems'] });
    },
  });

  const { mutate: adjustCartItemQuantityMutation } = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      adjustCartItemQuantity(cartItemId, quantity),
    onMutate: async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: ['fetchCartItems'] });
      const prevOption = queryClient.getQueryData(['fetchCartItems']);
      queryClient.setQueryData(['fetchCartItems'], (oldCartItems: CartItemInfo[]) => {
        return oldCartItems.map((item) => (item.id === cartItemId ? { ...item, quantity } : item));
      });
      return { prevOption };
    },

    onError: (error, _, context) => {
      toastError(error.message);
      queryClient.setQueryData(['fetchCartItems'], context?.prevOption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCartItems'] });
    },
  });

  return { addCartItemMutation, adjustCartItemQuantityMutation };
};

export default useAdjustCartItemQuantity;
