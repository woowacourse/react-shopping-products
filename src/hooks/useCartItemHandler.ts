import { useEffect, useState } from 'react';
import { addCartItem, deleteCartItem, fetchCartItemQuantity } from '../api';
import { useToast } from './useToast';
import { CHANGE_CART_ITEM_COUNT } from '../constants';
import { useMutation } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import { InitProductItem } from '../type/ProductItem';

interface CartButtonProps {
  productId: number;
}

const useCartItemHandler = ({ productId }: CartButtonProps) => {
  const [isInCart, setIsInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(0);
  const { createToast } = useToast();
  const { cartItem, refetch } = useCart();

  useEffect(() => {
    const initProductItem = (productId: number): InitProductItem => {
      const isCartItemInProduct = cartItem.find(
        (item) => item.product.id === productId,
      );
      return isCartItemInProduct
        ? {
            orderId: isCartItemInProduct.id,
            initIsInCart: true,
            initQuantity: isCartItemInProduct.quantity,
          }
        : { initIsInCart: false, initQuantity: 0 };
    };
    const { initIsInCart, initQuantity } = initProductItem(productId);
    setIsInCart(initIsInCart);
    setItemQuantity(initQuantity);
  }, [productId, setIsInCart, setItemQuantity, cartItem]);

  const addCartItemMutation = useMutation({
    mutationFn: async (itemQuantity: number) => {
      await addCartItem(productId, itemQuantity);
    },
    onMutate: () => {
      setItemQuantity((prev) => prev + CHANGE_CART_ITEM_COUNT);
    },
    onError: () => {
      createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
      setItemQuantity((prev) => Math.max(0, prev - CHANGE_CART_ITEM_COUNT));
      setIsInCart(false);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: async () => {
      const targetItem = cartItem.find((item) => item.product.id === productId);
      if (targetItem) await deleteCartItem(targetItem.id);
    },
    onMutate: () => {
      setIsInCart(false);
    },
    onError: () => {
      createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
      setItemQuantity(itemQuantity);
      setIsInCart(true);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const addCartItemQuantityMutation = useMutation({
    mutationFn: async (itemQuantity: number) => {
      const targetItem = cartItem.find((item) => item.product.id === productId);
      if (targetItem) await fetchCartItemQuantity(targetItem.id, itemQuantity);
    },
    onMutate: () => {
      setItemQuantity((prev) => prev + CHANGE_CART_ITEM_COUNT);
    },
    onError: () => {
      createToast(
        '⛔️ 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.',
      );
      setItemQuantity((prev) => Math.max(0, prev - CHANGE_CART_ITEM_COUNT));
    },
    onSuccess: () => {
      refetch();
    },
  });

  const minusCartItemQuantityMutation = useMutation({
    mutationFn: async (itemQuantity: number) => {
      const targetItem = cartItem.find((item) => item.product.id === productId);
      if (targetItem) await fetchCartItemQuantity(targetItem.id, itemQuantity);
      if (itemQuantity === 0) {
        setIsInCart(false);
      }
    },
    onMutate: () => {
      setItemQuantity((prev) => Math.max(1, prev - CHANGE_CART_ITEM_COUNT));
    },
    onError: (itemQuantity: number) => {
      createToast(
        '⛔️ 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.',
      );
      setItemQuantity((prev) => prev + CHANGE_CART_ITEM_COUNT);
      if (itemQuantity === 1) {
        setIsInCart(true);
      }
    },
    onSuccess: () => {
      if (itemQuantity === 1) {
        refetch();
      }
    },
  });

  const showCountButton = () => {
    setIsInCart(true);
    setItemQuantity(0);
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
