import { useMemo } from 'react';
import useShoppingItemList from '../../hook/useShoppingItemList';
import ShoppingItemContext from './shoppingItemContext';

const ShoppingItemProvider = ({ children }: { children: React.ReactNode }) => {
  const shoppingItemList = useShoppingItemList();

  const value = useMemo(
    () => ({
      ...shoppingItemList,
    }),
    [shoppingItemList]
  );

  return (
    <ShoppingItemContext.Provider value={value}>
      {children}
    </ShoppingItemContext.Provider>
  );
};

export default ShoppingItemProvider;
