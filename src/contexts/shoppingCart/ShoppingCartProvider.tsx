import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { CartItem, Error } from "../../types/product.type";
import { INITIAL_ERROR } from "../context.constant";
import { useGetShoppingCart } from "../../hooks/shoppingCart/useGetShoppingCart";

interface ShoppingCartContextType {
  cartItems: CartItem[];
  shoppingCartError: Error;
  handleCartItemChange: (newCartItems: CartItem[]) => void;
  handleShoppingCartError: (error: Error) => void;
  handleIsShoppingLoading: (loading: boolean) => void;
  isShoppingLoading: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, error, isLoading } = useGetShoppingCart();
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

  const handleIsShoppingLoading = (value: boolean) => {
    setIsShoppingLoading(value);
  };

  useEffect(() => {
    setCartItems(data);
    setShoppingCartError(error);
    setIsShoppingLoading(isLoading);
  }, [data, error, isLoading]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        shoppingCartError,
        handleCartItemChange,
        handleShoppingCartError,
        handleIsShoppingLoading,
        isShoppingLoading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
