import { useEffect, useState, useContext } from "react";

import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestFetchCartItemList,
} from "../apis/cartItems";
import { CartItem } from "../interfaces/CartItem";
import { Product } from "../interfaces/Product";
import { QuantityContext } from "../store/QuantityContext";

interface UseCartItemListResult {
  cartItemList: CartItem[];
  cartItemListLoading: boolean;
  cartItemListError: unknown;

  isInCart: (productId: number) => boolean;
  toggleCartItem: (product: Product) => Promise<void>;
}

export default function useCartItemList(): UseCartItemListResult {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [cartItemListLoading, setCartItemListLoading] = useState<boolean>(true);
  const [cartItemListError, setCartItemListError] = useState<unknown>(null);
  const quantityContext = useContext(QuantityContext);
  const setQuantity = quantityContext ? quantityContext.setQuantity : () => {};

  const isInCart = (productId: number) => {
    return cartItemList.some(
      ({ product }: CartItem) => product.id === productId
    );
  };

  const addCartItem = async (product: Product) => {
    try {
      await requestAddCartItem(product.id, 1);
      setQuantity((prev: number) => prev + 1);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      const data = await requestFetchCartItemList();
      setCartItemList(data.content);
    }
  };

  const deleteCartItem = async (product: Product) => {
    const target = cartItemList.find((item) => {
      {
        return item.product.id === product.id;
      }
    });
    try {
      await requestDeleteCartItem(target!.id);
      setQuantity((prev: number) => prev - 1);
    } catch (error) {
      setCartItemListError(error);
    } finally {
      const data = await requestFetchCartItemList();
      setCartItemList(data.content);
    }
  };

  const toggleCartItem = async (product: Product) => {
    setCartItemListLoading(true);
    isInCart(product.id)
      ? await deleteCartItem(product)
      : await addCartItem(product);
    setCartItemListLoading(false);
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
    isInCart,
    toggleCartItem,
  };
}
