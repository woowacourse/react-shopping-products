import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { fetchShoppingCartQuantity } from '../api';
import { useToast } from '../hooks/useToast';
export const CartContext = createContext<{
  loading: boolean;
  error: string;
  counts: number;
  setCounts: React.Dispatch<React.SetStateAction<number>>;
  handleRetry: () => void;
}>({
  loading: false,
  error: '',
  counts: 0,
  setCounts: () => {},
  handleRetry: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [counts, setCounts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { createToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setError('');
    const fetchQuantity = async () => {
      try {
        const shoppingCartQuantity = await fetchShoppingCartQuantity();
        setCounts(shoppingCartQuantity);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          createToast(
            '⛔️ 장바구니 수량을 가져오는데 실패했습니다. 다시 시도해 주세요.',
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuantity();
  }, [createToast]);

  const handleRetry = async () => {
    setLoading(true);
    setError('');
    try {
      const shoppingCartQuantity = await fetchShoppingCartQuantity();
      setCounts(shoppingCartQuantity);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        createToast('⛔️ 장바구니 수량 요청 재시도 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ loading, error, counts, setCounts, handleRetry }}
    >
      {children}
    </CartContext.Provider>
  );
};
