import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { baseAPI } from '../api/baseAPI';
import { CartData } from '../api/type';
import { convertResponseToCart } from '../components/features/product/responseMapper';
import { Cart } from '../components/features/product/type';
import { useShopErrorContext } from '../shop/context/useShopErrorContext';

export const CartContext = createContext<{
  cartList: Cart[];
  cartCount: number;
  refetch: () => void;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const { handleErrorTrue, handleErrorFalse } = useShopErrorContext();

  const getShoppingCartDataHandler = useCallback(async () => {
    const initialPage = 0;
    const maxSize = 50;
    const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

    try {
      const data = await baseAPI<CartData>({
        method: 'GET',
        path: basePath,
      });
      const cartsData = data?.content.map((cart) =>
        convertResponseToCart(cart)
      );
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
