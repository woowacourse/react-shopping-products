import { useCallback, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';
import useDeepCompareEffect from './useDeepCompareEffect';

const useFetchProducts = (sortings: SortingParam[], filter: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const fetchNextPage = useCallback(() => {
    if (isLast) return;
    setPage((prevPage) => prevPage + 1);
  }, [isLast]);

  useDeepCompareEffect(() => {
    setPage(0);
  }, [sortings, filter]);

  useDeepCompareEffect(() => {
    console.log('fetch이펙트 재계산');
    const size = page === 0 ? 20 : 4;
    const fetchPage = page === 0 ? page : page + 4;
    const getProducts = async () => {
      try {
        setIsPending(true);
        const fetchedProducts = await fetchProducts(
          fetchPage,
          size,
          sortings,
          filter,
        );

        setProducts((prevState) =>
          page === 0
            ? fetchedProducts.content
            : [...prevState, ...fetchedProducts.content],
        );

        setIsLast(fetchedProducts.last);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    getProducts();
  }, [page, sortings, filter]);

  return { products, isError, isPending, isLast, fetchNextPage, page };
};

export default useFetchProducts;
