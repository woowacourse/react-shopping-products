import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { fetchShoppingCartQuantity } from '../api';
import { useToast } from '../hooks/useToast';
export const CartContext = createContext<{
  counts: number;
  setCounts: React.Dispatch<React.SetStateAction<number>>;
}>({
  counts: 0,
  setCounts: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [counts, setCounts] = useState(0);
  const { createToast } = useToast();

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const shoppingCartQuantity = await fetchShoppingCartQuantity();
        setCounts(shoppingCartQuantity);
      } catch (error) {
        if (error instanceof Error) {
          createToast(
            '⛔️ 장바구니 수량을 가져오는데 실패했습니다. 다시 시도해 주세요.',
          );
        }
      }
    };

    fetchQuantity();
  }, [createToast]);

  return (
    <CartContext.Provider value={{ counts, setCounts }}>
      {children}
    </CartContext.Provider>
  );
};
