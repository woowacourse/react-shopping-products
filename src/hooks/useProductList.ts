import { useEffect, useState } from 'react';

import useProductDropdown from './useProductDropdown';

import { fetchProductList } from '@/api/product';
import { ErrorState } from '@/types/error';
import { Product } from '@/types/product';
import CustomError from '@/utils/error';
import { PAGE_SIZE } from '@/constants/config';
import useToast from './useToast';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ErrorState>({
    isError: false,
    name: '',
    errorMessage: '',
  });

  const { category, order, handleChangeCategory, handleChangeSort } = useDropdown({
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown({
    resetPage: () => setPage(0),
  });

  const fetchNextPage = () => {
    const nextPageUnit = page === 0 ? PAGE_SIZE.firstPageUnit : PAGE_SIZE.nextPageUnit;
    if (isLastPage) return;

    setPage((prevPage) => prevPage + nextPageUnit);
  };
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
        const limit = page === 0 ? PAGE_SIZE.firstItemSize : PAGE_SIZE.nextItemSize;
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
        setErrorState({ isError: false, name: '', errorMessage: '' });
      } catch (error) {
        if (error instanceof CustomError) {
          setErrorState({ isError: true, name: error.name, errorMessage: error.message });
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
