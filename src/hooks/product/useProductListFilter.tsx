import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST, SortValue } from '@/constants/filter';
import { Category } from '@/types/filter.type';
import { useState } from 'react';

const ERROR_MESSAGE = {
  GET_PRODUCTS: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  INVALID_SORT_TYPE: '올바른 정렬 기준이 아닙니다.',
  INVALID_CATEGORY: '올바른 카테고리가 아닙니다.',
};

const useProductListFilter = () => {
  const [sortType, setSortType] = useState<SortValue>('price,asc');
  const [category, setCategory] = useState<Category>('all');

  const [error, setError] = useState<Error | null>(null);

  const handleSortType = (sortValue: string) => {
    const sortType = FILTER_OPTION_LIST.find((sortOption) => sortOption.value === sortValue);

    if (!sortType) {
      setError(new Error(ERROR_MESSAGE.INVALID_SORT_TYPE));
      return;
    }

    setError(null);
    setSortType(sortType.value);
  };

  const handleCategory = (value: string) => {
    const category = CATEGORY_OPTION_LIST.find((categoryItem) => categoryItem.value === value);

    if (!category) {
      setError(new Error(ERROR_MESSAGE.INVALID_CATEGORY));
      return;
    }

    setError(null);
    setCategory(category.value);
  };

  return {
    handleCategory,
    handleSortType,
    category,
    sortType,
    error,
    isError: error !== null,
  };
};

export default useProductListFilter;
