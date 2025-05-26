import { useContext, useCallback, useEffect } from "react";
import { APIContext } from "../contexts/DataContext";
import { Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import patchCartItemQuantity from "../api/patchCartItemQuantity";
import deleteCartItems from "../api/deleteCartItems";

const CART_MAX_COUNT = 50;

export function useAPIData<T>(name: string) {
  const { data } = useContext(APIContext);
  return data[name] as T | undefined;
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<{ data: T; error: null | { message: string } }>;
  name: string;
}) {
  const { data, setData, setErrorMessage, setIsLoading } =
    useContext(APIContext);

  const request = useCallback(async () => {
    try {
      const res = await fetcher();
      const error = res?.error;

      if (!error?.message) {
        setErrorMessage("");
        setData((data) => {
          return { ...data, [name]: res };
        });
        return;
      }
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, name, setData, setErrorMessage, setIsLoading]);

  useEffect(() => {
    const hasData = data[name];
    if (hasData) {
      return;
    }
    request();
  }, [data, name, request]);

  const addToCart = async (product: Product, cartCount: number) => {
    if (cartCount + 1 > CART_MAX_COUNT) {
      setErrorMessage(
        `장바구니에 담을 수 있는 상품은 최대 ${CART_MAX_COUNT}개입니다.`
      );
      return;
    }

    const { error } = await postCartItems(product);

    if (!error?.message) {
      setErrorMessage("");
      return request();
    }

    setErrorMessage(error.message);
  };

  const patchQuantity = async (id: number, quantity: number) => {
    const { error } = await patchCartItemQuantity(id, quantity);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      setErrorMessage("");
      return request();
    }

    setErrorMessage(error.message);
  };

  const removeFromCart = async (productId: number) => {
    const { error } = await deleteCartItems(productId);

    if (!error?.message) {
      setErrorMessage("");
      return request();
    }

    setErrorMessage(error.message);
  };

  return {
    data: data[name] as T | undefined,
    refetch: request,
    addToCart,
    patchQuantity,
    removeFromCart,
  };
}
