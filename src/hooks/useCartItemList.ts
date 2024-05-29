import { useEffect, useState } from "react";

import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestFetchCartItemList,
} from "../api/carItems";
import { CartItem } from "../interfaces/CartItem";
import { Product } from "../interfaces/Product";

interface UseCartItemListResult {
  cartItemList: CartItem[];
  loading: boolean;
  error: unknown;
  quantity: number;
  isInCart: (productId: number) => boolean;
  addCartItem: (product: Product) => Promise<void>;
  deleteCartItem: (product: Product) => Promise<void>;
  toggleCartItem: (product: Product) => Promise<void>;
}

export default function useCartItemList(): UseCartItemListResult {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

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
      setError(error);
    } finally {
      setLoading(false);
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
      setError(error);
    } finally {
      setLoading(false);
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
        setLoading(true);
        const data = await requestFetchCartItemList();
        setCartItemList(data.content);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCartItemList();
  }, []);

  return {
    cartItemList,
    loading,
    error,
    quantity,
    isInCart,
    addCartItem,
    deleteCartItem,
    toggleCartItem,
  };
}
