import { getShoppingCartList } from '@/components/features/product/api/getShoppingCartList';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Cart } from '../components/features/product/type';

export const CartContext = createContext<{
  cartList: Cart[];
  cartCount: number;
  refetch: () => void;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const { handleErrorTrue, handleErrorFalse } = useShopErrorContext();

  const getShoppingCartDataHandler = useCallback(async () => {
    try {
      const cartsData = await getShoppingCartList();
      if (cartsData) setCartList(cartsData);
      handleErrorFalse();
    } catch (e) {
      handleErrorTrue('장바구니를 불러오는 데 실패했습니다.');
    }
  }, [handleErrorTrue, handleErrorFalse]);

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
