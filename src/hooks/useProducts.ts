import { useEffect, useState } from 'react';
import { useProductFetch } from './useProductFetch';
import { useCartItems } from './useCartItems';

export default function useProducts() {
  const { products, fetchNextPage, isLoading, handleSelectBarCondition, selectBarCondition } =
    useProductFetch();
  const { cartItems } = useCartItems();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return {
    products,
    cartItems,
    fetchNextPage,
    isLoading,
    cartItemCount,
    handleSelectBarCondition,
    selectBarCondition,
  };
}
