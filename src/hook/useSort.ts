import { useState } from 'react';
import { SortOption } from '../types/common';

const useSort = () => {
  const [sortType, setSortType] = useState<SortOption>('낮은 가격순');

  const selectSort = (content: string) => {
    setSortType(content as SortOption);
  };

  const resetSort = () => {
    setSortType('낮은 가격순');
  };

  return {
    sortType,
    selectSort,
    resetSort,
  };
};

export default useSort;
