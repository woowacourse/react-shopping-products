import { useDataContext } from '../components/contexts/dataContext';
import getProducts from '../api/getProducts';
import { Product } from '../App';
import { useEffect } from 'react';
import useFetcherOnly from './useFetchOnly';

type UseProductsProps = {
  category?: '전체' | '패션잡화' | '식료품';
  priceOrder?: '낮은 가격순' | '높은 가격순';
};
const key = 'products';

const useProducts = ({ category, priceOrder }: UseProductsProps) => {
  const { data: contextData, setData } = useDataContext();

  const {
    data: fetchedProducts,
    isLoading,
    error,
    refetch,
  } = useFetcherOnly<Product>({
    fetcher: getProducts,
    fetcherParams: { category, priceOrder },
    enabled: !contextData[key]?.data,
  });

  useEffect(() => {
    if (!fetchedProducts) return;

    setData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        data: fetchedProducts,
      },
    }));
  }, [fetchedProducts, setData]);

  const products = contextData[key]?.data || [];

  return {
    products,
    isLoading,
    error,
    fetchProducts: refetch,
  };
};

export default useProducts;
