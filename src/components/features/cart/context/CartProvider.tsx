import { getShoppingCartList } from '@/components/features/cart';
import { showErrorToast } from '@/services/toastStore';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type Cart } from '../type';

export const CartContext = createContext<{
  cartList: Cart[];
  cartCount: number;
  refetch: () => void;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartList, setCartList] = useState<Cart[]>([]);

  const getShoppingCartDataHandler = useCallback(async () => {
    try {
      const cartsData = await getShoppingCartList();
      if (cartsData) setCartList(cartsData);
    } catch {
      showErrorToast('장바구니를 불러오는 데 실패했습니다.');
    }
  }, []);

  const refetch = () => {
    getShoppingCartDataHandler();
  };

  useEffect(() => {
    getShoppingCartDataHandler();
  }, [getShoppingCartDataHandler]);

  const cartCount = useMemo(() => cartList.length, [cartList]);

  return (
    <CartContext.Provider value={{ cartList, cartCount, refetch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
