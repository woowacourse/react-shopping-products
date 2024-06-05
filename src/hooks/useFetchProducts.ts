import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';

const useFetchProducts = (
  sortings: SortingParam[] = [],
  filter: string | '' = '',
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const size = page === 0 ? 20 : 4;
  const fetchPage = page === 0 ? page : page + 4;

  const fetchNextPage = useCallback(() => {
    if (isLast) return;
    setPage(page + 1);
  }, [isLast, page]);

  useEffect(() => {
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
  }, [page, sortings, filter, fetchPage, size]);

  return { products, isError, isPending, isLast, fetchNextPage, page };
};

export default useFetchProducts;
