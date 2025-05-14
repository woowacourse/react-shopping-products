import { createContext, PropsWithChildren, useEffect, useState } from "react";
import getShoppingCart from "../APIs/getShoppingCart";
import { CartItem } from "../types/product.type";

interface ShoppingCartContextType {
  cartItems: CartItem[];
  isError: boolean;
  handleCartItemChange: (newCartItems: CartItem[]) => void;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const handleCartItemChange = (newCartItems: CartItem[]) => {
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const params = {
      page: "0",
      size: "50",
    };

    const query = new URLSearchParams(params).toString();
    const endpoint = `/cart-items?${query}`;

    (async () => {
      try {
        const fetchedData = await getShoppingCart({ endpoint });
        setCartItems(fetchedData);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        setCartItems([]);
      }
    })();
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, isError, handleCartItemChange }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
