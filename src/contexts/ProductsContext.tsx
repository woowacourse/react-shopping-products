import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import fetchProducts from "../APIs/fetchProducts";

interface ProductsContextType {
  products: Product[];
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const requestBody = {
      page: 0,
      size: 20,
    };

    (async () => {
      const fetchedData = await fetchProducts(requestBody);
      setProducts(fetchedData);
    })();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
