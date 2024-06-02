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

  const toast = useToast();
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown({
    resetPage: () => setPage(0),
  });

  const fetchNextPage = () => {
    const nextPageUnit = page === 0 ? PAGE_SIZE.firstPageUnit : PAGE_SIZE.nextPageUnit;
    if (isLastPage) return;

    setPage((prevPage) => prevPage + nextPageUnit);
  };

  const handleError = ({ name, isError, errorMessage }: ErrorState) => {
    setErrorState({ isError, name, errorMessage });
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
          toast.error(error.message);
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
    handleError,
  };
};

export default useProductList;
