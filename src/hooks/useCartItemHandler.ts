import { addCartItem, deleteCartItem, fetchCartItemQuantity } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CartItem } from '../type/CartItem';

interface CartButtonProps {
  productId: number;
}

const useCartItemHandler = ({ productId }: CartButtonProps) => {
  const queryClient = useQueryClient();

  const addCartItemMutation = useMutation({
    mutationFn: async (itemQuantity: number) => {
      await addCartItem(productId, itemQuantity);
    },
    onMutate: async (itemQuantity: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      const previousCartItems = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEM,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) => [
        ...old,
        { product: { id: productId }, quantity: itemQuantity },
      ]);
      return { previousCartItems };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          [QUERY_KEYS.CART_ITEM],
          context.previousCartItems,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: async (cartItemId: number) => {
      await deleteCartItem(cartItemId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      const previousCartItems = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEM,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) =>
        old.filter((item: CartItem) => item.product.id !== productId),
      );
      return { previousCartItems };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          [QUERY_KEYS.CART_ITEM],
          context.previousCartItems,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
    },
  });

  const changeCartItemQuantityMutation = useMutation({
    mutationFn: async ({
      cartItemId,
      newQuantity,
    }: {
      cartItemId: number;
      newQuantity: number;
    }) => {
      await fetchCartItemQuantity(cartItemId, newQuantity);
    },

    onMutate: async ({ newQuantity }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      const previousCartItems = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEM,
      ]);

      if (newQuantity === 0) {
        queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) =>
          old.filter((item: CartItem) => item.product.id !== productId),
        );
      } else {
        queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) =>
          old.map((item: CartItem) =>
            item.product.id === productId
              ? { ...item, quantity: newQuantity }
              : item,
          ),
        );
      }

      return { previousCartItems };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData(
          [QUERY_KEYS.CART_ITEM],
          context.previousCartItems,
        );
      }
    },
    onSuccess: (_data, { cartItemId, newQuantity }) => {
      if (newQuantity === 0) {
        deleteCartItemMutation.mutate(cartItemId);
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      }
    },
  });

  const showCountButton = () => {
    addCartItemMutation.mutate(1);
  };

  return {
    handleCartItemQuantity: (cartItemId: number, newQuantity: number) => {
      changeCartItemQuantityMutation.mutate({ cartItemId, newQuantity });
    },
    handleDeleteCartItem: (cartItemId: number) => {
      deleteCartItemMutation.mutate(cartItemId);
    },
    showCountButton,
  };
};

export default useCartItemHandler;
