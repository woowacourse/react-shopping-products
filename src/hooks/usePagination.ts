import { useState } from "react";

interface Props {
  firstPage: number;
  gapWithFirstPage: number;
}

const usePagination = ({ firstPage, gapWithFirstPage }: Props) => {
  const [page, setPage] = useState(firstPage);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchNextPage = () => {
    if (isLastPage) {
      return;
    }

    if (page === firstPage) {
      setPage((page) => page + gapWithFirstPage);
      return;
    }

    setPage((page) => page + 1);
  };

  const resetPage = () => {
    setPage(firstPage);
  };

  return { page, fetchNextPage, resetPage, setIsLastPage };
};

export default usePagination;
