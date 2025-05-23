import { useCallback, useMemo } from 'react';

import { useCart } from './useCart';
import { useProductList } from './useProductList';

export const useShopping = () => {
  const { cartData, addToCart, increaseQuantity, decreaseQuantity, deleteFromCart } = useCart();
  const {
    isLoading: isProductLoading,
    product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useProductList();

  const data = useMemo(() => {
    return product.map((item) => {
      const isInCart = cartData
        .map((item) => item.product)
        .some((cartItem) => cartItem.id === item.id);
      return {
        ...item,
        isChecked: isInCart,
      };
    });
  }, [cartData, product]);

  const addCartItem = useCallback(
    async (id: number) => {
      await addToCart(id, 1);
    },
    [addToCart]
  );

  const updateCartQuantity = useCallback(
    async (cartItemId: number, delta: number, currentQuantity: number) => {
      const newQuantity = currentQuantity + delta;

      if (newQuantity < 1) {
        await deleteFromCart(cartItemId);
      } else {
        if (delta > 0) {
          await increaseQuantity(cartItemId, currentQuantity);
        } else {
          await decreaseQuantity(cartItemId, currentQuantity);
        }
      }
    },
    [deleteFromCart, increaseQuantity, decreaseQuantity]
  );

  return {
    cartData,
    filteredData: data,
    isLoading: isProductLoading,
    addCartItem,
    updateCartQuantity,
    deleteFromCart,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
