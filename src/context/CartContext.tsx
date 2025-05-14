import { createContext, useContext, useEffect, useState } from 'react';
import { Cart } from '../components/features/product/type';
import { baseAPI } from '../api/baseAPI';
import { CartData } from '../api/type';
import { convertResponseToCart } from '../components/features/product/responseMapper';

const CartContext = createContext<{
  cartList: Cart[];
}>({
  cartList: [],
});

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('CartProvider 안에서 사용해주세요.');
  }
  return context;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartList, setCartList] = useState<Cart[]>([]);

  useEffect(() => {
    const getShoppingCartDataHandler = async () => {
      const initialPage = 0;
      const maxSize = 50;
      const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

      const data = await baseAPI<CartData>({
        method: 'GET',
        path: basePath,
      });
      const cartsData = data?.content.map((cart) =>
        convertResponseToCart(cart)
      );
      if (cartsData) setCartList(cartsData);
    };

    getShoppingCartDataHandler();
  }, []);

  return (
    <CartContext.Provider value={{ cartList }}>{children}</CartContext.Provider>
  );
}
