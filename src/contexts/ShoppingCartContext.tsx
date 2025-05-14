import { createContext, PropsWithChildren, useEffect, useState } from "react";
import getShoppingCart from "../APIs/getShoppingCart";
import { Product } from "../types/product.type";

interface ShoppingCartContextType {
  cardItems: Product[];
  isError: boolean;
}

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cardItems, setCardItems] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

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
        setCardItems(fetchedData);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        setCardItems([]);
      }
    })();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ cardItems, isError }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
