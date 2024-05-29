import { SetStateAction, createContext, useEffect, useState } from 'react';
import { CartItem } from '../types';
import { fetchCartItems } from '../api/cart';

interface CartItemsContextValue {
  cartItems: CartItem[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

export const CartItemsContext = createContext<CartItemsContextValue>({
  cartItems: [],
  setRefresh: () => {},
});

export const CartItemsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (refresh) {
      fetchCartItems()
        .then((data) => {
          setCartItems(data);
        })
        .finally(() => setRefresh(false));
    }
  }, [refresh]);

  return (
    <CartItemsContext.Provider value={{ cartItems, setRefresh }}>
      {children}
    </CartItemsContext.Provider>
  );
};
