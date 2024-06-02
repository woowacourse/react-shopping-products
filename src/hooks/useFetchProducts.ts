import { useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';
import { PAGE, SIZE } from '../constants/page';

const useFetchProducts = (
  sortings: SortingParam[] = [],
  filter: string | '' = '',
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const size = page === PAGE.DEFAULT ? SIZE.DEFAULT : SIZE.INTERVAL;
  const fetchPage = page === PAGE.DEFAULT ? page : page + SIZE.INTERVAL;

  const fetchNextPage = () => {
    if (isLast) return;
    setPage((page) => page + 1);
  };

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
  }, [page, sortings, filter]);

  const resetPage = () => {
    setPage(PAGE.DEFAULT);
  };

  return {
    products,
    isError,
    isPending,
    isLast,
    fetchNextPage,
    page,
    resetPage,
  };
};

export default useFetchProducts;
