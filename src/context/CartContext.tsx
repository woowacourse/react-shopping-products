import { createContext, useEffect, useState } from 'react';
import { getCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';

interface CartContextType {
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const countDistinct = (cartItems: CartItemType[]) => {
    const itemIds = cartItems.map((item) => item.product.id);
    return new Set(itemIds).size;
  };

  useEffect(() => {
    (async () => {
      const cartItemsData = await getCartItems();
      setCartItemCount(countDistinct(cartItemsData));
    })();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
