import { createContext, useContext, useState, useCallback } from "react";
import { getCartItems } from "../api/cartItems";
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

  const fetchCartItems = useCallback(
    async (withGlobalLoading = true) => {
      try {
        if (withGlobalLoading) setGlobalLoading(true);
        const data = await getCartItems();
        const mapped = data.map((item) => ({
          productId: item.product.id,
          basketId: item.id,
        }));
        setBasketProductsIds(mapped);
      } catch (e) {
        console.error(ERROR_MSG.BASKET_FETCH_FAIL, e);
      } finally {
        if (withGlobalLoading) setGlobalLoading(false);
      }
    },
    [setGlobalLoading],
  );

  return (
    <CartContext.Provider
      value={{
        basketProductsIds,
        fetchCartItems,
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
