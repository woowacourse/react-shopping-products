import { useCallback, useMemo } from 'react';

import { useCart } from './useCart';
import { useProductList } from './useProductList';

export const useShopping = () => {
  const { cartData, addToCart, deleteFromCart } = useCart();
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

  const toggleCartItem = useCallback(
    async (id: number) => {
      const currentCheckedStatus = data.find((item) => item.id === id)?.isChecked;
      if (currentCheckedStatus) {
        const cartId = cartData.find((item) => item.product.id === id)?.id;
        return cartId && (await deleteFromCart(cartId));
      }
      await addToCart(id, 1);
    },
    [addToCart, cartData, deleteFromCart, data]
  );

  return {
    cartData,
    filteredData: data,
    isLoading: isProductLoading,
    toggleCartItem,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
