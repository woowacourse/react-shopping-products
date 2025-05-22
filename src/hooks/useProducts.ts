import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/products';
import { ProductType } from '../types/product';
import { useToast } from "../context/ToastContext";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export function useProducts(sortType: string, category: string = '전체') {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const productsData = await getProducts(sortType, category);

      setProducts(productsData.content);
    } catch (e) {
      console.error(e);
      setIsError(true);
      showToast(ERROR_MESSAGES.productsFetchError);
    } finally {
      setIsLoading(false);
    }
  }, [sortType, category, showToast]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { products, isLoading, isError, setIsError, fetchProduct };
}
