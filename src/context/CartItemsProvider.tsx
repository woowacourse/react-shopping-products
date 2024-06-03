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
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (refresh) {
      getCartItems();
      setRefresh(false);
    }
  }, [shouldRefresh]);

    setShouldRefresh(true);
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, setRefresh }}>
      {children}
    </CartItemsContext.Provider>
  );
};
