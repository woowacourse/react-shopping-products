import { useState } from "react";

interface UsePaginationResult {
  page: number;
  isLastPage: boolean;
  handleLastPage: (isLast: boolean) => void;
  goToNextPage: () => void;
  resetPage: () => void;
}

const usePagination = (): UsePaginationResult => {
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const handleLastPage = (isLast: boolean) => {
    if (isLast) setIsLastPage(true);
  };

  const goToNextPage = () => {
    if (!isLastPage) setPage((prevPage) => prevPage + 1);
  };

  const resetPage = () => {
    setPage(1);
    setIsLastPage(false);
  };

  return { page, isLastPage, handleLastPage, goToNextPage, resetPage };
};

export default usePagination;
