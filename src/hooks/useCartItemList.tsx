import { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '@/types';
import {
  requestCartItemList,
  requestAddCartItem,
  requestDeleteCartItem,
} from '@/apis/request/CartItem';

const mockData: CartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 2,
      name: '안농',
      price: 123,
    },
  },
  {
    id: 2,
    quantity: 10,
    product: {
      id: 3,
      name: '안농',
      price: 12322,
    },
  },
];

interface CartItemListContextType {
  cartItemList: number[];
  toggleCartItem: (cartItemId: number) => void;
}

const CartItemListContext = createContext<CartItemListContextType | undefined>(undefined);

export const CartItemListProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemList, setCartItemList] = useState(mockData);
  const [page, setPage] = useState(1);
  
  const data = [
    {
      productId: 1,
      cartItem: 2,
    },
  ];

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);
    // setCartItemList(cartItemList.filter(({id}) => id !== cartItem.id));
  };

  const addCartItem = async (productId: number) => {
    await requestAddCartItem(productId, 1);
    // setCartItemList([...cartItemList, productId]);
  };

  const toggleCartItem = (productId: number) => {
    const cartItem = cartItemList.find(({ product }) => product.id === productId);

    if (!cartItem) {
      alert('존재하지 않는 아이템입니다.');
      return;
    }

    if (cartItemList.some(({ id }) => id === cartItem.id)) deleteCartItem(cartItem.id);
    else addCartItem(productId);

    updateCartItemList();
  };

  const updateCartItemList = async () => {
    const cartItemList = await requestCartItemList();

    setCartItemList(cartItemList);
  };

  return (
    <CartItemListContext.Provider value={{ cartItemList, toggleCartItem, updateCartItemList }}>
      {children}
    </CartItemListContext.Provider>
  );
};

export const useCartItemList = () => useContext(CartItemListContext);
