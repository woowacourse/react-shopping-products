import { createContext } from 'react';

interface CartContextProps {
  cartItemsIds: number[];
  children: React.ReactNode;
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
}

interface CartContextType {
  cartItemsIds: number[];
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  cartItemsIds,
  handleAddCartItemsIds,
  handleRemoveCartItemsIds,
  children,
}: CartContextProps) => {
  return (
    <CartContext.Provider
      value={{
        cartItemsIds,
        handleAddCartItemsIds,
        handleRemoveCartItemsIds,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
