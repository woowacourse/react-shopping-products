import { useContext, useCallback, useEffect } from "react";
import { APIContext } from "../contexts/DataContext";
import { Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import patchCartItemQuantity from "../api/patchCartItemQuantity";

const CART_MAX_COUNT = 50;

export function useAPIData<T>(name: string) {
  const { data } = useContext(APIContext);
  return data[name] as T | undefined;
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<{ data: T; error: any }>;
  name: string;
}) {
  const { data, setData, setErrorMessage, isLoading, setIsLoading } =
    useContext(APIContext);

  const request = useCallback(async () => {
    const res = await fetcher();
    const error = res.error;
    if (!error?.message) {
      setErrorMessage("");
      setData((data) => {
        return { ...data, [name]: res };
      });
      return;
    }

    setErrorMessage(error.message);
  }, [fetcher, name, setData]);

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

  return {
    data: data[name] as T | undefined,
    refetch: request,
    addToCart,
    patchQuantity,
  };
}
