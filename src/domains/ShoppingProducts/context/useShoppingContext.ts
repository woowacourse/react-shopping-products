import { useContext } from "react";
import { ShoppingContext } from "./ShoppingContext";

export function useShoppingContext() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error(
      "useShoppingContext는 ShoppingProductsProvider 안에서만 사용할 수 있습니다."
    );
  }
  return context;
}
