import { useState } from 'react';
import { addCartItem, deleteCartItem } from '../api';
import { CartItemType, ProductType } from '../types';
import { ERROR } from '../constant/message';
import useCartItemQuery from './useCartItemQuery';

export function useCartItems() {
  const { cartItems, refetchCartItems } = useCartItemQuery();
  const [productToCartIdMap, setProductToCartIdMap] = useState<
    Record<ProductType['id'], CartItemType['id']>
  >({});
  const [errorCartItemsFetch, setErrorCartItemsFetch] = useState({ isError: false, message: '' });

  const getProductToCartIdMap = async () => {
    if (!cartItems) return;

    setProductToCartIdMap((prev) => {
      const newProductToCartIdMap: Record<number, number> = { ...prev };
      cartItems?.forEach((cartItem) => {
        newProductToCartIdMap[cartItem.product.id] = cartItem.id;
      });
      return newProductToCartIdMap;
    });
  };

  const pushCartItem = async (itemId: number) => {
    setErrorCartItemsFetch({ isError: false, message: '' });
    try {
      await addCartItem(itemId);
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
      refetchCartItems();
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
    getCartItems: getProductToCartIdMap,
  };
}
