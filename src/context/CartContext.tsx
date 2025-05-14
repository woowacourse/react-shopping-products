import { createContext, useEffect, useState } from 'react';
import { getCartItems } from '../services/cartItemServices';

interface CartContextType {
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    (async () => {
      const cartItemsData = await getCartItems();
      setCartItemCount(cartItemsData.length);
    })();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
