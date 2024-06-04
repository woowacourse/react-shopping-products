import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getCartCounts } from "../api/cart";

interface CartContextType {
  quantity: number;
  fetchCartCounts: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const fetchCartCounts = async () => {
    try {
      const count = await getCartCounts();
      setQuantity(count);
    } catch (error) {
      console.error("Failed to fetch cart counts", error);
    }
  };

  useEffect(() => {
    fetchCartCounts();
  }, []);

  return (
    <CartContext.Provider value={{ quantity, fetchCartCounts }}>{children}</CartContext.Provider>
  );
};
