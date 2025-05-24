import { useContext } from "react";
import { ShoppingContext } from "./ShoppingContext";

export function useShoppingContext() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useCart must be used within a ShoppingProductsProvider");
  }
  return context;
}
