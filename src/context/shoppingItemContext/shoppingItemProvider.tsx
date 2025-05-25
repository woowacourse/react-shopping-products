import { useMemo } from 'react';
import useShoppingItemList from '../../hook/useShoppingItemList';
import ShoppingItemContext from './shoppingItemContext';

const ShoppingItemProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    error,
    isLoading,
    selectCategory,
    selectSort,
    category,
    sortType,
    retryFetch,
  } = useShoppingItemList();

  const value = useMemo(
    () => ({
      data,
      error,
      isLoading,
      selectCategory,
      selectSort,
      category,
      sortType,
      retryFetch,
    }),
    [
      data,
      error,
      isLoading,
      selectCategory,
      selectSort,
      category,
      sortType,
      retryFetch,
    ]
  );

  return (
    <ShoppingItemContext.Provider value={value}>
      {children}
    </ShoppingItemContext.Provider>
  );
};

export default ShoppingItemProvider;
