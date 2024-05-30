import { useEffect, useState } from 'react';

import useDropdown from './useDropdown';

import { fetchProductList } from '@/api/product';
import { Product } from '@/types/product';
import CustomError from '@/utils/error';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({ name: '', isError: false, errorMessage: '' });

  const { category, order, handleChangeCategory, handleChangeSort } = useDropdown({
    resetPage: () => setPage(0),
  });

  const fetchNextPage = () => {
    const nextPage = page === 0 ? 5 : 1;
    if (isLastPage) return;

    setPage((prevPage) => prevPage + nextPage);
  };

  useEffect(() => {
    window.addEventListener('online', () => {
      setErrorState({ name: '', isError: false, errorMessage: '' });
    });
  }, []);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const limit = page === 0 ? 20 : 4;
        const { content, last } = await fetchProductList({
          page,
          category: category.value,
          size: limit,
          sortOptions: order.value,
        });
        if (last) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }
        page === 0 ? setProductList(content) : setProductList((prev) => [...prev, ...content]);
        setErrorState({ name: '', errorMessage: '', isError: false });
      } catch (error) {
        if (error instanceof CustomError) {
          const message = error.message;
          const name = error.name;

          setErrorState({ name, isError: true, errorMessage: message });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProductList();
  }, [page, category, order]);

  return {
    productList,
    page,
    fetchNextPage,
    isLoading,
    handleChangeCategory,
    handleChangeSort,
    category,
    order,
    errorState,
  };
};

export default useProductList;
