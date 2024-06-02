import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import useCartItems from '../components/hooks/useCartItems';
import { CartItem } from '../types';

interface CartItemsContextValue {
  cartItems: CartItem[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

export const CartItemsContext = createContext<CartItemsContextValue>({
  cartItems: [],
  setRefresh: () => {},
});

  const { cartItems, getCartItems } = useCartItems();
export const CartItemsProvider = ({ children }: PropsWithChildren) => {
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (refresh) {
      getCartItems();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <CartItemsContext.Provider value={{ cartItems, setRefresh }}>
      {children}
    </CartItemsContext.Provider>
  );
};
