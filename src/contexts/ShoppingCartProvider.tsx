import { createContext, PropsWithChildren, useEffect, useState } from "react";
import getShoppingCart from "../APIs/getShoppingCart";
import { CartItem, Error } from "../types/product.type";
import { INITIAL_ERROR } from "./context.constant";

interface ShoppingCartContextType {
  cartItems: CartItem[];
  shoppingCartError: Error;
  handleCartItemChange: (newCartItems: CartItem[]) => void;
  handleShoppingCartError: (error: Error) => void;
  isShoppingLoading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCartError, setShoppingCartError] =
    useState<Error>(INITIAL_ERROR);
  const [isShoppingLoading, setIsShoppingLoading] = useState<boolean>(false);

  const handleCartItemChange = (newCartItems: CartItem[]) => {
    setCartItems(newCartItems);
  };

  const handleShoppingCartError = (error: Error) => {
    setShoppingCartError(error);
    setTimeout(() => {
      setShoppingCartError(INITIAL_ERROR);
    }, 3000);
  };

  useEffect(() => {
    const params = {
      page: "0",
      size: "50",
    };

    const query = new URLSearchParams(params).toString();
    const endpoint = `/cart-items?${query}`;

    (async () => {
      setIsShoppingLoading(true);
      try {
        const fetchedData = await getShoppingCart({ endpoint });
        setCartItems(fetchedData);
        setShoppingCartError(INITIAL_ERROR);
      } catch (error) {
        setShoppingCartError({
          isError: true,
          errorMessage:
            "장바구니를 불러오는 데 실패했습니다. 다시 시도해주세요.",
        });
        setTimeout(() => {
          setShoppingCartError(INITIAL_ERROR);
        }, 3000);
      } finally {
        setIsShoppingLoading(false);
      }
    })();
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        shoppingCartError,
        handleCartItemChange,
        handleShoppingCartError,
        isShoppingLoading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
