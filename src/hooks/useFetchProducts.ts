import { useState, useEffect } from 'react';
import { getProducts, ProductResponse } from '../api/products';
import { useError } from '../context/ErrorContext';
import { ERROR_MSG } from '../constants/errorMessage';

type useFetchProductsProps = {
  category: string;
  sort: string;
  categoryQueryMap: Record<string, string | undefined>;
  sortQueryMap: Record<string, string | undefined>;
};

export const useFetchProducts = ({
  category,
  sort,
  categoryQueryMap,
  sortQueryMap,
}: useFetchProductsProps) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, setErrorMessage, clearErrorMessage } = useError();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        clearErrorMessage();

        const matchedCategory = categoryQueryMap[category];
        const matchedSort = sortQueryMap[sort];

        const data = await getProducts({
          page: 0,
          size: 20,
          ...(matchedSort && { sort: matchedSort }),
          ...(matchedCategory && { category: matchedCategory }),
        });
        setProducts(data.content);
      } catch (error) {
        console.error(ERROR_MSG.PRODUCT_FETCH_FAIL, error);
        setErrorMessage(ERROR_MSG.PRODUCT_FETCH_FAIL);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort, clearErrorMessage, setErrorMessage, categoryQueryMap, sortQueryMap]);

  return {
    data: products,
    isLoading,
    error: errorMessage,
  };
};
