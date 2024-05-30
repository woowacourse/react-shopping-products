import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { CartItem } from '@/types';
import {
  requestCartItemList,
  requestAddCartItem,
  requestDeleteCartItem,
} from '@/apis/request/cartItem';
import { useToast } from './useToast';

const BASE_PAGE_SIZE = 20;

interface CartItemListContextType {
  loading: boolean;
  cartItemList: CartItem[];
  toggleCartItem: (cartItemId: number) => void;
  isInCart: (productId: number) => boolean;
  error: null | Error;
}

export const CartItemListContext = createContext<CartItemListContextType | undefined>(undefined);

export const CartItemListProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const updateCartItemListForAllPage = async () => {
    try {
      setLoading(true);
      const { content, totalPages } = await requestCartItemList(1, BASE_PAGE_SIZE);

      for (let i = 2; i <= totalPages; i++) {
        const { content: curCartItemList } = await requestCartItemList(i, BASE_PAGE_SIZE);
        content.push(...curCartItemList);
      }

      setCartItemList(content);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const addCartItem = async (productId: number) => {
    await requestAddCartItem(productId, 1);

    const prevPage = Math.ceil(cartItemList.length / BASE_PAGE_SIZE);
    const ItemCountInLastPage = cartItemList.length % BASE_PAGE_SIZE;

    let curPage;
    if (ItemCountInLastPage < BASE_PAGE_SIZE) curPage = prevPage;
    else curPage = prevPage + 1;

    const { content } = await requestCartItemList(curPage, BASE_PAGE_SIZE);
    const curCartItem = content.find(({ product }) => product.id === productId);

    if (!curCartItem) {
      showToast('system error. 관리자에게 문의하십시오.');
      return;
    }

    setCartItemList((prev) => [...prev, curCartItem]);
  };

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    const updatedCartItemList = cartItemList.filter(({ id }) => id !== cartItemId);

    setCartItemList(updatedCartItemList);
  };

  const toggleCartItem = async (productId: number) => {
    const cartItem = cartItemList.find(({ product }) => product.id === productId);

    try {
      if (cartItem) await deleteCartItem(cartItem.id);
      else await addCartItem(productId);
    } catch (error) {
      showToast('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const isInCart = (productId: number) => {
    return cartItemList.some(({ product }) => product.id === productId);
  };

  useEffect(() => {
    updateCartItemListForAllPage();
  }, []);

  const value = useMemo(
    () => ({
      loading,
      cartItemList,
      toggleCartItem,
      isInCart,
      error,
    }),
    [cartItemList, toggleCartItem, isInCart],
  );

  return <CartItemListContext.Provider value={value}>{children}</CartItemListContext.Provider>;
};

export const useCartItemListContext = () => {
  const context = useContext(CartItemListContext);

  if (!context) {
    throw new Error('useCartItemListContext는 CartItemListProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
