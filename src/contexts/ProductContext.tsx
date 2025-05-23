import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ProductDTOType } from '../types/product';
import getProducts from '../api/getProducts';

type ProductContextType = {
  products: ProductDTOType[] | null;
  isLoading: boolean;
  isError: boolean;
  fetchProducts: (params: { sort: string; category: string }) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductDTOType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProducts = useCallback(
    async ({ sort, category }: { sort: string; category: string }) => {
      try {
        setIsLoading(true);
        const data = await getProducts({ category: category, sortKey: 'price', sortOrder: sort });
        setProducts(data);
      } catch (e) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <ProductContext.Provider value={{ products, isLoading, isError, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
