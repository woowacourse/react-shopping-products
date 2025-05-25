import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import postCartItems from "../api/postCartItems";
import patchCartItemQuantity from "../api/patchCartItemQuantity";
import { Product } from "../types/productType";

export const APIContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  data: {},
  setData: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

const CART_MAX_COUNT = 50;

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <APIContext.Provider
      value={{ data, setData, errorMessage, setErrorMessage }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPIData<T>(name: string) {
  const { data } = useContext(APIContext);
  return data[name] as T | undefined;
}

export function useAPI<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) {
  const { data, setData } = useContext(APIContext);
  const { setErrorMessage } = useContext(APIContext);

  const request = useCallback(async () => {
    const res = await fetcher();
    setData((data) => {
      return { ...data, [name]: res };
    });
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
