import { ReactNode, createContext, useEffect, useState } from 'react';

import { CartItem } from '@/types/cartItem.type';
import { getCartList } from '@/api/cartItem';

interface CartContextType {
  cartList: CartItem[];
  fetchCartList: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cartList, setCartList] = useState<CartItem[]>([]);

  const fetchCartList = async () => {
    try {
      const cartList = await getCartList();
      setCartList(cartList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  const value: CartContextType = { cartList, fetchCartList };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
