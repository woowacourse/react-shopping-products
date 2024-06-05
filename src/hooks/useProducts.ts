import { useEffect } from 'react';
import { useProductFetch } from './useProductFetch';
import { useCartItems } from './useCartItems';
import { useProductSelection } from './useProductSelection';

interface Props {
  selectBarCondition: Record<string, string>;
  handleCount: (cartItemCount: number) => void;
}

export default function useProducts({ selectBarCondition, handleCount }: Props) {
  const { products, increaseNextPage, isLoading } = useProductFetch({
    selectBarCondition,
  });
  const {
    cartItems,
    productToCartIdMap,
    errorCartItemsFetch,
    pushCartItem,
    popCartItem,
    getCartItems,
  } = useCartItems();
  const { selectedItems, handleSelect } = useProductSelection({
    cartItems,
    productToCartIdMap,
    pushCartItem,
    popCartItem,
    getCartItems,
  });

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    handleCount(cartItems.length);
  }, [cartItems]);

  return {
    products,
    increaseNextPage,
    selectedItems,
    handleSelect,
    isLoading,
    errorCartItemsFetch,
  };
}
