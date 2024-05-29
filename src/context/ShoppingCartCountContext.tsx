import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { fetchShoppingCartQuantity } from '../api';

const CartContext = createContext<{
  counts: number;
  setCounts: React.Dispatch<React.SetStateAction<number>>;
}>({
  counts: 0,
  setCounts: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [counts, setCounts] = useState<number>(0);

  useEffect(() => {
    const fetchQuantity = async () => {
      const shoppingCartQuantity = await fetchShoppingCartQuantity();
      setCounts(shoppingCartQuantity);
    };

    fetchQuantity();
  }, []);

  return (
    <CartContext.Provider value={{ counts, setCounts }}>
      {children}
    </CartContext.Provider>
  );
};
