import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';
import { formattedKey } from './useProducts.util';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';
import { useToast } from './useToast';
import { ERROR } from '../constant/message';

interface Props {
  selectBarCondition: Record<string, string>;
}

export function useProductFetch({ selectBarCondition }: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(FIRST_FETCH_PAGE);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setProducts([]);
    setPage(FIRST_FETCH_PAGE);
    setIsLastPage(false);
  }, [selectBarCondition.category, selectBarCondition.sort]);

  useEffect(() => {
    const setFetchedProducts = async () => {
      try {
        setIsLoading(true);

        const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
        const { last, content: newProducts } = await fetchProducts({
          page,
          size,
          category: selectBarCondition.category,
          sort: formattedKey(selectBarCondition.sort),
        });

        setProducts((prev) => [...prev, ...newProducts]);
        setIsLastPage(last);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          showToast({ message: ERROR.fetchProductList, duration: 3000 });
        }
      } finally {
        setIsLoading(false);
      }
    };
    setFetchedProducts();
  }, [page, selectBarCondition.category, selectBarCondition.sort, showToast]);

  const increaseNextPage = () => {
    setPage((prev) =>
      prev === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE / AFTER_FETCH_SIZE + prev : prev + 1,
    );
  };

  return { products, increaseNextPage, isLastPage, isLoading };
}
