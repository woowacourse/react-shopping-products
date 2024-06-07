import { useEffect, useState } from 'react';
import { useProductFetch } from './useProductFetch';
import { useCartItems } from './useCartItems';
import { useProductSelection } from './useProductSelection';

export default function useProducts() {
  const { products, setPage, hasMore, isLoading, handleSelectBarCondition, selectBarCondition } =
    useProductFetch();
  const { cartItems, idMap, pushCartItem, popCartItem, getCartItems } = useCartItems();
  const { selectedItems, handleSelect } = useProductSelection({
    cartItems,
    idMap,
    pushCartItem,
    popCartItem,
    getCartItems,
  });
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return {
    products,
    setPage,
    hasMore,
    selectedItems,
    handleSelect,
    isLoading,
    cartItemCount,
    handleSelectBarCondition,
    selectBarCondition,
  };
}
