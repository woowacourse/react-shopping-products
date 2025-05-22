import { useEffect, useState } from 'react';
import { ProductDTOType } from '../types/product';
import getProducts from '../api/getProducts';

function useGetProducts({ sort, category }: { sort: string; category: string }) {
  const [products, setProducts] = useState<ProductDTOType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getProducts({ category: category, sortKey: 'price', sortOrder: sort });
        setProducts(data);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : '상품 정보를 불러오지 못했습니다');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sort, category]);

  return { isLoading, isError, errorMessage, products };
}

export default useGetProducts;
