import { useState } from 'react';
import { addCartItem, deleteCartItem } from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from './useToast';
import { CHANGE_CART_ITEM_COUNT } from '../constants';
import { useMutation } from '@tanstack/react-query';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const useCartItemHandler = ({ productId, initIsInCart }: CartButtonProps) => {
  const [isInCart, setIsInCart] = useState(initIsInCart);
  const { setCounts } = useCart();
  const { createToast } = useToast();

  const addCartItemMutation = useMutation({
    mutationFn: async (itemQuantity: number) => {
      await addCartItem(productId, itemQuantity);
    },
    onMutate: () => {
      setCounts((prev) => prev + CHANGE_CART_ITEM_COUNT);
      setIsInCart(true);
    },
    onError: () => {
      createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
      setCounts((prev) => Math.max(0, prev - CHANGE_CART_ITEM_COUNT));
      setIsInCart(false);
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: async () => {
      await deleteCartItem(productId);
    },
    onMutate: () => {
      setCounts((prev) => Math.max(0, prev - CHANGE_CART_ITEM_COUNT));
      setIsInCart(false);
    },
    onError: () => {
      createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
      setCounts((prev) => prev + CHANGE_CART_ITEM_COUNT);
      setIsInCart(true);
    },
  });

  return {
    isInCart,
    handleAddCartItem: (itemQuantity: number) =>
      addCartItemMutation.mutate(itemQuantity),
    handleRemoveCartItem: () => deleteCartItemMutation.mutate(),
    loading: addCartItemMutation.isPending || deleteCartItemMutation.isPending,
    error: addCartItemMutation.isError || deleteCartItemMutation.isError,
  };
};

export default useCartItemHandler;
