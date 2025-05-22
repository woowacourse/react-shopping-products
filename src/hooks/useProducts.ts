import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/products';
import { ProductType } from '../types/product';

export function useProducts(sortType: string) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const productsData = await getProducts(sortType);

      console.log(productsData.content);

      setProducts(productsData.content);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [sortType]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { products, isLoading, isError, setIsError, fetchProduct };
}
