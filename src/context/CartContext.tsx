import { createContext } from 'react';
import type { CartItemType } from '../types/data';

interface CartContextType {
  cartItems: CartItemType[];
  handleAddCartItems: (productId: number) => void;
  handleRemoveCartItems: (productId: number) => void;
  handleUpdateCartItems: (productId: number, quantity: number) => void;
}

interface CartContextProps extends CartContextType {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  cartItems,
  handleAddCartItems,
  handleRemoveCartItems,
  handleUpdateCartItems,
  children,
}: CartContextProps) => {
  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddCartItems,
        handleRemoveCartItems,
        handleUpdateCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
