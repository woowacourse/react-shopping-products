import { useEffect } from 'react';
import { useCartItems } from './useCartItems';
import { useProductSelection } from './useProductSelection';
import useProductQuery from './useProductQuery';

interface Props {
  selectBarCondition: Record<string, string>;
  handleCount: (cartItemCount: number) => void;
}

export default function useProducts({ selectBarCondition, handleCount }: Props) {
  const { products, isError, isSuccess, fetchNextPage, isFetching } = useProductQuery({
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
    isError,
    isSuccess,
    fetchNextPage,
    selectedItems,
    handleSelect,
    errorCartItemsFetch,
    isFetching,
  };
}
