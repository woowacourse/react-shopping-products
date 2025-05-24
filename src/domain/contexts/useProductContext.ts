import { createContext, useContext } from "react";

export interface ProductContextValue {}

export const ProductContext = createContext<ProductContextValue | null>(null);

export default function useProductContext(): ProductContextValue {
  const context = useContext(ProductContext);
  if (!context) throw new Error("ProductContext.Provider로 감싸주세요");
  return context;
}
