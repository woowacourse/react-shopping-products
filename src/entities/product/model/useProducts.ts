import { useContext } from "react";
import { ProductContext, ProductContextType } from "./ProductContext";

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};
