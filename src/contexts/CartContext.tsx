import { createContext, useContext, useState, useCallback } from "react";
import { getCartItems } from "../api/cartItems";

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
        console.error("[CartContext] Failed to fetch cart items", e); // 잠만 근데 이거 콘솔에 띄움 걍 ? 에러 메시지로 보여줘야되지 않니 이것도 컨텍스트로 해야될듯
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
    throw new Error("useCartContext must be used within a CartProvider");
  return context;
};
