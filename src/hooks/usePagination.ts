import { useCallback, useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(0);

  const resetPage = () => setPage(0);

  const updateNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return { page, resetPage, updateNextPage };
};

export default usePagination;
