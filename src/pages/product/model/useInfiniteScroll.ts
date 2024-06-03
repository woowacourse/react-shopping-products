import { useEffect, RefObject } from 'react';

export const useInfiniteScroll = (
  observationTarget: RefObject<HTMLDivElement>,
  loading: boolean,
  fetchNextPage: () => void
) => {
  useEffect(() => {
    if (loading || !observationTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(observationTarget.current);

    return () => {
      if (observationTarget.current) observer.unobserve(observationTarget.current);
    };
  }, [loading, fetchNextPage, observationTarget]);
};
