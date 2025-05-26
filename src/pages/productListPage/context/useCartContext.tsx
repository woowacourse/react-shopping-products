import { PropsWithChildren, useContext, useState, createContext } from 'react';
import { ResponseCartItem } from '../../../api/types';

type CartContextType = {
  cartItemList: ResponseCartItem[];
  setCartItemList: React.Dispatch<React.SetStateAction<ResponseCartItem[]>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CartContext.Provider value={{ cartItemList, setCartItemList, errorMessage, setErrorMessage, isLoading, setIsLoading }}>{children}</CartContext.Provider>
  );
};

export const useCartItemList = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
