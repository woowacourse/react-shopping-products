import { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "../api/cartItems";
import useData from "../hooks/useData";
import { END_POINT } from "../api/constants/endPoint";
import { useUIContext } from "./UIContext";
import { ERROR_MSG } from "../constants/errorMessage";

export type BasketProductInfo = {
  productId: number;
  basketId: number;
};

type BasketProductInfos = BasketProductInfo[];

interface CartContextType {
  basketProductsIds: BasketProductInfos;
  fetchCartItems: (withGlobalLoading?: boolean) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
  setGlobalLoading,
}: {
  children: React.ReactNode;
  setGlobalLoading: (v: boolean) => void;
}) => {
  const [basketProductsIds, setBasketProductsIds] =
    useState<BasketProductInfos>([]);
  const { setError, setErrorMessage } = useUIContext();

  const {
    data: cartItems,
    isLoading,
    error,
    refetch,
  } = useData<CartItem[]>(END_POINT.CART, {
    queryParams: { page: 0, size: 50 },
  });

  useEffect(() => {
    if (isLoading) {
      setGlobalLoading(true);
      return;
    }

    if (error !== null) {
      setError(true);
      setErrorMessage(ERROR_MSG.BASKET_FETCH_FAIL);
      setGlobalLoading(false);
      return;
    }

    if (cartItems) {
      const mapped = cartItems.map((item) => ({
        productId: item.product.id,
        basketId: item.id,
      }));
      setBasketProductsIds(mapped);
    }

    setGlobalLoading(false);
  }, [cartItems, isLoading, error]);

  return (
    <CartContext.Provider
      value={{
        basketProductsIds,
        fetchCartItems: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext는 CartProvider 내에서 사용해주세요.");
  return context;
};
