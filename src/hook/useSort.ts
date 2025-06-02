import { useState, useCallback } from 'react';
import { SortOption } from '../types/common';

const useSort = () => {
  const [sortType, setSortType] = useState<SortOption>('낮은 가격순');

  const selectSort = useCallback(
    (content: SortOption) => {
      setSortType(content);
    },
    [setSortType]
  );

  const resetSort = useCallback(() => {
    setSortType('낮은 가격순');
  }, [setSortType]);

  return {
    sortType,
    selectSort,
    resetSort,
  };
};

export default useSort;
