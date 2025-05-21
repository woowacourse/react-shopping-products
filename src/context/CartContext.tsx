import { createContext } from 'react';
import useCartHandler from '../hooks/useCartHandler';
import useErrorMessageContext from '../hooks/useErrorMessageContext';

interface CartContextProps {
  children: React.ReactNode;
}

interface CartContextType {
  cartItemsIds: number[];
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: CartContextProps) => {
  const { handleErrorMessage } = useErrorMessageContext();
  const { cartItemsIds, handleAddCartItemsIds, handleRemoveCartItemsIds } = useCartHandler({
    handleErrorMessage,
  });

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
