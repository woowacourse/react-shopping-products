import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import {
  requestCartItemList,
  requestAddCartItem,
  requestDeleteCartItem,
} from '@/apis/request/cartItem';
import { useToast } from './useToast';
import { CartItem } from '@/types/cartItem.type';
import { SYSTEM_ERROR_MESSAGE } from '@/constants/messages';

const PAGE = {
  START: 0,
  SIZE: 100,
};

const MAX_ITEM_LENGTH = 100;
const ERROR_MESSAGE = {
  MAX_ITEM_LENGTH: `장바구니에 담을 수 있는 상품의 개수는 최대 ${MAX_ITEM_LENGTH}개까지 입니다.`,
  ADD_CART_ITEM: '아이템을 장바구니에 추가할 수 없습니다.',
  DELETE_CART_ITEM: '아이템을 장바구니에서 제거할 수 없습니다.',
};

interface CartItemListContextType {
  isLoading: boolean;
  cartItemList: CartItem[];
  toggleCartItem: (cartItemId: number) => void;
  isInCart: (productId: number) => boolean;
  error: null | Error;
}

export const CartItemListContext = createContext<CartItemListContextType | undefined>(undefined);

// 장바구니에 담은 상품의 개수는 100개 초과일 수 없다.
export const CartItemListProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<Map<number, CartItem>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const updateCartItemList = async () => {
    try {
      setIsLoading(true);

      const { content } = await requestCartItemList(PAGE.START, PAGE.SIZE);

      const cartItemMap = new Map<number, CartItem>();
      content.forEach((item) => {
        cartItemMap.set(item.product.id, item);
      });

      setCartItemList(cartItemMap);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCartItem = async (productId: number) => {
    if (cartItemList.size >= MAX_ITEM_LENGTH) {
      const error = new Error(ERROR_MESSAGE.MAX_ITEM_LENGTH);
      setError(error);
      // showToast(ERROR_MESSAGE.MAX_ITEM_LENGTH);
      return;
    }

    try {
      await requestAddCartItem(productId, 1);
    } catch (e) {
      const error = new Error(ERROR_MESSAGE.ADD_CART_ITEM);
      setError(error);
      // showToast(ERROR_MESSAGE.ADD_CART_ITEM);
    }

    const { content } = await requestCartItemList(PAGE.START, PAGE.SIZE);
    const curCartItem = content.find(({ product }) => product.id === productId);

    if (!curCartItem) {
      const error = new Error(SYSTEM_ERROR_MESSAGE);
      setError(error);
      // showToast(SYSTEM_ERROR_MESSAGE);
      return;
    }

    const cartItemMap = new Map<number, CartItem>(cartItemList);
    cartItemMap.set(curCartItem.product.id, curCartItem);
    setCartItemList(cartItemMap);
  };

  const deleteCartItem = async (cartItemId: number, productId: number) => {
    try {
      await requestDeleteCartItem(cartItemId);
    } catch (e) {
      const error = new Error(ERROR_MESSAGE.DELETE_CART_ITEM);
      setError(error);
      // showToast(ERROR_MESSAGE.DELETE_CART_ITEM);
    }

    const cartItemMap = new Map<number, CartItem>(cartItemList);
    cartItemMap.delete(productId);
    setCartItemList(cartItemMap);
  };

  const toggleCartItem = async (productId: number) => {
    const cartItem = cartItemList.get(productId);

    if (cartItem) await deleteCartItem(cartItem.id, productId);
    else await addCartItem(productId);
  };

  const isInCart = (productId: number) => {
    return cartItemList.has(productId);
  };

  useEffect(() => {
    updateCartItemList();
  }, []);

  useEffect(() => {
    if (error) {
      showToast({ message: error.message, type: 'alert' });
      setError(null);
    }
  }, [error]);

  const value = useMemo(
    () => ({
      isLoading,
      cartItemList: Array.from(cartItemList.values()),
      toggleCartItem,
      isInCart,
      error,
    }),
    [cartItemList, toggleCartItem, isInCart, error, isLoading],
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
