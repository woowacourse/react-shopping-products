import { createContext, useContext, useState } from "react";

interface CartModalContextType {
  isCartModalOpen: boolean;
  handleCartModalOpen: () => void;
  handleCartModalClose: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const handleCartModalOpen = () => setIsCartModalOpen(true);
  const handleCartModalClose = () => setIsCartModalOpen(false);

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
