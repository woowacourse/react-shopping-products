import { useEffect, useState } from 'react';
import { addCartItem, deleteCartItem, fetchCartItemQuantity } from '../api';
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
