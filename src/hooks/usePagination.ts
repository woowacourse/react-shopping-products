import { useCallback, useState } from "react";

interface UsePaginationResult {
  page: number;
  nextPage: () => void;
  resetPage: () => void;
}

export default function usePagination(): UsePaginationResult {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const resetPage = () => {
    setPage(0);
  };

  return {
    page,
    nextPage,
    resetPage,
  };
}
