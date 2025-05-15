import { useEffect, useState } from 'react';
import { ProductDTOType } from '../types/product';
import getProducts from '../api/getProducts';

function useGetProducts({ sort, category }: { sort: string; category: string }) {
  const [products, setProducts] = useState<ProductDTOType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getProducts({ category: category, sortKey: 'price', sortOrder: sort });
        setProducts(data);
      } catch (e) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sort, category]);

  return { isLoading, isError, products };
}

export default useGetProducts;
