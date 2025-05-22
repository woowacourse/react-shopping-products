import { createContext, useContext } from 'react';
import useProducts from '../../hooks/useProducts';

export const ProductsContext = createContext<ReturnType<
  typeof useProducts
> | null>(null);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider'
    );
  }
  return context;
};
