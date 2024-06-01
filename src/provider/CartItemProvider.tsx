import { CartItemContext } from '@/context/CartItemContext';
import { PropsWithChildren, useMemo } from 'react';
import useCartItemList from '@/hooks/useCartItemList';

export default function CartItemProvider({ children }: PropsWithChildren) {
  const { cartItemList, isLoading, toggleCartItem } = useCartItemList();

  const contextValue = useMemo(
    () => ({
      cartItemList,
      isLoading,
      toggleCartItem,
    }),
    [cartItemList, isLoading, toggleCartItem],
  );

  return <CartItemContext.Provider value={contextValue}>{children};</CartItemContext.Provider>;
}
