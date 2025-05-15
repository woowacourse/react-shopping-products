import { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartProvider";

const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { useShoppingCartContext };
