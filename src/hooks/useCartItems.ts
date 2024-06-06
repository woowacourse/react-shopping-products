import { useState } from 'react';
import { addCartItem, deleteCartItem, fetchCartItem } from '../api';
import { CartItemType, ProductType } from '../types';
import { ERROR } from '../constant/message';

export function useCartItems() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [productToCartIdMap, setProductToCartIdMap] = useState<
    Record<ProductType['id'], CartItemType['id']>
  >({});
  const [errorCartItemsFetch, setErrorCartItemsFetch] = useState({ isError: false, message: '' });

  const getCartItems = async () => {
    const cartItems = await fetchCartItem();

    setCartItems(cartItems);
    setProductToCartIdMap((prev) => {
      const newProductToCartIdMap: Record<number, number> = { ...prev };
      cartItems.forEach((cartItem) => {
        newProductToCartIdMap[cartItem.product.id] = cartItem.id;
      });
      return newProductToCartIdMap;
    });
  };

  const pushCartItem = async (itemId: number) => {
    setErrorCartItemsFetch({ isError: false, message: '' });
    try {
      await addCartItem(itemId);
      getCartItems();
      return true;
    } catch {
      setErrorCartItemsFetch({ isError: true, message: ERROR.addProduct });
      return false;
    }
  };

  const popCartItem = async (itemId: number) => {
    setErrorCartItemsFetch({ isError: false, message: '' });
    try {
      await deleteCartItem(itemId);
      getCartItems();
      return true;
    } catch {
      setErrorCartItemsFetch({ isError: true, message: ERROR.deleteProduct });
      return false;
    }
  };

  return {
    cartItems,
    productToCartIdMap,
    errorCartItemsFetch,
    pushCartItem,
    popCartItem,
    getCartItems,
  };
}
