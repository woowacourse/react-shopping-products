import { useState, useEffect } from 'react';
import { Info } from '../types';
import useProductQueryURL from './useProductQueryURL';
import useFetch from './useFetch';
import useError from './useError';

export default function useProducts({
  page = '0',
  size = '20',
  sortingType = '',
  filterType = '',
}) {
  const [productsInfo, setProductsInfo] = useState<Info>({ content: [] });
  const { fetchData, loading } = useFetch();
  const { requestURL } = useProductQueryURL({ page, size, sortingType, filterType });
  const { showError } = useError();

  const products = [
    ...productsInfo.content.filter(({ quantity }) => quantity !== 0),
    ...productsInfo.content.filter(({ quantity }) => quantity === 0),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData(requestURL);
        setProductsInfo(data);
      } catch (error) {
        if (error instanceof Error) showError(error.message);
      }
    };
    fetchProducts();
  }, [fetchData, requestURL, showError]);

  return { products, loading };
}
