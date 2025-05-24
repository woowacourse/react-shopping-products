import { PropsWithChildren, useState } from "react";
import { ProductContext } from "../context/productContext";
import { Product } from "../types/response.types";

export default function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[] | null>(null);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
