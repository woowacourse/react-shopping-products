import { ReactNode, createContext, useEffect, useState } from 'react';

import { CartItem } from '@/types/cartItem.type';
import { getCartList } from '@/api/cartItem';

interface CartContextType {
  cartList: CartItem[];
  fetchCartList: () => Promise<void>;
  error: string | null;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCartList = async () => {
    try {
      const cartList = await getCartList();
      setCartList(cartList);
    } catch (error) {
      setError('cart Item을 가져오는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  const value: CartContextType = { cartList, fetchCartList, error };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
