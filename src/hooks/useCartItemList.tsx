import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { CartItem } from '@/types';
import {
  requestCartItemList,
  requestAddCartItem,
  requestDeleteCartItem,
} from '@/apis/request/CartItem';

const BASE_PAGE_SIZE = 20;

interface CartItemListContextType {
  cartItemList: CartItem[];
  toggleCartItem: (cartItemId: number) => void;
  updateCartItemList: (page: number) => void;
  handleDeleteCartItem: (cartItemId: number) => void;
}

const getPageForCartItem = (cartItemId: number, cartItems: CartItem[], pageSize: number) => {
  const index = cartItems.findIndex((item) => item.id === cartItemId);
  if (index === -1) return -1;
  return Math.floor(index / pageSize) + 1;
};

const CartItemListContext = createContext<CartItemListContextType | undefined>(undefined);

export const CartItemListProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [page, setPage] = useState(1);

  const updateCartItemList = async (page: number) => {
    const cartItems = await requestCartItemList(page);
    setCartItemList(cartItems);
    setPage(page);
  };

  const addCartItem = async (productId: number) => {
    await requestAddCartItem(productId, 1);
    updateCartItemList(page);
  };

  const handleDeleteCartItem = async (cartItemId: number) => {
    const page = getPageForCartItem(cartItemId, cartItemList, BASE_PAGE_SIZE);

    if (page === -1) {
      alert('아이템을 찾을 수 없습니다.');
      return;
    }

    await deleteCartItem(cartItemId, page);
  };

  const deleteCartItem = async (cartItemId: number, page: number) => {
    await requestDeleteCartItem(cartItemId);
    updateCartItemList(page);
  };

  const toggleCartItem = (productId: number) => {
    const cartItem = cartItemList.find(({ product }) => product.id === productId);

    if (!cartItem) {
      alert('존재하지 않는 아이템입니다.');
      return;
    }

    if (cartItemList.some(({ id }) => id === cartItem.id)) deleteCartItem(cartItem.id, page);
    else addCartItem(productId);

    updateCartItemList(page);
  };

  const value = useMemo(
    () => ({
      cartItemList,
      toggleCartItem,
      updateCartItemList,
      handleDeleteCartItem,
    }),
    [cartItemList, toggleCartItem, updateCartItemList, handleDeleteCartItem],
  );

  return <CartItemListContext.Provider value={value}>{children}</CartItemListContext.Provider>;
};

export const useCartItemList = () => useContext(CartItemListContext);
