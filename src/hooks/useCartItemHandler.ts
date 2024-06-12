import { addCartItem, deleteCartItem, fetchCartItemQuantity } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartItem } from './useCartItem';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CartItem } from '../type/CartItem';

interface CartButtonProps {
  productId: number;
}

const useCartItemHandler = ({ productId }: CartButtonProps) => {
  const queryClient = useQueryClient();
  const { cartItems, refetch } = useCartItem(false);

  const cartItem = cartItems.find((item) => item.product.id === productId);
  const isInCart = !!cartItem;
  const itemQuantity = cartItem ? cartItem.quantity : 0;

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
      refetch();
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: async () => {
      if (cartItem) await deleteCartItem(cartItem.id);
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
      refetch();
    },
  });

  const addCartItemQuantityMutation = useMutation({
    mutationFn: async (newQuantity: number) => {
      if (cartItem) await fetchCartItemQuantity(cartItem.id, newQuantity);
    },
    onMutate: async (newQuantity: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      const previousCartItems = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEM,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) =>
        old.map((item: CartItem) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
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
      refetch();
    },
  });

  const minusCartItemQuantityMutation = useMutation({
    mutationFn: async (newQuantity: number) => {
      if (cartItem) await fetchCartItemQuantity(cartItem.id, newQuantity);
    },
    onMutate: async (newQuantity: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.CART_ITEM] });
      const previousCartItems = queryClient.getQueryData([
        QUERY_KEYS.CART_ITEM,
      ]);
      queryClient.setQueryData([QUERY_KEYS.CART_ITEM], (old: CartItem[]) =>
        old.map((item: CartItem) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
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
      if (itemQuantity === 1) {
        deleteCartItemMutation.mutate();
      } else {
        refetch();
      }
    },
  });

  const showCountButton = () => {
    addCartItemMutation.mutate(1);
  };

  return {
    isInCart,
    itemQuantity,
    handleAddCartItemQuantity: () =>
      addCartItemQuantityMutation.mutate(itemQuantity + 1),
    handleMinusCartItemQuantity: () =>
      minusCartItemQuantityMutation.mutate(itemQuantity - 1),
    handleDeleteCartItem: () => {
      deleteCartItemMutation.mutate();
    },
    showCountButton,
  };
};

export default useCartItemHandler;
