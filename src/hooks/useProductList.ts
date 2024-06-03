import { useEffect, useState } from 'react';

import useProductDropdown from './useProductDropdown';
import useProductPage from './useProductPage';
import useToast from './useToast';

import { fetchProductList } from '@/api/product';
import { PAGE_SIZE } from '@/constants/config';
import { Product } from '@/types/product';
import CustomError from '@/utils/error';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { page, fetchNextPage, determineLastPage, resetPage } = useProductPage();
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown(resetPage);

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

        determineLastPage(last);
        page === 0 ? setProductList(content) : setProductList((prev) => [...prev, ...content]);
      } catch (error) {
        if (error instanceof CustomError) {
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
  };
};

export default useProductList;
