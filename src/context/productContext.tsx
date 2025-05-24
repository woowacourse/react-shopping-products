import { createContext } from "react";
import { Product } from "../types/response.types";

interface ProductContextType {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

export const ProductContext = createContext<ProductContextType | null>({
  products: null,
  setProducts: () => {},
});
