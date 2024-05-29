import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface UseProductsResult {
  products: Product[];
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const setFetchedProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    setFetchedProducts();
  }, []);

  return { products };
}
