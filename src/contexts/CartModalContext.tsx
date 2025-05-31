import { createContext, useContext } from "react";
import useBooleanState from "../hooks/common/useBooleanState";

interface CartModalContextType {
  isCartModalOpen: boolean;
  handleCartModalOpen: () => void;
  handleCartModalClose: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartModalOpen, handleCartModalOpen, handleCartModalClose] = useBooleanState(false);

  return (
    <CartModalContext.Provider value={{ isCartModalOpen, handleCartModalOpen, handleCartModalClose }}>
      {children}
    </CartModalContext.Provider>
  );
};

export const useCartModal = () => {
  const context = useContext(CartModalContext);
  if (!context) throw new Error("useCartModal must be used within an CartModalProvider");
  return context;
};
