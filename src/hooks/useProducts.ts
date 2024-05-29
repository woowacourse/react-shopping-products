import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';
import { useToast } from './useToast';

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
  const { showToast } = useToast();

  useEffect(() => {
    const setFetchedProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          showToast('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    };

    setFetchedProducts();
  }, []);

  return { products };
}
