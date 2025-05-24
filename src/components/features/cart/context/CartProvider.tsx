import { getShoppingCartList } from '@/components/features/cart';
import { useShopErrorContext } from '@/pages/shop/context/useShopErrorContext';
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
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

  const getShoppingCartDataHandler = useCallback(async () => {
    try {
      const cartsData = await getShoppingCartList();
      if (cartsData) setCartList(cartsData);
      hideErrorMessage();
    } catch {
      showErrorMessage('장바구니를 불러오는 데 실패했습니다.');
    }
  }, [showErrorMessage, hideErrorMessage]);

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
