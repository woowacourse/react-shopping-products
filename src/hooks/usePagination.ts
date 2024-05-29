import { useState } from 'react';

interface UsePaginationResult {
  page: number;
  resetPage: () => void;
  moveNextPage: (loading: boolean, isLast: boolean) => void;
}

const usePagination = (): UsePaginationResult => {
  const [page, setPage] = useState(0);

  const resetPage = () => setPage(0);

  const moveNextPage = (loading: boolean, isLast: boolean) => {
    if (!loading && !isLast) {
      setPage((prevPage) => (prevPage === 0 ? 5 : prevPage + 1));
    }
  };

  return { page, resetPage, moveNextPage };
};

export default usePagination;
