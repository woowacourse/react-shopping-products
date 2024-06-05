import { useState } from 'react';
import { PAGE, SIZE } from '../constants/page';

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const size = page === PAGE.DEFAULT ? SIZE.DEFAULT : SIZE.INTERVAL;
  const fetchedPage = page === PAGE.DEFAULT ? page : page + SIZE.INTERVAL;
  const [isLast, setIsLast] = useState(false);

  const fetchNextPage = () => {
    if (isLast) return;
    setPage((page) => page + 1);
  };

  const resetPage = () => {
    setPage(PAGE.DEFAULT);
  };

  return {
    size,
    fetchedPage,
    fetchNextPage,
    resetPage,
    isLast,
    setIsLast,
  };
};
