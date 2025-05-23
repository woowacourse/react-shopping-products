import { useContext } from 'react';
import { ProductsWithCartContext } from './ProductsWithCartProvider';

export const useProductsWithCartContext = () => {
  const context = useContext(ProductsWithCartContext);
  if (!context) {
    throw new Error('useProductsWithCartContext must be used within a ProductsWithCartProvider');
  }
  return context;
};
