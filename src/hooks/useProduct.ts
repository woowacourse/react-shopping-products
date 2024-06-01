import useFetch from './useFetch';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants/baseUrl';
import token from '@/api/token';
import { API_ROUTES } from '@/constants/route';
import usePagination from './usePagination';
import { ProductListData, SortType, Category, ProductItemData } from '@/types';
import generateProductAPIQueryParams from '@/api/utils/generateProductAPIQueryParams';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import toast from '@/services/toast';
import ERROR_MESSAGE from '@/constants/errorMessage';

const INITIAL_ITEM_LENGTH = 20;
const ADDITIONAL_ITEM_LENGTH = 4;
const DEFAULT_TOAST_DURATION = 1000;

const isValidCategory = (value: any): value is Category => {
  return CATEGORY_OPTION_LIST.some((categoryItem) => categoryItem.value === value);
};

const isValidSortType = (value: any): value is SortType => {
  return FILTER_OPTION_LIST.some((filterOption) => filterOption.value === value);
};

const useProduct = () => {
  const [sortType, setSortType] = useState<SortType>('asc');
  const [category, setCategory] = useState<Category>('all');
  const { page, handleNextPage, resetPage } = usePagination();
  const [productList, setProductList] = useState<ProductItemData[]>([]);
  const size = page === 0 ? INITIAL_ITEM_LENGTH : ADDITIONAL_ITEM_LENGTH;
  const url = `${BASE_URL.PRODUCT}${API_ROUTES.PRODUCT_LIST}${generateProductAPIQueryParams({ page, sortType, category, size })}`;
  const { data, isLoading } = useFetch<ProductListData>(url, { headers: { Authorization: token } });

  useEffect(() => {
    if (data?.content) {
      setProductList((prevProductList) => [...prevProductList, ...data.content]);
    }
  }, [data]);

  const reMountPage = () => {
    setProductList([]);
    resetPage();
  };

  const handleCategory = (value: string) => {
    if (!isValidCategory(value)) {
      toast.error(ERROR_MESSAGE.WRONG_CATEGORY, DEFAULT_TOAST_DURATION);
      return;
    }
    setCategory(value);
    reMountPage();
  };

  const handleSortType = (value: string) => {
    if (!isValidSortType(value)) {
      toast.error(ERROR_MESSAGE.WRONG_SORT_TYPE, DEFAULT_TOAST_DURATION);
      return;
    }
    setSortType(value);
    reMountPage();
  };

  return {
    productList,
    handleNextPage,
    page,
    isLoading,
    handleCategory,
    handleSortType,
  };
};

export default useProduct;
