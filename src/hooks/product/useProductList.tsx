import { useInfiniteProductList } from '@/apis/queries/product';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST, SortValue } from '@/constants/filter';
import { Category } from '@/types/filter.type';
import { useState } from 'react';

export const PAGE = {
  START: 0,
  START_SIZE: 20,
  SIZE: 4,
};

const ERROR_MESSAGE = {
  GET_PRODUCTS: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  INVALID_SORT_TYPE: '올바른 정렬 기준이 아닙니다.',
  INVALID_CATEGORY: '올바른 카테고리가 아닙니다.',
};

const useProductList = () => {
  const [sortType, setSortType] = useState<SortValue>('price,asc');
  const [category, setCategory] = useState<Category>('all');

  const handleSortType = (sortValue: string) => {
    const sortType = FILTER_OPTION_LIST.find((sortOption) => sortOption.value === sortValue);

    if (!sortType) {
      // setError(new Error(ERROR_MESSAGE.INVALID_SORT_TYPE));
      alert(ERROR_MESSAGE.INVALID_SORT_TYPE);
      return;
    }

    setSortType(sortType.value);
  };

  const handleCategory = (value: string) => {
    const category = CATEGORY_OPTION_LIST.find((categoryItem) => categoryItem.value === value);

    if (!category) {
      // setError(new Error(ERROR_MESSAGE.INVALID_CATEGORY));
      alert(ERROR_MESSAGE.INVALID_CATEGORY);
      return;
    }

    setCategory(category.value);
  };

  const queryInfo = useInfiniteProductList(category, sortType);

  return {
    ...queryInfo,
    handleCategory,
    handleSortType,
  };
};

export default useProductList;
