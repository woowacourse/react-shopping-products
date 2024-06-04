import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { CartItem } from '@/types/index';
import { getCartList, getCartListQuantity } from '@/api/cartItem';

interface CartContextType {
  cartList: CartItem[];
  updateCartListContext: () => void;
  cartListQuantity: number;
  setCartListQuantity: Dispatch<SetStateAction<number>>;
  fetchCartListQuantity: () => Promise<void>;
  error: string | null;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [cartListQuantity, setCartListQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchCartList = async () => {
    try {
      const cartList = await getCartList();
      setCartList(cartList);
    } catch (error) {
      setError('cart item을 가져오는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  const fetchCartListQuantity = async () => {
    try {
      const cartListQuantity = await getCartListQuantity();
      setCartListQuantity(cartListQuantity);
    } catch (error) {
      setError(
        'cart item quantity를 가져오는데 실패했습니다. 다시 시도해주세요.',
      );
    }
  };

  useEffect(() => {
    fetchCartList();
    fetchCartListQuantity();
  }, []);

  const updateCartListContext = () => {
    fetchCartList();
    fetchCartListQuantity();
  };

  const value: CartContextType = {
    cartList,
    updateCartListContext,
    cartListQuantity,
    setCartListQuantity,
    fetchCartListQuantity,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
