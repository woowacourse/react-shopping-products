import { getShoppingCartList } from '@/components/features/cart';
import { useJaeO } from '@/hooks/useJaeO';
import { showErrorToast } from '@/services/toastStore';
import { createContext, useMemo } from 'react';
import { type Cart } from '../type';

export const CartContext = createContext<{
  cartList: Cart[];
  cartCount: number;
  refetch: () => void;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: cartList } = useJaeO<Cart[]>({
    path: '/cart-items',
    fetchFn: () => {
      return getShoppingCartList();
    },
    onError: () => showErrorToast('장바구니를 불러오는 데 실패했습니다.'),
  });

  const cartCount = useMemo(() => cartList.length, [cartList]);

  return (
    <CartContext.Provider value={{ cartList, cartCount, refetch: () => {} }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
