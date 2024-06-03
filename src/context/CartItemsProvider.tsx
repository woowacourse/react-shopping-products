import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { CartItem } from '../types';

interface CartItemsContextValue {
  cartItems: CartItem[];
  refreshCartItems: () => void;
}

export const CartItemsContext = createContext<CartItemsContextValue>({
  cartItems: [],
  refreshCartItems: () => {},
});

  const { cartItems, getCartItems } = useCartItems();
export const CartItemsProvider = ({ children }: PropsWithChildren) => {
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (shouldRefresh) {
      getCartItems();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const refreshCartItems = () => {
    setShouldRefresh(true);
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, refreshCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
