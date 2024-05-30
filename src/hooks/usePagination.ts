import { useState, useCallback, useRef } from "react";

interface UsePaginationResult {
  page: number;
  lastElementRef: (node: HTMLDivElement) => void;
  resetPage: () => void;
}

export default function usePagination(hasMore: boolean): UsePaginationResult {
  const [page, setPage] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const resetPage = () => {
    setPage(0);
  };

  return {
    page,
    lastElementRef,
    resetPage,
  };
}
