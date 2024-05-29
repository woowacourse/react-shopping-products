import { useEffect, useState } from "react";

import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestFetchCartItemList,
} from "../apis/carItems";
import { CartItem } from "../interfaces/CartItem";
import { Product } from "../interfaces/Product";

interface UseCartItemListResult {
  cartItemList: CartItem[];
  cartItemListLoading: boolean;
  cartItemListError: unknown;
  quantity: number;
  isInCart: (productId: number) => boolean;
  addCartItem: (product: Product) => Promise<void>;
  deleteCartItem: (product: Product) => Promise<void>;
  toggleCartItem: (product: Product) => Promise<void>;
}

export default function useCartItemList(): UseCartItemListResult {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [cartItemListLoading, setCartItemListLoading] = useState<boolean>(true);
  const [cartItemListError, setCartItemListError] = useState<unknown>(null);

  const quantity = cartItemList.length;

  const isInCart = (productId: number) =>
    cartItemList.some(({ product }: CartItem) => product.id === productId);

  const addCartItem = async (product: Product) => {
    setCartItemList((prev) => [
      ...prev,
      {
        id:
          cartItemList.length === 0
            ? 1
            : cartItemList[cartItemList.length - 1].id + 1,
        product: product,
        quantity: 1,
      },
    ]);
    try {
      await requestAddCartItem(product.id, 1);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      setCartItemListLoading(false);
    }
  };

  const deleteCartItem = async (product: Product) => {
    const target = cartItemList.find((item) => {
      item.product.id === product.id;
    });
    const newCartItemList = cartItemList.filter(
      (item: CartItem) => item.product.id !== product.id
    );
    setCartItemList(newCartItemList);
    try {
      await requestDeleteCartItem(target?.id);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      setCartItemListLoading(false);
    }
  };

  const toggleCartItem = async (product: Product) => {
    isInCart(product.id)
      ? await deleteCartItem(product)
      : await addCartItem(product);
  };

  useEffect(() => {
    const getCartItemList = async () => {
      try {
        setCartItemListLoading(true);
        const data = await requestFetchCartItemList();
        setCartItemList(data.content);
      } catch (error) {
        setCartItemListError(error);
      } finally {
        setCartItemListLoading(false);
      }
    };
    getCartItemList();
  }, []);

  return {
    cartItemList,
    cartItemListLoading,
    cartItemListError,
    quantity,
    isInCart,
    addCartItem,
    deleteCartItem,
    toggleCartItem,
  };
}
