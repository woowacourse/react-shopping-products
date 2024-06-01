import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(0);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const resetPage = () => {
    setPage(0);
  };

  return { page, handleNextPage, resetPage };
};

export default usePagination;
