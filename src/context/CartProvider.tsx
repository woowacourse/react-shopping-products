import { createContext, useCallback, useEffect, useState } from 'react';
import { baseAPI } from '../api/baseAPI';
import { CartData } from '../api/type';
import { convertResponseToCart } from '../components/features/product/responseMapper';
import { Cart } from '../components/features/product/type';

export const CartContext = createContext<{
  cartList: Cart[];
  refetch: () => void;
}>({
  cartList: [],
  refetch: () => {},
});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartList, setCartList] = useState<Cart[]>([]);

  const getShoppingCartDataHandler = useCallback(async () => {
    const initialPage = 0;
    const maxSize = 50;
    const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

    const data = await baseAPI<CartData>({
      method: 'GET',
      path: basePath,
    });
    const cartsData = data?.content.map((cart) => convertResponseToCart(cart));
    if (cartsData) setCartList(cartsData);
  }, []);

  const refetch = () => {
    getShoppingCartDataHandler();
  };

  useEffect(() => {
    getShoppingCartDataHandler();
  }, [getShoppingCartDataHandler]);

  return (
    <CartContext.Provider value={{ cartList, refetch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
