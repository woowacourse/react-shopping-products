import { useContext } from "react";
import {
  CartItemsContext,
  CartItemsContextType,
} from "../context/CartItemsContext";

export const useCartItemsContext = (): CartItemsContextType => {
  const context = useContext(CartItemsContext);
  if (!context) {
    throw new Error(
      "useCartItemsContext must be used within an CartItemsProvider"
    );
  }
  return context;
};
