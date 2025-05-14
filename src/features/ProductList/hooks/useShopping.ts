import { useState } from 'react';

import { useCart } from './useCart';
import { useProductList } from './useProductList';

export const useShopping = () => {
  const { cartData, isLoading, addToCart } = useCart();
  const { product, categorySelect, priceSelect, handleCategorySelect, handlePriceSelect } =
    useProductList();

  const data = product.map((item) => {
    const isInCart = cartData.some((cartItem) => cartItem.id === item.id);
    return {
      ...item,
      isChecked: isInCart,
    };
  });

  return {
    cartData,
    filteredData: data,
    isLoading,
    addToCart,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
