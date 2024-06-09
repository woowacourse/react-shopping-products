import { useState } from 'react';
import { PAGE, SIZE } from '../constants/page';

const usePagination = () => {
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const size = page === PAGE.DEFAULT ? SIZE.DEFAULT : SIZE.INTERVAL;
  const fetchedPage = page === PAGE.DEFAULT ? page : page + SIZE.INTERVAL;

  const fetchNextPage = () => {
    if (isLast) return;
    setPage((page) => page + 1);
  };

  const resetPage = () => {
    setPage(PAGE.DEFAULT);
    setIsLast(false);
  };

  return {
    size,
    page,
    fetchedPage,
    fetchNextPage,
    resetPage,
    isLast,
    setIsLast,
  };
};

export default usePagination;
