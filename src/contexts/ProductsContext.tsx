import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import fetchProducts from "../APIs/fetchProducts";

interface ProductsContextType {
  products: Product[];
  isError: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const params = {
      page: 0,
      size: 20,
    };

    const endpoint = "/products";

    (async () => {
      try {
        const fetchedData = await fetchProducts({
          params,
          endpoint,
        });
        setProducts(fetchedData);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        setProducts([]);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isError }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
