import { PropsWithChildren, useContext, useState, createContext } from 'react';
import { ResponseCartItem } from '../../../api/types';

type CartContextType = {
  cartItemList: ResponseCartItem[];
  setCartItemList: React.Dispatch<React.SetStateAction<ResponseCartItem[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);

  return <CartContext.Provider value={{ cartItemList, setCartItemList }}>{children}</CartContext.Provider>;
};

export const useCartItemList = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
