import { createContext } from 'react';

interface CartContextProps {
  cartItemsIds: number[];
  children: React.ReactNode;
  errorMessage: string;
  handleErrorMessage: (errorMessage: string) => void;
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
}

interface CartContextType {
  cartItemsIds: number[];
  errorMessage: string;
  handleErrorMessage: (errorMessage: string) => void;
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  //TODO : Context 분리
  cartItemsIds,
  errorMessage,
  handleErrorMessage,
  handleAddCartItemsIds,
  handleRemoveCartItemsIds,
  children,
}: CartContextProps) => {
  return (
    <CartContext.Provider
      value={{
        cartItemsIds,
        errorMessage,
        handleErrorMessage,
        handleAddCartItemsIds,
        handleRemoveCartItemsIds,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
