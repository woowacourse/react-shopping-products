import { useCallback, useState } from "react";

interface UsePaginationResult {
  page: number;
  nextPage: () => void;
  resetPage: () => void;
}

export default function usePagination(): UsePaginationResult {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    setPage((prev) => (prev === 0 ? 5 : prev + 1));
  }, []);

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  return {
    page,
    nextPage,
    resetPage,
  };
}
