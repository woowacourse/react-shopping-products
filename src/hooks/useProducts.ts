import { useState } from 'react';

import { Product } from '../types/product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProducts = (newProducts: Product[]) => {
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  const resetProducts = () => {
    setProducts([]);
  };

  return { products, addProducts, resetProducts };
};

export default useProducts;
