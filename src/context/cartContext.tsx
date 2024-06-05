import { createContext, useContext, ReactNode, useState } from "react";

interface CartContextType {
  quantity: number;
  setQuantity: (id: number) => void;
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

  return <CartContext.Provider value={{ quantity, setQuantity }}>{children}</CartContext.Provider>;
};
